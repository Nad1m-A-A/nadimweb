// npm run deploy: check, build locally, ship .next/standalone to the server, swap, restart.
// A failed check or build stops here: nothing is uploaded.
import { execSync, spawnSync } from "node:child_process";
import {
  cpSync,
  existsSync,
  mkdtempSync,
  openSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { homedir, tmpdir } from "node:os";
import { join } from "node:path";

const HOST = "my-server";
const APP_DIR = "/var/www/nadimweb.com";
const RELEASE_DIR = "/home/mega_mind/.nadimweb-release";
const PM2_NAME = "nadimweb";
const PORT = 3000; // nginx proxies nadimweb.com to 127.0.0.1:3000

const BUNDLE = ".next/standalone";
const TARBALL = ".next/deploy.tgz";

const sh = (cmd) => execSync(cmd, { stdio: "inherit" });
const ssh = (remote, stdin = "inherit") => {
  const r = spawnSync("ssh", ["-o", "BatchMode=yes", HOST, remote], {
    stdio: [stdin, "inherit", "inherit"],
  });
  if (r.status !== 0) throw new Error(`ssh failed (${r.status}): ${remote}`);
};

// Typecheck and lint first, before touching ssh.
console.log("==> Checking");
sh("npm run check");

// Windows keeps the key in ~/.ssh, Ubuntu in the vps project folder.
const KEY_PATHS = [
  join(homedir(), ".ssh/my vps private key"),
  join(homedir(), "projects/personal/vps/my-server-private-key"),
];

if (spawnSync("ssh-add", ["-l"]).status !== 0) {
  const key = KEY_PATHS.find((p) => existsSync(p));
  if (!key || spawnSync("ssh-add", [key], { stdio: "inherit" }).status !== 0) {
    console.error(
      `No key in ssh-agent and none could be added. Looked in:\n  ${KEY_PATHS.join("\n  ")}`,
    );
    process.exit(1);
  }
}

console.log("==> Building");
sh("npm run build");

console.log("==> Packing bundle");
cpSync("public", join(BUNDLE, "public"), { recursive: true });
cpSync(".next/static", join(BUNDLE, ".next/static"), { recursive: true });

// The traced sharp binary matches this machine; the server is linux-x64 glibc.
const sharpVersion = JSON.parse(
  readFileSync("node_modules/sharp/package.json", "utf8"),
).version;
const tmp = mkdtempSync(join(tmpdir(), "sharp-linux-"));
writeFileSync(join(tmp, "package.json"), "{}");
execSync(
  `npm install --no-save --no-package-lock --no-audit --no-fund --os=linux --cpu=x64 --libc=glibc sharp@${sharpVersion}`,
  {
    cwd: tmp,
    stdio: "inherit",
    // `npm run` exports npm_config_* (prefix etc.), which would redirect this install.
    env: Object.fromEntries(
      Object.entries(process.env).filter(([k]) => !/^npm_/i.test(k)),
    ),
  },
);
const img = join(BUNDLE, "node_modules/@img");
for (const d of readdirSync(img))
  if (/^sharp-(?!.*linux-x64)/.test(d))
    rmSync(join(img, d), { recursive: true, force: true });
cpSync(join(tmp, "node_modules/@img"), img, { recursive: true });
rmSync(tmp, { recursive: true, force: true });

rmSync(TARBALL, { force: true });
const tar = spawnSync("tar", ["czf", "../deploy.tgz", "."], {
  cwd: BUNDLE,
  stdio: "inherit",
});
if (tar.status !== 0) throw new Error("tar failed");

console.log("==> Uploading");
ssh(
  `rm -rf ${RELEASE_DIR} && mkdir -p ${RELEASE_DIR} && tar xzf - -C ${RELEASE_DIR}`,
  openSync(TARBALL, "r"),
);

console.log("==> Swapping and restarting");
ssh(
  [
    "set -e",
    `find ${APP_DIR} -mindepth 1 -delete`,
    `cp -a ${RELEASE_DIR}/. ${APP_DIR}/`,
    `rm -rf ${RELEASE_DIR}`,
    `cd ${APP_DIR}`,
    `pm2 describe ${PM2_NAME} >/dev/null 2>&1 && pm2 restart ${PM2_NAME} || PORT=${PORT} HOSTNAME=127.0.0.1 NODE_ENV=production pm2 start server.js --name ${PM2_NAME}`,
    "pm2 save",
  ].join(" && "),
);

rmSync(TARBALL, { force: true });
console.log("==> Deployed");
