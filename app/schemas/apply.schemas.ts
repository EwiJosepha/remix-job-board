import z from 'zod'
export const applySchema = z.object({
  title: z.string(),
  company: z.string(),
  email: z.string().email(),
  firstName: z.string(),
  resume: z.string()
})