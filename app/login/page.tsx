"use client";

import React, { useEffect, useState } from "react";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { addToast } from "@heroui/toast";
import { Spinner } from "@heroui/spinner";
import { useRouter } from "next/navigation";

import { useAuth } from "@/app/context/AuthContext";
import { loginUser } from "@/lib/auth/loginUser";

export default function LoginPage() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push("/profile");
    }
  }, [isAuthenticated, loading]);

  if (loading || isAuthenticated) {
    return (
      <div className="py-32">
        <Spinner color="default" />
      </div>
    );
  }

  const getPasswordError = (value: string) => {
    if (!value || value.trim() === "") {
      return "Please enter your password";
    }
    return null;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    const newErrors: any = {};

    if (!data.email || !data.email.toString().includes("@")) {
      newErrors.email = "Please enter a valid email address";
    }

    const passwordError = getPasswordError(data.password as string);
    if (passwordError) {
      newErrors.password = passwordError;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    try {
      const result = await loginUser(
        data.email as string,
        data.password as string
      );
      localStorage.setItem("token", result.token);

      addToast({
        title: "Logged in successfully! 🎉",
        color: "success",
      });

      router.push("/profile");
    } catch (err: any) {
      addToast({
        title: err.message,
        color: "danger",
      });
    }
  };

  return (
    <section className="flex flex-col gap-16 items-center justify-center">
      <div className="flex flex-col gap-4">
        <h1 className="tracking-tight inline font-semibold text-[2.3rem] lg:text-5xl leading-9">
          Welcome Back
        </h1>
        <p className="md:text-lg lg:text-xl text-default-600">
          Log in to your account and pick up where you left off.
        </p>
      </div>
      <Form
        className="w-full justify-center items-center space-y-4"
        validationErrors={errors}
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
      </Form>
    </section>
  );
}
