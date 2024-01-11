import { Component, OnInit } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { ProductService } from '../services/product.service';
import { PaymentDetail, cart, order } from '../data-type';
import { Router } from '@angular/router';
import { PaymentDetailService } from '../services/PaymentDetail.service';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';
import { environment } from '../environment';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  totalPrice:number|undefined
  carData:cart[]|undefined;
  orderMsg:string|undefined;
  showPayment!:false ;
  amount:string|null=null;
  constructor( private product:ProductService,private router:Router,public service:PaymentDetailService,private user:UserService) {

  }

  ngOnInit() {

    this.product.currentCart().subscribe((result) => {
       let price=environment.numberZero;
       this.carData=result;
      result.forEach((item)=>{
        if(item.quantity){
        price+=(+item.price * +item.quantity)
    }
  })
  this.totalPrice=((price+environment.numberPercent)+(price/environment.numberten)-(price/environment.numberten));
  console.warn(this.totalPrice);
  // this.totalPrice = this.totalPrice;
 this.amount = localStorage.getItem('total amount');

  });
  }
   orderNow(data:{email:string,address:string,contact:string})
   {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;

    if(this.totalPrice){
      let orderData:order={
        ...data,
        totalPrice: this.totalPrice,
        userId,
        id: undefined,
        cardOwnerName: '',
        cardNumber: '',
        expirationDate: '',
        securityCode: ''
      }

      this.carData?.forEach((item)=>
      {
        setTimeout(() => {
        item.id &&  this.product.deleteCartitems(item.id)

        }, 600);
              })
      this.product.orderNow(orderData).subscribe((result)=>
      {
        if(result){
          this.orderMsg="Your order has been placed"
          setTimeout(() => {
            this.router.navigate(['/my-orders'])
            this.orderMsg=undefined
          }, 4000);
        }
      })
    }

   }
   onSubmit(form: NgForm) {
    if (this.service.formData.PaymentDetailId == 0)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }

  insertRecord(form: NgForm) {
    this.service.postPaymentDetail().subscribe(
      response => {
        this.resetForm(form);
        this.service.refreshList();
        if(response){
          this.orderMsg="Your order has been placed"
          setTimeout(() => {

            this.router.navigate(['/my-orders'])
            this.orderMsg=undefined
          }, 4000);
        }

        alert('Submitted successfully')
      },
      error => { console.log(error); }
    );
  }

  updateRecord(form: NgForm) {
    this.service.putPaymentDetail().subscribe(
      response => {
        this.resetForm(form);
        this.service.refreshList();
        // this.toastr.info('Updated successfully', 'Payment Detail Register')
      },
      error => { console.log(error); }
    );
  }


  resetForm(formvalue: NgForm) {
    formvalue.form.reset();
    this.service.formData = new PaymentDetail();
  }

 opencardpayment(){
  this.showPayment=false;

 }
  }
