"use client";
import React, { useState } from "react";
import { MaterialCreationAttributes } from "@/models/material";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Switch } from "@/components/ui/switch";

interface MaterialFormProps {
  save: (material: MaterialCreationAttributes) => Promise<{
    error: boolean;
    id: Number;
    message?: string;
  }>;
  initialData?: MaterialCreationAttributes | null;
}

export default function MaterialForm({
  initialData,
  save,
}: MaterialFormProps): JSX.Element {
  const [material, setMaterial] = useState<MaterialCreationAttributes>({
    id: initialData?.id,
    name: initialData?.name || "",
    type: initialData?.type || "",
    unit_type: initialData?.unit_type || "",
    unit_value: initialData?.unit_value || 0,
    direct_cost: initialData?.direct_cost || 0,
    indirect_cost: initialData?.indirect_cost || 0,
    markup: initialData?.markup || 0,
    average_waste: initialData?.average_waste || 0,
    width: initialData?.width || 0,
    height: initialData?.height || 0,
    thickness: initialData?.thickness || 0,
    is_enabled: initialData?.is_enabled || true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMaterial((prev) => ({ ...prev, [name]: value }));
  };

  async function handleSubmit() {
    console.log("Material FE", material);
    const res = await save(material);
    console.log("Res", res);

    // e.preventDefault();
  }

  // console.log(material);

  return (
    // <form onSubmit={handleSubmit} className="mt-4">
    <div className="flex flex-col p-4 border rounded-lg m-4 lg:w-3/4 lg:m-auto">
      <div>
        <Label htmlFor="name">Nome:</Label>
        <Input
          type="text"
          id="name"
          name="name"
          value={material.name}
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
          value={material.type}
          onChange={handleChange}
          required
        />
      </div>
      {/* <div>
        <Label htmlFor="manufacturer">Unit:</Label>
        <Input
          type="text"
          id="manufacturer"
          name="manufacturer"
          value={material.manufacturer}
          onChange={handleChange}
          required
        />
      </div> */}
      {/* <div>
        <Label htmlFor="year_aquisition">Ano of Aquisi&#231;&#227;o:</Label>
        <Input
          type="number"
          id="year_aquisition"
          name="year_aquisition"
          value={material.year_aquisition}
          onChange={handleChange}
          required
        />
      </div> */}
      <div className="flex gap-4">
        <div className="w-1/2">
          <Label htmlFor="direct_cost">Custos Diretos:</Label>
          <Input
            type="number"
            id="direct_cost"
            name="direct_cost"
            value={material.direct_cost}
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
            value={material.indirect_cost}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="flex gap-4">
        <div className="w-1/2">
          <Label htmlFor="production_ratio_unit">Desperdício Médio :</Label>
          <Input
            type="text"
            id="average_waste"
            name="average_waste"
            value={material.average_waste}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="flex gap-4">
        <div className="w-1/3">
          <Label htmlFor="width">Largura:</Label>
          <Input
            type="number"
            id="width"
            name="width"
            value={material.width}
            onChange={handleChange}
            required
          />
        </div>
        <div className="w-1/3">
          <Label htmlFor="height">Altura:</Label>
          <Input
            type="number"
            id="height"
            name="height"
            value={material.height}
            onChange={handleChange}
            required
          />
        </div>
        <div className="w-1/3">
          <Label htmlFor="thickness">Espessura:</Label>
          <Input
            type="number"
            id="thickness"
            name="thickness"
            value={material.thickness}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="my-4">
        <Switch
          id="is_enabled"
          checked={material.is_enabled}
          onCheckedChange={(e) =>
            setMaterial((prev) => ({ ...prev, is_enabled: e }))
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
