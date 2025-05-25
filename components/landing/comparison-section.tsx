"use client";

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/table";

import { FaCheck } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";

export function ComparisonSection() {
  return (
     <section className="py-16 px-4 mx-auto text-center max-w-7xl">
      <h2 className="text-4xl font-bold mb-6">How DropCore compares</h2>
      <p className="text-gray-500 mb-10">
        See how DropCore stacks up against mainstream cloud platforms.
      </p>

      <div className="overflow-x-auto">
        <Table aria-label="Comparison Table" isCompact removeWrapper isStriped isStatic>
          <TableHeader>
            <TableColumn>Feature</TableColumn>
            <TableColumn>DropCore</TableColumn>
            <TableColumn>Dropbox</TableColumn>
            <TableColumn>Google Drive</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow key="1">
              <TableCell>Private by default</TableCell>
              <TableCell>✅</TableCell>
              <TableCell>❌</TableCell>
              <TableCell>❌</TableCell>
            </TableRow>
            <TableRow key="2">
              <TableCell>Self-hosting possible</TableCell>
              <TableCell>✅</TableCell>
              <TableCell>❌</TableCell>
              <TableCell>❌</TableCell>
            </TableRow>
            <TableRow key="3">
              <TableCell>Open-source</TableCell>
              <TableCell>✅</TableCell>
              <TableCell>❌</TableCell>
              <TableCell>❌</TableCell>
            </TableRow>
            <TableRow key="4">
              <TableCell>Free tier available</TableCell>
              <TableCell>✅</TableCell>
              <TableCell>✅</TableCell>
              <TableCell>✅</TableCell>
            </TableRow>
            <TableRow key="5">
              <TableCell>File previews</TableCell>
              <TableCell>✅</TableCell>
              <TableCell>✅</TableCell>
              <TableCell>✅</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
