import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "src/auth/auth.service";
import { LoginDto } from "src/dto/login.dto";
import { UserDto } from "src/dto/user.dto";
import { JwtAuthGuard } from "src/guard/jwt-auth-guard";
import { UserService } from "src/user.service";

@Controller('user')
@ApiTags("User")
export class UserController {
    constructor(private readonly userService:UserService,
            private readonly authService:AuthService
        ){}
    
    @Post('login')
    async login(@Body() user:LoginDto) {
        console.log("user",user);
    return this.userService.login(user);
    }
    @Post('/register')
    public async createUser(@Body() user:UserDto){
       return await this.userService.create(user);
    }
}