import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class NewPlanDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    nickname:string;
    @ApiProperty({
        type:Number,
        default:2000
    })
    @IsNotEmpty()
    amount:any;
    @ApiProperty({
        type:String,
        default: 'usd'
    })
    @IsNotEmpty()
    currency:any;
    @ApiProperty({
        type:String,
        default: 'month'
    })
    @IsNotEmpty()
    interval:any;
    @ApiProperty({
        type:String,
        default: 'prod_MYCEMkguJGGq0u'
    })
    @IsNotEmpty()
    product:any;
}