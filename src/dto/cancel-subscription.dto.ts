import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class cancelSubscriptionDto {
    @ApiProperty({
        type:Date,
        default: "1664994600"
    })
    @IsNotEmpty()
    cancel_at:any;
    @ApiProperty({
        type:Boolean,
        default: false
    })
    @IsNotEmpty()
    cancel_at_period_end:any;
    
}