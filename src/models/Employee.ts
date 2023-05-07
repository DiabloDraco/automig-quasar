import { User } from "./User";

export interface Employee {
  id: number;
  user: User;
  surname: string;
  name: string;
  patronymic: string;
  stage: string;
  birthday: string;
  placeBirth: string;
  citizenship: string;
  langKnowledge: string[];
  education: string[];
  position: string;
  passport: string;
  card: string;
  status: string;
}
