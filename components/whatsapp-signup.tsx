"use client";

import type React from "react";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MessageCircle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Conference {
  id: string;
  name: string;
  city: string;
}

interface WhatsAppSignupProps {
  conferences: Conference[];
}

export function WhatsAppSignup({ conferences }: WhatsAppSignupProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    conference: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.conference) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/xovgwojg", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          conference: formData.conference,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        toast({
          title: "Submission Failed",
          description:
            data?.errors?.[0]?.message ||
            "Something went wrong. Please try again.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }
    } catch {
      toast({
        title: "Network Error",
        description:
          "Unable to submit right now. Please check your connection and try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(false);
    setIsSubmitted(true);

    toast({
      title: "Successfully Registered!",
      description: `We'll add you to the ${
        conferences.find((c) => c.id === formData.conference)?.name
      } WhatsApp community soon.`,
    });
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({ name: "", phone: "", conference: "" });
  };

  if (isSubmitted) {
    return (
      <Card className="max-w-md mx-auto">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto" />
            <h3 className="text-xl font-semibold text-gray-900">
              Registration Successful!
            </h3>
            <p className="text-gray-600">
              We'll add you to the WhatsApp community for{" "}
              <strong>
                {conferences.find((c) => c.id === formData.conference)?.name}
              </strong>{" "}
              within 24 hours.
            </p>
            <Button
              onClick={handleReset}
              variant="outline"
              className="w-full bg-transparent"
            >
              Register for Another Conference
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-center">
          <MessageCircle className="h-5 w-5 mr-2 text-green-600" />
          Join WhatsApp Community
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+44 7XXX XXXXXX"
              value={formData.phone}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, phone: e.target.value }))
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="conference">Select Conference</Label>
            <Select
              value={formData.conference}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, conference: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose a conference" />
              </SelectTrigger>
              <SelectContent>
                {conferences.map((conference) => (
                  <SelectItem key={conference.id} value={conference.id}>
                    {conference.name} - {conference.city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Join WhatsApp Community"}
          </Button>
        </form>

        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-xs text-blue-800">
            <strong>Privacy Note:</strong> Your phone number will only be used
            to add you to the relevant WhatsApp community. We respect your
            privacy and won't share your details.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
