import React from "react";
import MaterialAttributes from "@/models/material";
import Material from "@/models/material";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// const equipmentData: EquipmentAttributes[]

export default async function MaterialPage() {
  const materialData: MaterialAttributes[] = await Material.findAll();
  return (
    <div>
      <div className="text-right m-4 p-2">
        <Link href="/equipment/new" passHref>
          <Button>Novo Material</Button>
        </Link>
      </div>
      <Table>
        <TableCaption>A list of your materials.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {materialData.map((material) => (
            <TableRow key={material.id}>
              <TableCell>{material.id}</TableCell>
              <TableCell>
                <Link href={`/equipment/${material.id}`}>{material.name}</Link>
              </TableCell>
              <TableCell>{material.type}</TableCell>
              <TableCell>{material.is_enabled}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
