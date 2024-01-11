export interface signup{
  name:string,
  password:string,
  email:string,
  address:string

 }
 export interface adminuser
 {
    name:string,
    password:string,
    email:string
 }
 export class signupp{
  constructor(
    public name:string,
   public password:string,
   public email:string,
   public address:string

  ){}
}
 export interface login
{
  name:string,
  email:string,
  password:string
}

export interface product{
  name:string,
  price:number,
  colour:string,
  brand:string,
  fueltype:string,
  seat:string,
  transmission:string,
  description:string,
  image:string,
  id:number,
  quantity:undefined|number,
  productId:undefined|number
}

export interface cart{
  name:string,
  price:number,
  colour:string,
  brand:string,
  fueltype:string,
  seat:string,
  transmission:string,
  description:string,
  image:string,
  id:number |undefined,
  quantity:undefined|number,
  userId:number,
  productId:number
}

export interface pricesummary{
  price:number,
  discount:number,
  tax:number,
  delivery:number,
  total:number,
}
export interface order{
  email:string,
  address:string,
  contact:string,
  cardOwnerName:string;
  cardNumber:string;
  expirationDate:string;
  securityCode:string;
  totalPrice:number,
  userId:number,
  id:number|undefined,


}
export class PaymentDetail{
  PaymentDetailId:number=0;
  cardOwnerName:string='';
  cardNumber:string='';
  expirationDate:string='';
  securityCode:string='';

}

export interface FeedBack
{
  feedbackId:string,
  Name:string,
  Email:string,
  MobileNo:string,
  Message:string,
}


export interface buynow{
  name:string,
  price:number,
  colour:string,
  brand:string,
  fueltype:string,
  seat:string,
  transmission:string,
  description:string,
  image:string,
  id:number |undefined,
  quantity:undefined|number,
  userId:number,
  productId:number
}
