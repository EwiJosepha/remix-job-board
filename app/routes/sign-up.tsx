import { ActionFunction } from "@remix-run/node";
import { Form, Link, redirect } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { registerUser } from "~/services/auth.service";

export const action:ActionFunction = async ({request}) => {

 const values = await request.formData()
 const formObj = Object.fromEntries(values)
 const formData = {
  name: formObj["name"] as string,
  email: formObj["email"] as string,
  password: formObj["password"] as string,
};
 const response = await  registerUser({formData})
 if (response.status === 400) return response
  return  redirect('/sign-in')
 
}

export default function SignUpRoute() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-xl">Create an Account</CardTitle>
        </CardHeader>
        <CardContent>
          <Form className="space-y-4" method="post">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <Input type="text" placeholder="John Doe" name="name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <Input type="email" placeholder="you@example.com" name="email" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <Input type="password" placeholder="********" name="password" />
            </div>

            <Button className="w-full">Sign Up</Button>
          </Form>
          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/sign-in" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
