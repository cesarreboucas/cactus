import {
  DataTypes,
  Model,
  Optional,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  HasMany,
} from "sequelize";
import sequelize from "../config/postgress";
import type Material from "./material";

export interface EquipmentAttributes {
  id: number;
  name: string;
  type: string;
  model: string;
  manufacturer: string;
  year_aquisition: number;
  direct_cost: number;
  indirect_cost: number;
  production_ratio_unit: string;
  production_ratio_value: number;
  aquisition_cost: number;
  depreciation_ratio: number;
  // uses_materials: Material[];
  is_enabled: boolean;
}

export interface EquipmentCreationAttributes
  extends Optional<EquipmentAttributes, "id"> {}

export default class Equipment extends Model<
  InferAttributes<Equipment>,
  InferCreationAttributes<Equipment>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare type: string;
  declare model: string;
  declare manufacturer: string;
  declare year_aquisition: number;
  declare direct_cost: number;
  declare indirect_cost: number;
  declare production_ratio_unit: string;
  declare production_ratio_value: number;
  declare aquisition_cost: number;
  declare depreciation_ratio: number;
  // declare uses_materials: Material[];
  declare is_enabled: boolean;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Equipment.init(
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
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    manufacturer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year_aquisition: {
      type: DataTypes.INTEGER,
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
    production_ratio_unit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    production_ratio_value: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    aquisition_cost: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    depreciation_ratio: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    // uses_materials: {
    //   type: DataTypes.ARRAY(DataTypes.INTEGER),
    //   allowNull: true,
    // },
    is_enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
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
    tableName: "equipment",
  }
);
