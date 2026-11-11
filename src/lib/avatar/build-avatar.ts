import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

const COLOR = {
  skin: 0xf2c9a5,
  skinShade: 0xdfae88,
  shirt: 0xfafafa,
  jeans: 0x2f66b8,
  jeansDark: 0x214b8c,
  sneaker: 0xffffff,
  sole: 0xd6d9de,
  frame: 0x1c1f24,
  lens: 0xdbe9f7,
  ink: 0x26190f,
  brow: 0x4a3a30,
  white: 0xffffff,
} as const;

export type AvatarRig = {
  /** Pivot at the body's centre; tilt and bob this. */
  root: THREE.Group;
  head: THREE.Group;
  armL: THREE.Group;
  armR: THREE.Group;
  legL: THREE.Group;
  legR: THREE.Group;
  lids: THREE.Mesh[];
  soles: THREE.Object3D[];
  dispose: () => void;
};

/** Bald, square glasses, white shirt, jeans, white sneakers. Soft-edged blocks, human proportions. */
export function buildAvatar(): AvatarRig {
  const geos = new Map<string, THREE.BufferGeometry>();
  const mats = new Map<number, THREE.MeshLambertMaterial>();

  const mat = (color: number) => {
    let m = mats.get(color);
    if (!m) {
      m = new THREE.MeshLambertMaterial({ color });
      mats.set(color, m);
    }
    return m;
  };

  const box = (
    parent: THREE.Object3D,
    [w, h, d]: [number, number, number],
    color: number,
    [x, y, z]: [number, number, number] = [0, 0, 0],
    round = 0,
  ) => {
    const key = `${w},${h},${d},${round}`;
    let g = geos.get(key);
    if (!g) {
      g = round
        ? new RoundedBoxGeometry(w, h, d, 3, Math.min(round, Math.min(w, h, d) / 2.2))
        : new THREE.BoxGeometry(w, h, d);
      geos.set(key, g);
    }
    const mesh = new THREE.Mesh(g, mat(color));
    mesh.position.set(x, y, z);
    parent.add(mesh);
    return mesh;
  };

  const root = new THREE.Group();
  root.rotation.order = "ZYX";
  const body = new THREE.Group();
  body.position.y = -0.3; // hip at y=0; shift so root pivots near the middle
  root.add(body);

  // Torso: white shirt, jeans waistband.
  box(body, [3, 3.2, 1.6], COLOR.shirt, [0, 1.6, 0], 0.35);
  box(body, [3.05, 0.35, 1.65], COLOR.jeansDark, [0, 0.1, 0], 0.12);
  box(body, [0.6, 0.45, 0.5], COLOR.skin, [0, 3.35, 0.1], 0.1); // neck

  // Arms pivot at the shoulder and hang down.
  const makeArm = (side: -1 | 1) => {
    const arm = new THREE.Group();
    arm.position.set(side * 1.95, 2.85, 0);
    box(arm, [0.85, 2.4, 0.85], COLOR.shirt, [0, -1.2, 0], 0.3);
    box(arm, [0.7, 0.75, 0.7], COLOR.skin, [0, -2.7, 0], 0.25);
    body.add(arm);
    return arm;
  };
  const armL = makeArm(-1);
  const armR = makeArm(1);

  // Legs pivot at the hip. Each sneaker has a sole point for the sparks.
  const soles: THREE.Object3D[] = [];
  const makeLeg = (side: -1 | 1) => {
    const leg = new THREE.Group();
    leg.position.set(side * 0.75, 0, 0);
    box(leg, [1.4, 4, 1.4], COLOR.jeans, [0, -2, 0], 0.25);
    box(leg, [1.5, 0.7, 2.2], COLOR.sneaker, [0, -4.3, 0.35], 0.3);
    box(leg, [1.55, 0.22, 2.25], COLOR.sole, [0, -4.58, 0.35], 0.1);
    const sole = new THREE.Object3D();
    sole.position.set(0, -4.75, -0.1);
    leg.add(sole);
    soles.push(sole);
    body.add(leg);
    return leg;
  };
  const legL = makeLeg(-1);
  const legR = makeLeg(1);

  // Head: bald, with ears, square glasses, brows, nose and smile.
  const head = new THREE.Group();
  head.position.y = 4.65;
  head.scale.setScalar(1.12);
  body.add(head);
  box(head, [1.9, 2.3, 1.9], COLOR.skin, [0, 0, 0], 0.55);
  box(head, [0.18, 0.5, 0.35], COLOR.skinShade, [-0.99, 0, 0], 0.08);
  box(head, [0.18, 0.5, 0.35], COLOR.skinShade, [0.99, 0, 0], 0.08);

  const fz = 0.96;
  const lids: THREE.Mesh[] = [];
  for (const s of [-1, 1]) {
    const x = s * 0.5;
    // lens + square frame
    box(head, [0.74, 0.6, 0.04], COLOR.lens, [x, 0.15, fz + 0.02]);
    box(head, [0.82, 0.08, 0.1], COLOR.frame, [x, 0.48, fz + 0.04]);
    box(head, [0.82, 0.08, 0.1], COLOR.frame, [x, -0.18, fz + 0.04]);
    box(head, [0.08, 0.66, 0.1], COLOR.frame, [x - 0.4, 0.15, fz + 0.04]);
    box(head, [0.08, 0.66, 0.1], COLOR.frame, [x + 0.4, 0.15, fz + 0.04]);
    // temple arms along the side of the head
    box(head, [0.06, 0.07, 0.9], COLOR.frame, [s * 0.96, 0.4, 0.5]);
    // eye
    box(head, [0.2, 0.26, 0.06], COLOR.ink, [x, 0.15, fz + 0.04]);
    const lid = box(head, [0.62, 0.5, 0.06], COLOR.skin, [x, 0.15, fz + 0.07]);
    lid.visible = false;
    lids.push(lid);
    box(head, [0.62, 0.1, 0.08], COLOR.brow, [x, 0.72, fz + 0.01], 0.04);
  }
  box(head, [0.22, 0.08, 0.1], COLOR.frame, [0, 0.35, fz + 0.04]); // bridge
  box(head, [0.28, 0.4, 0.3], COLOR.skinShade, [0, -0.3, fz + 0.08], 0.1);
  box(head, [0.7, 0.1, 0.08], COLOR.ink, [0, -0.78, fz], 0.04);
  box(head, [0.1, 0.1, 0.08], COLOR.ink, [-0.38, -0.7, fz], 0.03);
  box(head, [0.1, 0.1, 0.08], COLOR.ink, [0.38, -0.7, fz], 0.03);

  const dispose = () => {
    geos.forEach((g) => g.dispose());
    mats.forEach((m) => m.dispose());
  };

  return { root, head, armL, armR, legL, legR, lids, soles, dispose };
}
