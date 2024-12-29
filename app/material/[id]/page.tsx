import MainForm from "@/components/material/mainForm";
import { MaterialCreationAttributes } from "@/models/material";
import Material from "@/models/material";

export default async function MaterialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  async function save(material: MaterialCreationAttributes): Promise<{
    error: boolean;
    id: Number;
    message?: string;
  }> {
    "use server";
    if (material.id !== undefined) {
      const existingMaterial = await Material.findByPk(material.id);
      if (existingMaterial) {
        await existingMaterial.update(material);
      } else {
        console.error("Material not found");
        return {
          error: true,
          id: 0,
          message: "ID não encontrado",
        };
      }
      return {
        error: false,
        id: material.id,
      };
    } else {
      const newMaterial = await Material.create(material);
      return {
        error: false,
        id: newMaterial.id,
      };
    }
  }

  const loadMaterial = await (async function () {
    try {
      const idNumber = Number.parseInt(id);
      const existingMaterial = await Material.findByPk(idNumber);
      if (existingMaterial) {
        return existingMaterial.dataValues;
      }
    } catch (_e) {}
    return null;
  })();
  console.log("existingMaterial", loadMaterial);

  return (
    <div>
      <MainForm initialData={loadMaterial} save={save} />
    </div>
  );
}
