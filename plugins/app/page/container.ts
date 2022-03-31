import { z } from "zod"




export const IContainerCollab = z.object({
  noteIds: z.string().array().default([]),
  arrowIds: z.string().array().default([]),
})
export type IContainerCollab = z.infer<typeof IContainerCollab>