import { BaseService } from "./base.service";

class UserService extends BaseService {
  async getPasswords() {
    return this.get<any>("/user/password");
  }

}

export const userService = new UserService();