import {json } from "@remix-run/node";
import { connectDB } from "~/db/connect";
import User from "~/db/models/user";
import bcrypt from 'bcryptjs'
import { jwtSecret, expiringTime } from "app/utils/constants"
import jwt from 'jsonwebtoken';
import * as cookie from "cookie";

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

export async function getCurrentUser(request: Request) {
  await connectDB();

  try {
    const cookieHeader = request.headers.get("Cookie");
    const cookies = cookieHeader ? await cookie.parse(cookieHeader) : {};
    const token = cookies.token

    console.log({token});
    
    if (!cookieHeader || !cookieHeader.startsWith("Bearer ")) {
      throw json({ error: "Unauthorized, token missing" }, { status: 401 });
    }
    const decoded: any = jwt.verify(token, jwtSecret);

    if (!decoded || !decoded.userId) {
      throw json({ error: "Invalid or expired token" }, { status: 401 });
    }

    const user = await User.findById(decoded.userId).select("-password");

    console.log({user});
    

    if (!user) {
      throw json({ error: "User not found" }, { status: 404 });
    }

    return user;
  } catch (error) {
    console.error("Error retrieving user:", error);
    throw json({ error: "Internal server error" }, { status: 500 });
  }
}
