import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entity/User";
import { Employee } from "../entity/Employee";

export const repository = new DataSource({
  type: "sqlite",
  database: `./db.sqlite`,
  synchronize: true,
  logging: false,
  entities: [User, Employee],
  subscribers: [],
  migrations: [],
});

repository.initialize();

export default repository;
