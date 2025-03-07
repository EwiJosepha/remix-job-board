import z from 'zod'
export const applySchema = z.object({
  user: z.string(),
  title: z.string(),
  company: z.string(),
  email: z.string().email({message: 'invalid email address'}),
  firstName: z.string({message: 'First name is required'}).min(2, {message: 'first name too short'}).max(50, {message: 'first name too long'}),
  resume: z.string({message: 'resume value is empty or invalid format'})
})