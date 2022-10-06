import { Injectable } from "@nestjs/common";
import Stripe from "stripe";

@Injectable()
export class StripeService{
    private stripe;
    constructor(){
        this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY,{
            apiVersion: '2022-08-01',
        });
    }
    public async createCustomer(customer:any):Promise<any>{
        console.log("customer",customer);
       let newCustomer = await this.stripe.customers.create({
        name:customer.name,
        email:customer.email,
        source:customer.tokenId
       });
       if(newCustomer){
        return newCustomer;
       }else{
        return null;
       }
    }

    public async token(data:any):Promise<any>{
        console.log("data",data);
        const token = await this.stripe.tokens.create({
            card: {
              number: data.number,
              exp_month: data.exp_month,
              exp_year: data.exp_year,
              cvc: data.cvc,
            },
          });
          if(token){
            return token
          }else{
            return null
          }
    }


    public async createCharge(data:any):Promise<any>{
        console.log("data",data);
        let charge = await this.stripe.charges.create({
            amount:data.amount,
            currency:data.currency,
            source:data.source,
            customer:data.customer
        });
        if(charge){
            return charge;
        }else{
            return null;
            
        }
    }
    public async createProduct(data:any):Promise<any>{
        console.log("data",data);
        let product = await this.stripe.products.create(data);
        if(product){
            return product;
        }else{
            return null;
        }
    }

    public async createPlan(data:any):Promise<any>{
        console.log("data",data);
        let plan = await this.stripe.plans.create(data);
        if(plan){
            return plan;
        }else{
            return null;
        }
    }

    public async createSubscription(data:any):Promise<any>{
        console.log("data",data);
        let createsub = await this.stripe.subscriptions.create(data);
        console.log("createsub",createsub);
        if(createsub){
            return createsub;
        }else{
            return null;
        }
    }

    public async getSubscription(data:any):Promise<any>{
        console.log("data",data);
        let getsub = await this.stripe.subscriptions.retrieve(data.sub_id);
        if(getsub){
            return getsub;
        }else{
            return null
        }
    }

    public async updateSub(data:any):Promise<any>{
        console.log("data",data);
        console.log("data.params.sub_id,query",data.data.cancel_at_period_end);
        var query ;
        if(data.data.cancel_at === null && data.data.cancel_at_period_end === true){
            query = { 
                cancel_at_period_end: data.data.cancel_at_period_end,
            }
        }else if(data.data.cancel_at_period_end === false){
            query = {
                cancel_at:data.data.cancel_at
            }
        }
        let subInfo = await this.stripe.subscriptions.update( data.params.sub_id,query);
        console.log("subinfo",subInfo);
        return subInfo; 
    }
    
    public async deleteSub(data:any):Promise<any>{
        console.log("data",data);
        let subInfo = await this.stripe.subscriptions.del(data.sub_id);
        return subInfo;
    }
    
    public async upDownSub(data:any):Promise<any>{
        console.log("data",data);
        let subInfo = await this.stripe.subscriptions.retrieve(data.sub_id);
        console.log("subInfo",subInfo);
        let updated = await this.stripe.subscriptions.update(data.sub_id, {
            cancel_at_period_end: false,
            proration_behavior: 'create_prorations',
            items: [{
              id: subInfo.items.data[0].id,
              price: data.price,
            }]
          })
          return updated;
    }

    public async createWebhook(data:any):Promise<any>{
        console.log("data",data);
        let webhooks = await this.stripe.webhookEndpoints.create(data);
        return webhooks;
    }

}