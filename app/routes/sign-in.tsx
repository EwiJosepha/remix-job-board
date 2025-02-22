import React from 'react'
import { Form, Link, redirect } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { ActionFunction } from '@remix-run/node';
import { login } from '~/services/auth.service';

export const action: ActionFunction = async ({ request }) => {
  const values = await request.formData()
  const formObj = Object.fromEntries(values)
  const formData  = {
    email: formObj['email'] as string,
    password: formObj['password'] as string
  }

  console.log({formData});
  
  const response = await login({email: formData.email, password: formData.password})
  if(response.status === 400) return response
  return redirect ('/dashboard')
}


function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-xl">Sign In</CardTitle>
        </CardHeader>
        <CardContent>
          <Form method="post"  className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <Input id="email" name="email" type="email" placeholder="you@example.com" required />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <Input id="password" name="password" type="password" placeholder="********" required />
            </div>
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </Form>

          <div className="mt-4 text-center text-sm text-gray-600">
            <Link to="/forgot-password" className="text-blue-500 hover:underline">
              Forgot password?
            </Link>
          </div>

          <p className="mt-2 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/sign-up" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default SignInPage
