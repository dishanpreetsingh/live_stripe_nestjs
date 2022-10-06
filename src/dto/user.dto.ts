import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UserDto{
    @ApiProperty()
    @IsNotEmpty()
    name:string;
    @ApiProperty()
    @IsNotEmpty()
    email:string;
    @ApiProperty()
    @IsNotEmpty()
    password:string;
}