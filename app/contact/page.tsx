"use client";
import { title } from "@/components/primitives";
import { Mail, Phone, MapPin } from "lucide-react";
import { Input } from "@heroui/input";
import { Textarea } from "@heroui/input";
import { Button } from "@heroui/button";

export default function ContactPage() {
  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* Hero */}
      <div className="text-center mb-16">
        <h1
          className={`${title()} text-4xl md:text-5xl bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent`}
        >
          Get in Touch
        </h1>
        <p className="text-muted-foreground mt-3 text-lg">
          We'd love to hear from you. Send us a message or reach out directly.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-12 md:gap-8">
        {/* Contact Info */}
        <div className="md:basis-1/4 space-y-8">
          <ContactItem
            icon={<Mail className="w-6 h-6 text-purple-500" />}
            label="Email"
            value="contact@example.com"
          />
          <ContactItem
            icon={<Phone className="w-6 h-6 text-purple-500" />}
            label="Phone"
            value="+48 123 456 789"
          />
          <ContactItem
            icon={<MapPin className="w-6 h-6 text-purple-500" />}
            label="Location"
            value="Warsaw, Poland"
          />
        </div>

        {/* Form */}
        <form className="md:basis-3/4 space-y-6 bg-muted/10 rounded-2xl shadow-lg">
          <div>
            <label className="block mb-1 text-sm font-medium">Name</label>
            <Input placeholder="Your name" />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <Input type="email" placeholder="you@example.com" />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Message</label>
            <Textarea rows={5} placeholder="Write your message..." />
          </div>
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition font-semibold"
          >
            Send Message
          </Button>
        </form>
      </div>
    </div>
  );
}

function ContactItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="pt-1">{icon}</div>
      <div className="text-left">
        <p className="font-semibold text-white">{label}</p>
        <p className="text-muted-foreground">{value}</p>
      </div>
    </div>
  );
}
