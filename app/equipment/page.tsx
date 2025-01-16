import React from "react";
import EquipmentAttributes from "@/models/equipment";
import Equipment from "@/models/equipment";
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

export default async function EquipmentPage() {
  const equipmentData: EquipmentAttributes[] = await Equipment.findAll();
  return (
    <div>
      <div className="text-right m-4 p-2">
        <Link href="/equipment/new" passHref>
          <Button>Novo Equipamento (Beta)</Button>
        </Link>
      </div>
      <Table>
        <TableCaption>A list of your recent equipments.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {equipmentData.map((equipment) => (
            <TableRow key={equipment.id}>
              <TableCell>{equipment.id}</TableCell>
              <TableCell>
                <Link href={`/equipment/${equipment.id}`}>
                  {equipment.name}
                </Link>
              </TableCell>
              <TableCell>{equipment.type}</TableCell>
              <TableCell>{equipment.is_enabled}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
