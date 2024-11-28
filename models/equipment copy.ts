import { DataTypes, Model, Optional } from "sequelize";
import sequelizePostgres from "../config/postgress";

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
  is_enabled: boolean;
}

export interface EquipmentCreationAttributes
  extends Optional<EquipmentAttributes, "id"> {}

export default class Equipment
  extends Model<EquipmentAttributes, EquipmentCreationAttributes>
  implements EquipmentAttributes
{
  public id!: number;
  public name!: string;
  public type!: string;
  public model!: string;
  public manufacturer!: string;
  public year_aquisition!: number;
  public direct_cost!: number;
  public indirect_cost!: number;
  public production_ratio_unit!: string;
  public production_ratio_value!: number;
  public aquisition_cost!: number;
  public depreciation_ratio!: number;
  public is_enabled!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
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
      type: DataTypes.ENUM("Plotter", "Fresadora", "Outro"),
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
      type: DataTypes.ENUM("m²/h", "m³/hour"),
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
    is_enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizePostgres,
    // tableName: "equipment",
  }
);
