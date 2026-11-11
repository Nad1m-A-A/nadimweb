import * as THREE from "three";
import { buildAvatar } from "./build-avatar";
import { Sparks } from "./sparks";

export type AvatarPose = {
  /** 0 hovering and waving, 1 full hero flight. */
  flight: number;
  /** Screen direction of travel: -1 left, 1 right. */
  heading: number;
  /** Screen side the avatar rests on: -1 left, 1 right. */
  side: number;
};

export type AvatarScene = {
  update: (dt: number, pose: AvatarPose) => void;
  resize: (size: number) => void;
  dispose: () => void;
};

type Options = {
  canvas: HTMLCanvasElement;
  size: number;
  /** Render a single calm frame, no blinking, waving or sparks. */
  still?: boolean;
};

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const PI = Math.PI;

export function createAvatarScene({ canvas, size, still = false }: Options): AvatarScene {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.setSize(size, size, false);
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(28, 1, 1, 100);
  camera.position.set(0, 0, 31);

  scene.add(new THREE.HemisphereLight(0xffffff, 0xd8cfc0, 1.5));
  const sun = new THREE.DirectionalLight(0xffffff, 1.9);
  sun.position.set(-4, 8, 10);
  scene.add(sun);

  const rig = buildAvatar();
  scene.add(rig.root);
  const sparks = new Sparks();
  scene.add(sparks.group);

  let time = 0;
  let nextBlink = 2.5;
  let blinkUntil = 0;
  let nextWave = 3;
  let waveStart = -10;
  const WAVE_LEN = 2.2;

  const origins = [new THREE.Vector3(), new THREE.Vector3()];
  const dir = new THREE.Vector3();

  const update = (dt: number, pose: AvatarPose) => {
    time += dt;
    const f = still ? 0 : pose.flight;

    // Waving: a smooth envelope, only while resting.
    if (f > 0.05) {
      // Never wave while moving; wait a beat after landing.
      waveStart = -10;
      nextWave = Math.max(nextWave, time + 1.4);
    }
    if (!still && time > nextWave && f <= 0.05) {
      waveStart = time;
      nextWave = time + 7 + Math.random() * 4;
    }
    const wt = (time - waveStart) / WAVE_LEN;
    const wave = f <= 0.05 && wt >= 0 && wt <= 1 ? Math.sin(wt * PI) : 0;

    // Blinking.
    if (!still && time > nextBlink) {
      blinkUntil = time + 0.14;
      nextBlink = time + 3 + Math.random() * 3;
    }
    const blinking = time < blinkUntil;
    rig.lids.forEach((l) => (l.visible = blinking));

    const bob = still ? 0 : Math.sin(time * 1.8) * 0.35 * (1 - f * 0.5) + Math.sin(time * 9) * 0.08 * f;
    const idleYaw = -0.35 * pose.side;
    rig.root.position.y = bob;
    rig.root.rotation.z = -pose.heading * f * 0.95;
    rig.root.rotation.y = lerp(idleYaw, pose.heading * 0.35, f);
    rig.root.rotation.x = 0.08 * f;

    rig.head.rotation.x = -0.1 * f;
    rig.armR.rotation.z = lerp(0.12 + wave * (2.2 + Math.sin(time * 10) * 0.35), PI - 0.3, f);
    rig.armL.rotation.z = lerp(-0.12 + (still ? 0 : Math.sin(time * 1.8) * 0.04), -0.5, f);
    rig.legL.rotation.z = -0.16 * f;
    rig.legR.rotation.z = 0.16 * f;
    const flutter = still ? 0 : Math.sin(time * 11) * 0.12 * f;
    rig.legL.rotation.x = flutter;
    rig.legR.rotation.x = -flutter;

    rig.root.updateMatrixWorld(true);
    rig.soles.forEach((s, i) => s.getWorldPosition(origins[i]));
    // Sparks leave along the body's "down" axis, with a little drag-back.
    dir.set(0, -1, 0).applyQuaternion(rig.root.quaternion);
    dir.x -= pose.heading * 0.35 * f;
    dir.normalize();
    if (!still) {
      sparks.emit(dt, 6 + 70 * f, origins, dir, 3 + 7 * f);
      sparks.update(dt);
    }
    renderer.render(scene, camera);
  };

  return {
    update,
    resize: (s) => renderer.setSize(s, s, false),
    dispose: () => {
      sparks.dispose();
      rig.dispose();
      renderer.dispose();
    },
  };
}
