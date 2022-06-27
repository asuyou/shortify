import { z } from "zod"

export const Create = z.object({
  uri: z.string(),
  exp: z.date(),
  condensed: z.string().length(10).optional()
})

