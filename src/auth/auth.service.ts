import * as bcryptjs from 'bcryptjs';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../main/services/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/dataAccess/dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne({ username });
    if (user) {
      const valid = await bcryptjs.compare(pass, user.password);
      if (valid) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async login(user: UserDto) {
    return {
      access_token: this.jwtService.sign(user),
    };
  }
}