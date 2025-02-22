import { json } from "@remix-run/node";
import { connectDB } from "~/db/connect";
import User from "~/db/models/user";
import bcrypt from 'bcryptjs'
import { jwtSecret, expiringTime } from "app/utils/constants"
import jwt from 'jsonwebtoken';

console.log({expiringTime});



interface FormData {
  name: string
  email: string
  password: string
}

export async function registerUser({ formData }: { formData: FormData }) {
  await connectDB();
  const existingUser = await User.findOne({ email: formData.email });
  if (existingUser) {
    return json({ error: "Email already in use" }, { status: 400 });
  }
  const hashedPassword = await bcrypt.hash(formData.password, 10);

  const newUser = await User.create({
    name: formData.name,
    email: formData.email,
    password: hashedPassword,
  });

  console.log("User Created:", newUser);

  return json({ message: "User created successfully" }, { status: 201 });
}



export const login = async ({ email, password }: Pick<FormData, "email" | "password">) => {
  await connectDB();

  if (!email || !password) return json({ error: 'Bad request, missing email or password' }, { status: 400 });

  const existingUser = await User.findOne({email: email});
  if (!existingUser) return json({ error: 'User not found' }, { status: 404 });

  const isPasswordValid = await bcrypt.compare(password, existingUser.password);
  if (!isPasswordValid) return json({ error: 'Invalid password' }, { status: 401 });
  const token = jwt.sign(
    { userId: existingUser._id, email: existingUser.email },
    jwtSecret, 
    { expiresIn: '5d' }
  );

  return json({ message: 'Login successful', token, email: existingUser.email }, { status: 200 });
};


