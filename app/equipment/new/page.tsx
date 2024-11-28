import MainForm from "@/components/equipment/mainForm";
import { EquipmentCreationAttributes } from "@/models/equipment";
import Equipment from "@/models/equipment";
const dummyData = {
  id: 1,
  name: "Plotter ACME",
  type: "Fresadora",
  model: "ACME 1X0Y",
  manufacturer: "Acme Products",
  year_aquisition: 2021,
  direct_cost: 100,
  indirect_cost: 500,
  production_ratio_unit: "m²/h",
  production_ratio_value: 10,
  aquisition_cost: 2000,
  depreciation_ratio: 0.1,
  is_enabled: true,
};

export default function EquipmentPage() {
  async function save(equipment: EquipmentCreationAttributes) {
    "use server";
    console.log(equipment);
    const newEquipment = await Equipment.create(equipment);
    console.log(newEquipment);
    // Mutate data
  }

  return (
    <div>
      <MainForm initialData={dummyData} save={save} />
    </div>
  );
}
