import { BaseService } from "./base.service";

class AuthService extends BaseService {
  async signup(data: {
    userName: string;
    email: string;
    password: string;
  }) {
    return this.post<any>("/user/signup", data);
  }

  async login(data: { email: string; password: string }) {
    return this.post<any>("/user/login", data);
  }

  async verifyEmail(token: string) {
    return this.get<any>(`/user/verify/${token}`);
  }
}

export const authService = new AuthService();