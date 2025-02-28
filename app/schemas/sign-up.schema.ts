import { z } from "zod"

 export const passwordSchema = z.string()
  .min(8, { message: "Password must be at least 8 characters long." })
  .max(25, { message: "Password is too long (max 25 characters)." })
  .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
  .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
  .regex(/[0-9]/, { message: "Password must contain at least one number." })
  .regex(/[\W_]/, { message: "Password must contain at least one special character." });
 
export const signUpFormSchema = z.object({
  name: z.string().min(2, {
    message: "Fullname must be at least 2 characters.",
  }).max(50, {message: "Fullname must not be more than 50 characters"}),
  email: z.string().email({ message: "Invalid email address" }),
  password: passwordSchema,
})
 