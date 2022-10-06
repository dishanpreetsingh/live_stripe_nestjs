import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class GetSubscriptionDto{
    @ApiProperty()
    @IsNotEmpty()
    sub_id:string;
}