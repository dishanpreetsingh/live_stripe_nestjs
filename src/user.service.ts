import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserDto } from "./dto/user.dto";
import { User, UserDocument } from "./schema/user.schema";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UserService{
    constructor(
        @InjectModel(User.name) private readonly userModel:Model<UserDocument>,
        private jwtService:JwtService ,
        ){}
        // const saltOrRounds = 10;
        // const salt = await bcrypt.genSalt();
        // const password = 'random_password';
        // const isMatch = await bcrypt.compare(password, hash);
        // const hash = await bcrypt.hash(password, saltOrRounds);
    public async create(userDate:UserDto){
        const saltOrRounds = 10; 
        const hash = await bcrypt.hash(userDate.password, saltOrRounds);
        userDate.password = hash;
        let newUser = new this.userModel(userDate);
        console.log("newUser",newUser);
        let saveuser = await newUser.save();
        console.log("saveuser",saveuser);
        return saveuser;
    }
    public async login(user:any):Promise<any>{
        let checkUser = await this.userModel.findOne({email:user.email});
        if(checkUser){
            const isMatch = await bcrypt.compare(user.password, checkUser.password);
        if(isMatch){
            let payload = {user_id:checkUser._id,user_name:checkUser.name};
            return {
                access_token:this.jwtService.sign(payload)
            }

        }else{
            return {
                status: HttpStatus.NOT_FOUND,
                message:"User Not Found",
                user:null
            }
        }
        }else{
            return {
                status: HttpStatus.NOT_FOUND,
                message:"User Not Found",
                user:null
            }
        }
    }
}