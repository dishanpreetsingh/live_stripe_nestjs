import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ChargeDto {
    @ApiProperty({
        type:Number,
        default : 100
    })
    @IsNotEmpty()
    amount:any;
    @ApiProperty({
        type:String,
        default : 'usd'
    })
    @IsNotEmpty()
    currency:any;
    @ApiProperty({
        type:String,
        default : 'tok_1Lp4kDSAXo7EyuecRsZAM8Bq'
    })
    @IsNotEmpty()
    source:any;
    @ApiProperty({
        type:String,
        default : 'cus_MYB6CiatEp3al7'
    })
    @IsNotEmpty()
    customer:any;
}