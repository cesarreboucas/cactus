import MainForm from "@/components/equipment/mainForm";
import { EquipmentCreationAttributes } from "@/models/equipment";
import Equipment from "@/models/equipment";

// const dummyData = {
//   id: 1,
//   name: "Plotter ACME",
//   type: "Fresadora",
//   model: "ACME 1X0Y",
//   manufacturer: "Acme Products",
//   year_aquisition: 2021,
//   direct_cost: 100,
//   indirect_cost: 500,
//   production_ratio_unit: "m²/h",
//   production_ratio_value: 10,
//   aquisition_cost: 2000,
//   depreciation_ratio: 0.1,
//   is_enabled: true,
// };

export default async function EquipmentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  async function save(equipment: EquipmentCreationAttributes): Promise<{
    error: boolean;
    id: Number;
    message?: string;
  }> {
    "use server";
    if (equipment.id !== undefined) {
      const existingEquipment = await Equipment.findByPk(equipment.id);
      if (existingEquipment) {
        await existingEquipment.update(equipment);
      } else {
        console.error("Equipment not found");
        return {
          error: true,
          id: 0,
          message: "ID não encontrado",
        };
      }
      return {
        error: false,
        id: equipment.id,
      };
    } else {
      const newEquipment = await Equipment.create(equipment);
      // console.log(newEquipment);
      return {
        error: false,
        id: newEquipment.id,
      };
    }
    // return;
    // Mutate data
    // return equipment as EquipmentCreationAttributes;
  }

  const loadEquipment = await (async function () {
    try {
      const idNumber = Number.parseInt(id);
      const existingEquipment = await Equipment.findByPk(idNumber);
      if (existingEquipment) {
        return existingEquipment.dataValues;
      }
    } catch (_e) {}
    return null;
  })();
  console.log("existingEquipment", loadEquipment);

  return (
    <div>
      <MainForm initialData={loadEquipment} save={save} />
    </div>
  );
}
