import { z} from 'zod'
import { passwordSchema } from './sign-up.schema'

export const signInFormSchema = z.object({
  email: z.string().email({message: 'Invalid Email Address'}),
  password: passwordSchema
})

export default signInFormSchema