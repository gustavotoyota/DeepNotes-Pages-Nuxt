import * as QuillDelta from "quill-delta";
import { z } from "zod";




export type Op = QuillDelta.Op
export type AttributeMap = QuillDelta.AttributeMap




export const AttributeMap: z.ZodType<QuillDelta.AttributeMap> = z.record(z.unknown())
export const Op: z.ZodType<QuillDelta.Op> = z.object({
  insert: z.string().or(z.record(z.unknown())).optional(),
  delete: z.number().optional(),
  retain: z.number().or(z.record(z.unknown())).optional(),
  attributes: AttributeMap.optional(),
})