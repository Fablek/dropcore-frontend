"use client";

import { Card, CardBody } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Check, X } from "lucide-react";

const comparisons = [
  {
    feature: "Private by default",
    dropcore: true,
    dropbox: false,
    gdrive: false,
  },
  {
    feature: "Self-hosting possible",
    dropcore: true,
    dropbox: false,
    gdrive: false,
  },
  {
    feature: "Open-source",
    dropcore: true,
    dropbox: false,
    gdrive: false,
  },
  {
    feature: "Free tier available",
    dropcore: true,
    dropbox: true,
    gdrive: true,
  },
  {
    feature: "File previews",
    dropcore: true,
    dropbox: true,
    gdrive: true,
  },
];

export function ComparisonSection() {
  return (
    <section className="py-16 px-4 max-w-6xl mx-auto text-center">
      <h2 className="text-4xl font-bold mb-4">How DropCore compares</h2>
      <p className="text-gray-500 mb-12 max-w-2xl mx-auto">
        See how DropCore stacks up against mainstream cloud platforms.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
        {comparisons.map((item) => (
          <Card key={item.feature}>
            <CardBody className="p-5">
              <h3 className="text-lg font-semibold mb-4">{item.feature}</h3>
              <ul className="text-sm space-y-2">
                <li className="flex justify-between items-center">
                  <span className="text-gray-400">DropCore</span>
                  {item.dropcore ? (
                    <Check className="text-green-400 w-5 h-5" />
                  ) : (
                    <X className="text-red-400 w-5 h-5" />
                  )}
                </li>
                <Divider orientation="horizontal" />
                <li className="flex justify-between items-center">
                  <span className="text-gray-400">Dropbox</span>
                  {item.dropbox ? (
                    <Check className="text-green-400 w-5 h-5" />
                  ) : (
                    <X className="text-red-400 w-5 h-5" />
                  )}
                </li>
                <Divider orientation="horizontal" />
                <li className="flex justify-between items-center">
                  <span className="text-gray-400">Google Drive</span>
                  {item.gdrive ? (
                    <Check className="text-green-400 w-5 h-5" />
                  ) : (
                    <X className="text-red-400 w-5 h-5" />
                  )}
                </li>
              </ul>
            </CardBody>
          </Card>
        ))}
      </div>
    </section>
  );
}
