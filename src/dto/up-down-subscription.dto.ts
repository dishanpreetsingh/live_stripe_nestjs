import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UpDownSubDto{
    @ApiProperty()
    @IsNotEmpty()
    sub_id:string;
    @ApiProperty()
    @IsNotEmpty()
    price:string;

}