import React from 'react'
import { Form, Link, redirect, useActionData, useSubmit } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { ActionFunction, json } from '@remix-run/node';
import { login } from '~/services/auth.service';
import signInFormSchema from '~/schemas/sign-in.schema';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";

export const action: ActionFunction = async ({ request }) => {
  const values = await request.formData()
  const formObj = Object.fromEntries(values)

  try {
    const validatedData = signInFormSchema.parse(formObj)
    const response = await login({ email: validatedData.email, password: validatedData.password })
    if (response.status === 400) {
      return json({ errors: response }, { status: 400 });
    }
    return redirect('/dashboard');
  } catch (error) {
    if (error instanceof z.ZodError) {
      return json({ errors: error.flatten().fieldErrors }, { status: 400 });
    }
    return json({ errors: { _form: "An unexpected error occurred" } }, { status: 500 });
  }
}


function SignInPage() {
  const actionData = useActionData<typeof action>();
  const submit = useSubmit()
  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  function onSubmit(values: z.infer<typeof signInFormSchema>) {
    submit(values, { method: 'post' })
  }

  React.useEffect(() => {
    if (actionData?.errors) {
      Object.entries(actionData.errors).forEach(([key, value]) => {
        form.setError(key as any, { type: "manual", message: value as string });
      });
    }
  }, [actionData, form]);


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-xl">Sign In</CardTitle>
        </CardHeader>
        <CardContent>
          <FormProvider {...form}>
            <Form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage>{form.formState.errors.email?.message}</FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage>{form.formState.errors.password?.message}</FormMessage>
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </Form>
          </FormProvider>

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
