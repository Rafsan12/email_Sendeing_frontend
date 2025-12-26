"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Mail, Users, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateCampaign() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    recipients: [] as string[],
  });

  // State for the raw text input of emails
  const [emailInput, setEmailInput] = useState("");

  // Handler: Add emails when user presses Enter or Comma
  const handleEmailKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addEmails(emailInput);
    }
  };

  const addEmails = (input: string) => {
    if (!input) return;

    // Split by comma or newline, trim whitespace, and filter empty strings
    const newEmails = input
      .split(/[\n,]/)
      .map((email) => email.trim())
      .filter((email) => email !== "" && !formData.recipients.includes(email));

    if (newEmails.length > 0) {
      setFormData((prev) => ({
        ...prev,
        recipients: [...prev.recipients, ...newEmails],
      }));
      setEmailInput(""); // Clear input
    }
  };

  const removeEmail = (emailToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      recipients: prev.recipients.filter((email) => email !== emailToRemove),
    }));
  };

  // Handler: Submit to Backend
  const handleSubmit = async () => {
    setLoading(true);

    // 1. Construct the payload (contentHtml is empty for now)
    const payload = {
      title: formData.title,
      subject: formData.subject,
      recipients: formData.recipients,
      // createdById is usually handled by the session/backend, not sent from client
      contentHtml: "",
    };

    console.log("Submitting Payload:", payload);

    // Simulate API Call
    setTimeout(() => {
      // 2. Mock Success - Get an ID back from DB
      const newCampaignId = "123-abc-456";

      // 3. Redirect to the Builder Route using the new ID
      router.push(`/campaigns/${newCampaignId}/editor`);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#FFFBF5] p-8 md:p-12 font-sans text-stone-900">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-stone-900">
              Create New Campaign
            </h1>
            <p className="text-stone-500 mt-2">
              Set up your campaign details before designing the email.
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="border-stone-300 hover:bg-stone-100 text-stone-600"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={loading || !formData.title || !formData.subject}
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 shadow-lg shadow-orange-200"
            >
              {loading ? "Creating..." : "Next: Design Content"}
              {!loading && <ArrowRight className="ml-2 w-4 h-4" />}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT COLUMN: Campaign Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-stone-200 shadow-sm bg-white">
              <CardHeader>
                <CardTitle className="font-serif text-xl">
                  Campaign Details
                </CardTitle>
                <CardDescription>
                  Define how this email will appear in inboxes.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Title Input */}
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-stone-600">
                    Internal Campaign Name
                  </Label>
                  <Input
                    id="title"
                    placeholder="e.g. Black Friday Sale 2025"
                    className="border-stone-200 focus-visible:ring-orange-500 h-11"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                  />
                  <p className="text-xs text-stone-400">
                    Only visible to your team.
                  </p>
                </div>

                {/* Subject Input */}
                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-stone-600">
                    Subject Line
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 w-4 h-4 text-stone-400" />
                    <Input
                      id="subject"
                      placeholder="e.g. Celebrate 2025 With 50% OFF!"
                      className="pl-10 border-stone-200 focus-visible:ring-orange-500 h-11"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                    />
                  </div>
                </div>

                {/* Preheader (Optional) */}
                <div className="space-y-2">
                  <Label htmlFor="preheader" className="text-stone-600">
                    Preview Text{" "}
                    <span className="text-stone-400 font-normal">
                      (Optional)
                    </span>
                  </Label>
                  <Input
                    id="preheader"
                    placeholder="e.g. Don't miss out on these winter deals..."
                    className="border-stone-200 focus-visible:ring-orange-500 h-11"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT COLUMN: Audience / Recipients */}
          <div className="lg:col-span-1">
            <Card className="border-stone-200 shadow-sm bg-white h-full">
              <CardHeader>
                <CardTitle className="font-serif text-xl flex items-center gap-2">
                  <Users className="w-5 h-5 text-orange-600" />
                  Recipients
                </CardTitle>
                <CardDescription>Who are you sending this to?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Helper Badge */}
                <div className="bg-orange-50 text-orange-800 text-xs px-3 py-2 rounded-md border border-orange-100">
                  Tip: Paste a list of emails separated by commas or new lines.
                </div>

                {/* Text Area for Input */}
                <div className="space-y-2">
                  <Label className="text-xs font-semibold text-stone-500 uppercase tracking-wide">
                    Add Emails
                  </Label>
                  <Textarea
                    placeholder="paste@emails.com, example@test.com"
                    className="min-h-[120px] border-stone-200 focus-visible:ring-orange-500 resize-none font-mono text-sm"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    onKeyDown={handleEmailKeyDown}
                    onBlur={() => addEmails(emailInput)} // Add on blur as well
                  />
                  <Button
                    size="sm"
                    variant="secondary"
                    className="w-full mt-2 bg-stone-100 hover:bg-stone-200 text-stone-600"
                    onClick={() => addEmails(emailInput)}
                  >
                    Add to List
                  </Button>
                </div>

                {/* The Recipients List */}
                <div className="mt-6">
                  <div className="flex justify-between items-center mb-3">
                    <Label className="text-xs font-semibold text-stone-500 uppercase tracking-wide">
                      Selected Audience
                    </Label>
                    <Badge
                      variant="secondary"
                      className="bg-stone-100 text-stone-600"
                    >
                      {formData.recipients.length}
                    </Badge>
                  </div>

                  <div className="border border-stone-100 rounded-lg p-2 bg-stone-50/50 max-h-[200px] overflow-y-auto space-y-2">
                    {formData.recipients.length === 0 && (
                      <p className="text-sm text-stone-400 text-center py-4 italic">
                        No recipients added yet.
                      </p>
                    )}

                    {formData.recipients.map((email) => (
                      <div
                        key={email}
                        className="flex justify-between items-center bg-white border border-stone-200 px-3 py-2 rounded shadow-sm text-sm group"
                      >
                        <span className="truncate max-w-[180px] text-stone-700 font-mono text-xs">
                          {email}
                        </span>
                        <button
                          onClick={() => removeEmail(email)}
                          className="text-stone-400 hover:text-red-500 transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
