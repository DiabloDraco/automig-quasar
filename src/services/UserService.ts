import { User } from "src/models/User";
import { BaseRestService } from "./BaseRestService";

class UserService extends BaseRestService<User> {
  constructor() {
    super("users");
  }
}

export default new UserService();
