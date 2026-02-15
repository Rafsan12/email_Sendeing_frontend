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
import { orgRegister } from "@/service/auth/orgregister";
import { User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

export function OrgRegisterForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [state, formAction, isPending] = useActionState(orgRegister, null);
  console.log(state);
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      router.push("/login");
    }
  }, [state?.success, router]);
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
          href={"/register"}
          className={cn(
            "flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-all duration-300",

            "text-stone-500 hover:text-stone-700 hover:bg-stone-200/50",
          )}
        >
          <User className="w-4 h-4" />
          Personal
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
            <FieldLabel htmlFor="name">{"Contact Person Name"}</FieldLabel>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder={"Jane Smith"}
              required
              className="bg-stone-50/50 border-stone-200 focus-visible:ring-orange-500"
            />
          </Field>

          {/* COMPANY SPECIFIC FIELDS */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in zoom-in-95 duration-300">
            <Field>
              <FieldLabel htmlFor="orgName">Organization Name</FieldLabel>
              <Input
                id="orgName"
                name="orgName"
                type="text"
                placeholder="Acme Inc."
                required
                className="bg-stone-50/50 border-stone-200 focus-visible:ring-orange-500"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="orgType">Organization Type</FieldLabel>
              <Input
                id="orgType"
                name="orgType"
                type="text"
                placeholder="e.g. Agency, SaaS"
                required
                className="bg-stone-50/50 border-stone-200 focus-visible:ring-orange-500"
              />
            </Field>
          </div>

          <Field>
            <FieldLabel htmlFor="email">Work Email</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              required
              className="bg-stone-50/50 border-stone-200 focus-visible:ring-orange-500"
            />
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
          </Field>

          <Field className="pt-2">
            <Button
              type="submit"
              disabled={isPending}
              className="w-full bg-stone-900 hover:bg-orange-600 text-white shadow-lg hover:shadow-orange-200 transition-all"
            >
              {isPending ? "Registering.." : "Register Organization"}
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
