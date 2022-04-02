import { z } from "zod"




export const IVec2 = z.object({
  x: z.number(),
  y: z.number(),
})

export type IVec2 = z.infer<typeof IVec2>

export class Vec2 {
  x: number
  y: number




  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }




  add(vec: Vec2): Vec2 {
    return new Vec2(this.x + vec.x, this.y + vec.y)
  }
  sub(vec: Vec2): Vec2 {
    return new Vec2(this.x - vec.x, this.y - vec.y)
  }
  mul(vec: Vec2): Vec2 {
    return new Vec2(this.x * vec.x, this.y * vec.y)
  }
  div(vec: Vec2): Vec2 {
    return new Vec2(this.x / vec.x, this.y / vec.y)
  }
  mulScalar(scalar: number): Vec2 {
    return new Vec2(this.x * scalar, this.y * scalar)
  }
  divScalar(scalar: number): Vec2 {
    return new Vec2(this.x / scalar, this.y / scalar)
  }
  dot(vec: Vec2): number {
    return this.x * vec.x + this.y * vec.y
  }
  cross(vec: Vec2): number {
    return this.x * vec.y - this.y * vec.x
  }
  length(): number {
    return Math.sqrt(this.dot(this))
  }
  normalize(): Vec2 {
    return this.divScalar(this.length())
  }
  distance(vec: Vec2): number {
    return this.sub(vec).length()
  }
  angle(vec: Vec2): number {
    return Math.atan2(this.cross(vec), this.dot(vec))
  }
  rotate(angle: number): Vec2 {
    const cos = Math.cos(angle)
    const sin = Math.sin(angle)
    return new Vec2(this.x * cos - this.y * sin, this.x * sin + this.y * cos)
  }
}