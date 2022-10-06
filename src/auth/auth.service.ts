import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schema/user.schema';
import { UserService } from 'src/user.service';


@Injectable()
export class AuthService {
    constructor(private usersService: UserService, private jwtTokenService: JwtService, 
        @InjectModel(User.name) private readonly userModel:Model<UserDocument> ){}

  public async validateUserCredentials(email: string, password: string): Promise<any> {
        console.log("check user",{email,password});
        const user = await this.userModel.findOne({email:email,password:password});
        console.log("user",user);
        if (user && user.password === password) {
            return user;
        }
        return null;
    }

    async loginWithCredentials(user: any) {
       let userData = await this.validateUserCredentials(user.email,user.password);
       if(userData){
        console.log("lo user",userData);
        const payload = { id:userData._id,name:userData.name };
        console.log("payload",payload);
        return {
            access_token: this.jwtTokenService.sign(payload),
        };
       }
        return {
            message:"User Not Found",
            user: null
        }
    }
}