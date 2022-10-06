import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class NewProductDto {
    @ApiProperty({
        type:String,
        default: "Gold Special"
    })
    @IsNotEmpty()
    name:any;
}