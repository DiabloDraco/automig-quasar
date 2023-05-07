import { BaseRestService } from "./BaseRestService";
import { Employee } from "src/models/Employee";

class EmployeeService extends BaseRestService<Employee> {
  constructor() {
    super("employes");
  }
}

export default new EmployeeService();
