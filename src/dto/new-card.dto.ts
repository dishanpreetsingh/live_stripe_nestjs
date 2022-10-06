import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class NewCardDto {
    @ApiProperty({
        type:Number,
        default: 4242424242424242,
    })
    @IsNotEmpty()
    number:any;
    @ApiProperty({
        type:Number,
        default: 10,
    })
    @IsNotEmpty()
    exp_month:any;
    @ApiProperty({
        type:Number,
        default: 2024,
    })
    @IsNotEmpty()
    exp_year:any;
    @ApiProperty({
        type:Number,
        default: 314,
    })
    @IsNotEmpty()
    cvc:any;
}