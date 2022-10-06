import { Body, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { cancelSubscriptionDto } from "src/dto/cancel-subscription.dto";
import { ChargeDto } from "src/dto/charge.dto";
import { GetSubscriptionDto } from "src/dto/get-subscription.dto";
import { NewCardDto } from "src/dto/new-card.dto";
import { NewCustomerDto } from "src/dto/new-customer.dto";
import { NewPlanDto } from "src/dto/new-plan.dto";
import { NewProductDto } from "src/dto/new-product.dto";
import { NewSubscriptionDto } from "src/dto/new-subscription.dto";
import { NewWebhookDto } from "src/dto/new-webhook.dto";
import { UpDownSubDto } from "src/dto/up-down-subscription.dto";
import { JwtAuthGuard } from "src/guard/jwt-auth-guard";
import { StripeService } from "src/stripe.service";

@ApiBearerAuth('defaultBearerAuth')
@Controller("Stripe")
@ApiTags("Stripe")
@UseGuards(JwtAuthGuard)
export class StripeController {
    constructor(private readonly stripeService:StripeService) {}
    @Post("/token")
    async createToken(@Body() cardInfo: NewCardDto):Promise<any>{
      return await this.stripeService.token(cardInfo);
    }
    @Post("/add-customer")
    async createCustomer(@Body() customerInfo:NewCustomerDto): Promise<any>{
      return await this.stripeService.createCustomer(customerInfo);
    }

    @UseGuards(JwtAuthGuard)
    @Post("/add-charge")
    async createCharge(@Body() charge: ChargeDto, @Req() req) {
       return await this.stripeService.createCharge(charge);
      }

      @Post("/add-product")
      async addProduct(@Body() product: NewProductDto):Promise<any>{
        return await this.stripeService.createProduct(product);
      }

      @Post("/add-plan")
      async addPlan(@Body() plan:NewPlanDto):Promise<any>{
        return await this.stripeService.createPlan(plan);
      }
    
      @Post("/add-subscription")
      async addSubscription(@Body() data:NewSubscriptionDto):Promise<any>{
        return await this.stripeService.createSubscription(data);
      }

      @Post('/get-subscription/:sub_id')
      async getSub(@Param() params:GetSubscriptionDto):Promise<any>{
        return await this.stripeService.getSubscription(params);
      }

      @Post("/update-subscription/:sub_id")
      async updateSub(@Body() data: cancelSubscriptionDto,@Param() params:GetSubscriptionDto):Promise<any>{
        let info = {data,params};
        return await this.stripeService.updateSub(info);
      }

      @Post("/delete-subscription/:sub_id")
      async deleteSub(@Param() params: GetSubscriptionDto):Promise<any>{
        return await this.stripeService.deleteSub(params);
      }

      @Post("/up-down-subscription")
      async upDownSub(@Body() data:UpDownSubDto):Promise<any>{
        return await  this.stripeService.upDownSub(data);
      }

      @Post("/add-webhook")
      async addWebhook(@Body() data:NewWebhookDto):Promise<any>{
        return await this.stripeService.createWebhook(data);
      }
}