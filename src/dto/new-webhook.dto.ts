import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class NewWebhookDto{
    @ApiProperty({
        type:String,
        default:'https://example.com/my/webhook/endpoint'
    })
    @IsNotEmpty()
    url: any;
    @ApiProperty({
        type:String,
        default:   [
            'charge.failed',
            'charge.succeeded',
          ],
    })
    enabled_events:any;
}