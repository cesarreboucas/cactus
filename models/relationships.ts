import { Sequelize } from "sequelize";
import Equipment from "./equipment";
import Material from "./material";

Equipment.belongsToMany(Material, { through: "equipment_materials" });
Material.belongsToMany(Equipment, { through: "equipment_materials" });

export default function createRelationships(sequelize: Sequelize) {}

(() => {
  Equipment.sync();
  Material.sync();
})();
