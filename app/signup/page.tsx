"use client";

import React, { useEffect, useState } from "react";
import { Form } from "@heroui/form";
import { Select, SelectItem } from "@heroui/select";
import { Input } from "@heroui/input";
import { Checkbox } from "@heroui/checkbox";
import { Button } from "@heroui/button";
import { addToast } from "@heroui/toast";
import { Spinner } from "@heroui/spinner";
import { useRouter } from "next/navigation";

import { useAuth } from "@/app/context/AuthContext";
import { registerUser } from "@/lib/auth/registerUser";

export default function SignupPage() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(null);
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
    if (value.length < 4) return "Password must be 4 characters or more";
    if ((value.match(/[A-Z]/g) || []).length < 1)
      return "Password needs at least 1 uppercase letter";
    if ((value.match(/[^a-z]/gi) || []).length < 1)
      return "Password needs at least 1 symbol";
    return null;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    const newErrors: any = {};
    const passwordError = getPasswordError(data.password as string);
    if (passwordError) newErrors.password = passwordError;
    if (data.name === "admin")
      newErrors.name = "Nice try! Choose a different username";
    if (data.terms !== "true") newErrors.terms = "Please accept the terms";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    try {
      await registerUser({
        email: data.email as string,
        username: data.name as string,
        password: data.password as string,
      });

      setSubmitted(data);
      addToast({
        title: "🎉 Registration successful!",
        description: "You can now log in to your account.",
        color: "success",
      });
    } catch (err: any) {
      addToast({
        title: "❌ Registration failed",
        description: err.message || "Something went wrong",
        color: "danger",
      });
    }
  };

  return (
    <section className="flex flex-col gap-16 items-center justify-center">
      <div className="flex flex-col gap-4">
        <h1 className="tracking-tight inline font-semibold text-[2.3rem] lg:text-5xl leading-9">
          Join Our Community
        </h1>
        <p className="md:text-lg lg:text-xl text-default-600">
          Sign up today and unlock the full potential of your journey. Just a
          few clicks — the rest is your story.
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
                ? "Please enter your name"
                : errors.name
            }
            label="Name"
            labelPlacement="outside"
            name="name"
            placeholder="Enter your name"
          />

          <Input
            isRequired
            errorMessage={({ validationDetails }) =>
              validationDetails.valueMissing
                ? "Please enter your email"
                : validationDetails.typeMismatch
                  ? "Please enter a valid email address"
                  : undefined
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
            isInvalid={getPasswordError(password) !== null}
            label="Password"
            labelPlacement="outside"
            name="password"
            placeholder="Enter your password"
            type="password"
            value={password}
            onValueChange={setPassword}
          />

          <Select
            isRequired
            label="Country"
            labelPlacement="outside"
            name="country"
            placeholder="Select country"
          >
            <SelectItem key="pl">Poland</SelectItem>
            <SelectItem key="de">Germany</SelectItem>
            <SelectItem key="ar">Argentina</SelectItem>
            <SelectItem key="us">United States</SelectItem>
            <SelectItem key="ca">Canada</SelectItem>
            <SelectItem key="uk">United Kingdom</SelectItem>
            <SelectItem key="au">Australia</SelectItem>
          </Select>

          <Checkbox
            isRequired
            classNames={{ label: "text-small" }}
            isInvalid={!!errors.terms}
            name="terms"
            validationBehavior="aria"
            value="true"
            onValueChange={() =>
              setErrors((prev) => ({ ...prev, terms: undefined }))
            }
          >
            I agree to the terms and conditions
          </Checkbox>

          {errors.terms && (
            <span className="text-danger text-small">{errors.terms}</span>
          )}

          <div className="flex gap-4">
            <Button className="w-full" color="primary" type="submit">
              Submit
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
