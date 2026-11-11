import * as THREE from "three";

const HOT = new THREE.Color(0xffc23d);
const WARM = new THREE.Color(0xff6a00);

function glowTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.45, "rgba(255,255,255,0.9)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
}

/** Small pooled particle system. A second, larger layer fakes bloom. */
export class Sparks {
  readonly group = new THREE.Group();
  private readonly count: number;
  private readonly pos: Float32Array;
  private readonly col: Float32Array;
  private readonly vel: Float32Array;
  private readonly life: Float32Array;
  private readonly maxLife: Float32Array;
  private readonly geometry = new THREE.BufferGeometry();
  private readonly texture = glowTexture();
  private readonly materials: THREE.PointsMaterial[] = [];
  private cursor = 0;
  private carry = 0;

  constructor(count = 80) {
    this.count = count;
    this.pos = new Float32Array(count * 3);
    this.col = new Float32Array(count * 3);
    this.vel = new Float32Array(count * 3);
    this.life = new Float32Array(count);
    this.maxLife = new Float32Array(count).fill(1);
    this.geometry.setAttribute("position", new THREE.BufferAttribute(this.pos, 3));
    this.geometry.setAttribute("color", new THREE.BufferAttribute(this.col, 4));

    for (const [size, opacity] of [
      [1, 1],
      [2.4, 0.4],
    ] as const) {
      const m = new THREE.PointsMaterial({
        size,
        map: this.texture,
        vertexColors: true,
        transparent: true,
        opacity,
        depthWrite: false,
      });
      this.materials.push(m);
      const points = new THREE.Points(this.geometry, m);
      points.frustumCulled = false;
      this.group.add(points);
    }
  }

  /** Emit `rate` sparks per second from each origin, thrown along `dir`. */
  emit(dt: number, rate: number, origins: THREE.Vector3[], dir: THREE.Vector3, speed: number) {
    this.carry += rate * dt;
    while (this.carry >= 1) {
      this.carry -= 1;
      const o = origins[this.cursor % origins.length];
      const i = this.cursor++ % this.count;
      this.pos[i * 3] = o.x + (Math.random() - 0.5) * 0.4;
      this.pos[i * 3 + 1] = o.y + (Math.random() - 0.5) * 0.4;
      this.pos[i * 3 + 2] = o.z + (Math.random() - 0.5) * 0.4;
      const s = speed * (0.6 + Math.random() * 0.8);
      this.vel[i * 3] = dir.x * s + (Math.random() - 0.5) * 2.2;
      this.vel[i * 3 + 1] = dir.y * s + (Math.random() - 0.5) * 2.2;
      this.vel[i * 3 + 2] = dir.z * s + (Math.random() - 0.5) * 1.5;
      this.maxLife[i] = 0.35 + Math.random() * 0.45;
      this.life[i] = this.maxLife[i];
    }
  }

  update(dt: number) {
    for (let i = 0; i < this.count; i++) {
      const l = this.life[i];
      if (l <= 0) {
        this.col[i * 4 + 3] = 0;
        continue;
      }
      this.life[i] = l - dt;
      this.pos[i * 3] += this.vel[i * 3] * dt;
      this.pos[i * 3 + 1] += this.vel[i * 3 + 1] * dt;
      this.pos[i * 3 + 2] += this.vel[i * 3 + 2] * dt;
      this.vel[i * 3 + 1] -= 4 * dt;
      const r = Math.max(l / this.maxLife[i], 0); // 1 -> 0
      const k = Math.min(1, r * 1.6);
      const t = Math.max(0, (r - 0.4) / 0.6);
      this.col[i * 4] = WARM.r + (HOT.r - WARM.r) * t;
      this.col[i * 4 + 1] = WARM.g + (HOT.g - WARM.g) * t;
      this.col[i * 4 + 2] = WARM.b + (HOT.b - WARM.b) * t;
      this.col[i * 4 + 3] = k;
    }
    this.geometry.attributes.position.needsUpdate = true;
    this.geometry.attributes.color.needsUpdate = true;
  }

  dispose() {
    this.geometry.dispose();
    this.texture.dispose();
    this.materials.forEach((m) => m.dispose());
  }
}
