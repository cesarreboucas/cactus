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
  save: (equipment: EquipmentCreationAttributes) => Promise<{
    error: boolean;
    id: Number;
    message?: string;
  }>;
  initialData?: EquipmentCreationAttributes | null;
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

  async function handleSubmit() {
    console.log("Equipment FE", equipment);
    const res = await save(equipment);
    console.log("Res", res);

    // e.preventDefault();
  }

  // console.log(equipment);

  return (
    // <form onSubmit={handleSubmit} className="mt-4">
    <div className="flex flex-col p-4 border rounded-lg m-4 lg:w-3/4 lg:m-auto">
      <div>
        <Label htmlFor="name">Nome:</Label>
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
        <Label htmlFor="model">Modelo:</Label>
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
        <Label htmlFor="type">Tipo:</Label>
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
        <Label htmlFor="manufacturer">Fabricante:</Label>
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
        <Label htmlFor="year_aquisition">Ano of Aquisi&#231;&#227;o:</Label>
        <Input
          type="number"
          id="year_aquisition"
          name="year_aquisition"
          value={equipment.year_aquisition}
          onChange={handleChange}
          required
        />
      </div>
      <div className="flex gap-4">
        <div className="w-1/2">
          <Label htmlFor="direct_cost">Custos Diretos:</Label>
          <Input
            type="number"
            id="direct_cost"
            name="direct_cost"
            value={equipment.direct_cost}
            onChange={handleChange}
            required
          />
        </div>
        <div className="w-1/2">
          <Label htmlFor="indirect_cost">Custos Indiretos:</Label>
          <Input
            type="number"
            id="indirect_cost"
            name="indirect_cost"
            value={equipment.indirect_cost}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="flex gap-4">
        <div className="w-1/2">
          <Label htmlFor="production_ratio_unit">
            Unidade de Produ&#231;&#227;o:
          </Label>
          <Input
            type="text"
            id="production_ratio_unit"
            name="production_ratio_unit"
            value={equipment.production_ratio_unit}
            onChange={handleChange}
            required
          />
        </div>
        <div className="w-1/2">
          <Label htmlFor="production_ratio_value">Produ&#231;&#227;o:</Label>
          <Input
            type="number"
            id="production_ratio_value"
            name="production_ratio_value"
            value={equipment.production_ratio_value}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="flex gap-4">
        <div className="w-1/2">
          <Label htmlFor="aquisition_cost">
            Custo de Aquisi&#231;&#227;o Cost:
          </Label>
          <Input
            type="number"
            id="aquisition_cost"
            name="aquisition_cost"
            value={equipment.aquisition_cost}
            onChange={handleChange}
            required
          />
        </div>
        <div className="w-1/2">
          <Label htmlFor="depreciation_ratio">
            Percentual de Deprecia&#231;&#227;o anual:
          </Label>
          <Input
            type="number"
            id="depreciation_ratio"
            name="depreciation_ratio"
            value={equipment.depreciation_ratio}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="my-4">
        <Switch
          id="is_enabled"
          checked={equipment.is_enabled}
          onCheckedChange={(e) =>
            setEquipment((prev) => ({ ...prev, is_enabled: e }))
          }
        />
        <Label htmlFor="is_enabled">Status:</Label>
      </div>
      <div className="text-right my-4">
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </div>
    // </form>
  );
}

export default EquipmentForm;
