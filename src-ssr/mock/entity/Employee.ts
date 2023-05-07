import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity("employes")
export class Employee {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "text" })
  surname!: string;

  @Column({ type: "text" })
  name!: string;

  @Column({ type: "text" })
  patronymic!: string;

  @Column({ type: "text" })
  stage!: string;

  @Column({ type: "text" })
  birthday!: string;

  @Column({ type: "text" })
  placeBirth!: string;

  @Column({ type: "text" })
  citizenship!: string;

  @Column({ type: "text" })
  position!: string;

  @Column({ type: "text" })
  status!: string;
}
