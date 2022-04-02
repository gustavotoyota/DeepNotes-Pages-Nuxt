import { z } from "zod";
import { Vec2, IVec2 } from "./vec2";




export const IRect = z.object({
  topLeft: IVec2,
  bottomRight: IVec2,
})

export type IRect = z.infer<typeof IRect>

export class Rect {
  topLeft: Vec2
  bottomRight: Vec2




  constructor(topLeft: Vec2, bottomRight: Vec2) {
    this.topLeft = topLeft
    this.bottomRight = bottomRight
  }




  get size(): Vec2 {
    return this.bottomRight.sub(this.topLeft)
  }
  set size(value: Vec2) {
    this.bottomRight = this.topLeft.add(value)
  }



  
  get center(): Vec2 {
    return this.topLeft.add(this.size.divScalar(2))
  }
}