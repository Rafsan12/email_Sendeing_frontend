"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { registerUser } from "@/service/auth/registerUser";
import { Building2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [state, formAction, isPending] = useActionState(registerUser, null);
  console.log(state?.errors);
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      router.push("/login");
    }
  }, [state?.success, router]);

  const getFieldError = (fieldName: string): string | undefined => {
    return state?.errors?.find((err) => err.field === fieldName)?.message;
  };

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      {/* HEADER */}
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-3xl font-serif font-bold text-stone-900">
          Create an account
        </h1>
        <p className="text-stone-500 text-sm">
          Join thousands of marketers building better campaigns.
        </p>
      </div>

      {/* CUSTOM TABS */}
      <div className="p-1 bg-stone-100/80 rounded-xl">
        <Link
          href={"/company"}
          className={cn(
            " flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-all duration-300",
          )}
        >
          <Building2 className="w-4 h-4" />
          Company
        </Link>
      </div>

      {/* FORM */}
      <form
        action={formAction}
        {...props}
        className="animate-in fade-in slide-in-from-bottom-2 duration-500"
      >
        <FieldGroup className="space-y-4">
          {/* COMMON FIELDS */}
          <Field>
            <FieldLabel htmlFor="name">{"Full Name"}</FieldLabel>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder={"John Doe"}
              required
              className="bg-stone-50/50 border-stone-200 focus-visible:ring-orange-500"
            />
            {getFieldError("name") && (
              <FieldDescription className="text-red-600">
                {getFieldError("name")}
              </FieldDescription>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              required
              className="bg-stone-50/50 border-stone-200 focus-visible:ring-orange-500"
            />
            {state?.errors?.find((e) => e.field === "email") && (
              <p className="text-red-500 text-xs mt-1">
                {state.errors.find((e) => e.field === "email")?.message}
              </p>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              name="password"
              type="password"
              required
              className="bg-stone-50/50 border-stone-200 focus-visible:ring-orange-500"
            />
            {getFieldError("password") && (
              <FieldDescription className="text-red-600">
                {getFieldError("password")}
              </FieldDescription>
            )}
          </Field>

          <Field className="pt-2">
            <Button
              type="submit"
              className="w-full bg-stone-900 hover:bg-orange-600 text-white shadow-lg hover:shadow-orange-200 transition-all"
            >
              {isPending ? "Creating Account" : "Create Personal Account"}
            </Button>
          </Field>

          <Field>
            <FieldDescription className="text-center text-xs mt-4">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-stone-900 underline underline-offset-4 hover:text-orange-600 decoration-orange-300"
              >
                Log in
              </Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
