import { Body, Controller, Post} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { LoginDto } from "src/dto/login.dto";
import { UserDto } from "src/dto/user.dto";
import { UserService } from "src/user.service";

@Controller('user')
@ApiTags("User")
export class UserController {
    constructor(private readonly userService:UserService,
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