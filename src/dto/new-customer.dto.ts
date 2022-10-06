import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class NewCustomerDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email:string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name:string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    tokenId:string;
}