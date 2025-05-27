"use client";

import React from "react";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";

export default function LoginPage() {
  const [password, setPassword] = React.useState("");
  const [submitted, setSubmitted] = React.useState(null);
  const [errors, setErrors] = React.useState({});

  const getPasswordError = (value) => {
    if (!value || value.trim() === "") {
      return "Please enter your password";
    }
    return null;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    const newErrors = {};

    // Email
    if (!data.email || !data.email.includes("@")) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password
    const passwordError = getPasswordError(data.password);
    if (passwordError) {
      newErrors.password = passwordError;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSubmitted(data);
  };

  return (
    <section className="flex flex-col gap-16 items-center justify-center">
      <div className="flex flex-col gap-4">
        <h1 className="tracking-tight inline font-semibold text-[2.3rem] lg:text-5xl leading-9">
          Welcome Back
        </h1>
        <p className="md:text-lg lg:text-xl text-default-600">
          Log in to your account and pick up where you left off. Your next
          chapter starts here.
        </p>
      </div>
      <Form
        className="w-full justify-center items-center space-y-4"
        validationErrors={errors}
        onReset={() => setSubmitted(null)}
        onSubmit={onSubmit}
      >
        <div className="flex flex-col gap-4 max-w-md w-full">
          <Input
            isRequired
            errorMessage={({ validationDetails }) =>
              validationDetails.valueMissing
                ? "Please enter your email"
                : errors.email
            }
            label="Email"
            labelPlacement="outside"
            name="email"
            placeholder="Enter your email"
            type="email"
          />

          <Input
            isRequired
            errorMessage={getPasswordError(password)}
            isInvalid={!!getPasswordError(password)}
            label="Password"
            labelPlacement="outside"
            name="password"
            placeholder="Enter your password"
            type="password"
            value={password}
            onValueChange={setPassword}
          />

          <div className="flex gap-4">
            <Button className="w-full" color="primary" type="submit">
              Log In
            </Button>
            <Button type="reset" variant="bordered">
              Reset
            </Button>
          </div>
        </div>

        {submitted && (
          <div className="text-small text-default-500 mt-4">
            Submitted data: <pre>{JSON.stringify(submitted, null, 2)}</pre>
          </div>
        )}
      </Form>
    </section>
  );
}
