import {
  DataTypes,
  Model,
  Optional,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import sequelize from "../config/postgress";
import Equipment from "./equipment";

export interface MaterialAttributes {
  id: number;
  name: string;
  type: string;
  unit_type: string;
  unit_value: number;
  direct_cost: number;
  indirect_cost: number;
  markup: number;
  average_waste: number;
  width: number;
  height: number;
  thickness: number;
  // is_used_by: Equipment[];
  is_enabled: boolean;
}

export interface MaterialCreationAttributes
  extends Optional<MaterialAttributes, "id"> {}

export default class Material extends Model<
  InferAttributes<Material>,
  InferCreationAttributes<Material>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare type: string;
  declare unit_type: string;
  declare unit_value: number;
  declare direct_cost: number;
  declare indirect_cost: number;
  declare markup: number;
  declare average_waste: number;
  declare width: number;
  declare height: number;
  declare thickness: number;
  // declare is_used_by: Equipment[];
  declare is_enabled: boolean;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Material.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    unit_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    unit_value: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    direct_cost: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    indirect_cost: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    markup: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    average_waste: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    width: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    height: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    thickness: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    is_enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    // is_used_by: {
    //   type: DataTypes.ARRAY(DataTypes.INTEGER),
    //   allowNull: true,
    // },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "material",
  }
);

// Material.belongsToMany(Equipment, { through: "equipment_materials" });
// (async () => {
//   await sequelize.sync();
// })();
