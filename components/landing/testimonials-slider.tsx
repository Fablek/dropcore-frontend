"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardBody } from "@heroui/card";
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";

import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Alex Johnson",
    role: "CTO at NovaTech",
    text: "DropCore made our cloud transition seamless. The private microservices architecture is a game-changer.",
    image: "/avatars/alex.jpg",
  },
  {
    name: "Maria Chen",
    role: "Freelance Designer",
    text: "I love how simple and fast DropCore is. Drag-and-drop uploads and instant previews are lifesavers!",
    image: "/avatars/maria.jpg",
  },
  {
    name: "Liam Patel",
    role: "Founder of SyncFlow",
    text: "Security and flexibility in one platform. DropCore just works—and looks great doing it.",
    image: "/avatars/liam.jpg",
  },
];

export function TestimonialsSlider() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((i) => (i + 1) % testimonials.length);
  const prev = () =>
    setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  const testimonial = testimonials[index];

  return (
    <section className="py-20 px-4 max-w-4xl mx-auto text-center">
      <h2 className="text-4xl font-bold mb-4">What Our Users Say</h2>
      <p className="text-gray-500 mb-10">
        Real feedback from people who use DropCore daily.
      </p>

      <motion.div
        key={index}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto"
      >
        <Card className="bg-card text-card-foreground shadow-none mx-auto max-w-md">
          <CardBody className="space-y-6">
            <Quote className="mx-auto w-6 h-6" />
            <p className="text-lg text-center italic leading-relaxed">
              "{testimonial.text}"
            </p>
            <div className="flex items-center justify-center gap-4 pt-4">
              <Avatar
                src={testimonial.image}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="text-left">
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.role}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      </motion.div>

      <div className="flex justify-center gap-4 mt-8">
        <Button variant="outline" onClick={prev}>
          ← Previous
        </Button>
        <Button onClick={next}>Next →</Button>
      </div>
    </section>
  );
}
