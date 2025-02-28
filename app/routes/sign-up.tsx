import { ActionFunction } from "@remix-run/node";
import { Form, Link, redirect, useActionData, useSubmit } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { registerUser } from "~/services/auth.service";
import { signUpFormSchema } from "~/schemas/sign-up.schema";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";

import { json } from "@remix-run/node";
import React, { useEffect } from "react";

export const action: ActionFunction = async ({ request }) => {
  const values = await request.formData();
  const formObj = Object.fromEntries(values);

  try {
    const validatedData = signUpFormSchema.parse(formObj);
    const response = await registerUser({ formData: validatedData });

    if (response.status === 400) {
      return json({ errors: response }, { status: 400 });
    }

    return redirect('/sign-in');
  } catch (error) {
    if (error instanceof z.ZodError) {
      return json({ errors: error.flatten().fieldErrors }, { status: 400 });
    }
    return json({ errors: { _form: "An unexpected error occurred" } }, { status: 500 });
  }
};



export default function SignUpRoute() {
  const actionData = useActionData<typeof action>();
  const submit = useSubmit();

  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });


  function onSubmit(values: z.infer<typeof signUpFormSchema>) {
    submit(values, { method: "post" });
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
          <CardTitle className="text-center text-xl">Create an Account</CardTitle>
        </CardHeader>
        <CardContent>
          <FormProvider {...form}>
            <Form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage>{form.formState.errors.name?.message}</FormMessage>
                  </FormItem>
                )}
              />
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

              <Button className="w-full" type="submit">Sign Up</Button>
            </Form>
          </FormProvider>


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
