"use client";

import { createCampaign } from "@/service/campaign/createCampaign";
import { useActionState } from "react";
import { Button } from "../ui/button";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

export default function CreateCampaign() {
  const [state, formAction, isPending] = useActionState(createCampaign, null);
  console.log(state);
  return (
    <>
      <form action={formAction}>
        <FieldGroup>
          <div className="text-center">Create your campaign</div>
          <Field>
            <FieldLabel>Title</FieldLabel>
            <Input
              className="border-gray-400"
              id="title"
              type="title"
              name="title"
              required
            />
          </Field>
          <Field>
            <FieldLabel>Subject</FieldLabel>
            <Input
              className="border-gray-400"
              id="subject"
              type="subject"
              name="subject"
              required
            />
          </Field>
          <Field>
            <FieldLabel>Recipients</FieldLabel>
            <Input
              className="border-gray-400"
              id="recipients"
              type="recipients"
              name="recipients"
              required
            />
          </Field>

          <Field>
            <Button type="submit">
              {isPending ? "Creating..." : "Create"}
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </>
  );
}
