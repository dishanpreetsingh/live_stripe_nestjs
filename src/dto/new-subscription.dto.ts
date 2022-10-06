import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class NewSubscriptionDto {
    @ApiProperty({
        type:String,
        default: "cus_MYBt7dMACxnAvi"
    })
    @IsNotEmpty()
    customer:any;
    @ApiProperty({
        type:String,
        default:[{price:"price_1Lp5pqLvH9VDuuLNTpXZwBOC"}]
    })
    @IsNotEmpty()
    items:any;
    
}