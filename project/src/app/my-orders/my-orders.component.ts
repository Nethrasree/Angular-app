import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { order } from '../data-type';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
totalPrice:string|null=null;
  constructor(private product:ProductService) { }
orderData:order[]|undefined;
  ngOnInit() {
    this.getOrderList();
  }
  cancelOrder(orderId:number|undefined){
   orderId && this.product.cancelOrder(orderId).subscribe((result)=>{
    alert ("Are you sure ? to cancel the order")
    this.getOrderList();
   })
  }

  getOrderList(){
    this.product.orderList().subscribe((result)=>
    {

           this.orderData=result;
    })
  }
}
