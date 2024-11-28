"use client";
import React, { useState } from "react";
import {
  EquipmentAttributes,
  EquipmentCreationAttributes,
} from "@/models/equipment";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Switch } from "@/components/ui/switch";

interface EquipmentFormProps {
  save: (equipment: EquipmentCreationAttributes) => void;
  initialData?: EquipmentAttributes;
}

function EquipmentForm({ initialData, save }: EquipmentFormProps): JSX.Element {
  const [equipment, setEquipment] = useState<EquipmentCreationAttributes>({
    id: initialData?.id,
    name: initialData?.name || "",
    model: initialData?.model || "",
    is_enabled: initialData?.is_enabled || true,
    type: initialData?.type || "",
    manufacturer: initialData?.manufacturer || "",
    year_aquisition: initialData?.year_aquisition || 0,
    direct_cost: initialData?.direct_cost || 0,
    indirect_cost: initialData?.indirect_cost || 0,
    production_ratio_unit: initialData?.production_ratio_unit || "",
    production_ratio_value: initialData?.production_ratio_value || 0,
    aquisition_cost: initialData?.aquisition_cost || 0,
    depreciation_ratio: initialData?.depreciation_ratio || 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEquipment((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    save(equipment);
    e.preventDefault();
  };

  console.log(equipment);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Label htmlFor="name">Name:</Label>
        <Input
          type="text"
          id="name"
          name="name"
          value={equipment.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="model">Model:</Label>
        <Input
          type="text"
          id="model"
          name="model"
          value={equipment.model}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="type">Type:</Label>
        <Input
          type="text"
          id="type"
          name="type"
          value={equipment.type}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="manufacturer">Manufacturer:</Label>
        <Input
          type="text"
          id="manufacturer"
          name="manufacturer"
          value={equipment.manufacturer}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="year_aquisition">Year of Acquisition:</Label>
        <Input
          type="number"
          id="year_aquisition"
          name="year_aquisition"
          value={equipment.year_aquisition}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="direct_cost">Direct Cost:</Label>
        <Input
          type="number"
          id="direct_cost"
          name="direct_cost"
          value={equipment.direct_cost}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="indirect_cost">Indirect Cost:</Label>
        <Input
          type="number"
          id="indirect_cost"
          name="indirect_cost"
          value={equipment.indirect_cost}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="production_ratio_unit">Production Ratio Unit:</Label>
        <Input
          type="text"
          id="production_ratio_unit"
          name="production_ratio_unit"
          value={equipment.production_ratio_unit}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="production_ratio_value">Production Ratio Value:</Label>
        <Input
          type="number"
          id="production_ratio_value"
          name="production_ratio_value"
          value={equipment.production_ratio_value}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="aquisition_cost">Acquisition Cost:</Label>
        <Input
          type="number"
          id="aquisition_cost"
          name="aquisition_cost"
          value={equipment.aquisition_cost}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="depreciation_ratio">Depreciation Ratio:</Label>
        <Input
          type="number"
          id="depreciation_ratio"
          name="depreciation_ratio"
          value={equipment.depreciation_ratio}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Switch
          id="is_enabled"
          checked={equipment.is_enabled}
          onCheckedChange={(e) =>
            setEquipment((prev) => ({ ...prev, is_enabled: e }))
          }
        />
        <Label htmlFor="is_enabled">Status:</Label>
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
}

export default EquipmentForm;
