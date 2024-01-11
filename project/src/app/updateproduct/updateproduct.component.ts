import { Component, OnInit } from '@angular/core';
import { product } from '../data-type';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { environment } from '../environment';

@Component({
  selector: 'app-updateproduct',
  templateUrl: './updateproduct.component.html',
  styleUrls: ['./updateproduct.component.css']
})
export class UpdateproductComponent implements OnInit {


  productData:undefined|product;
  productMessage:undefined|string;

  constructor(private route:ActivatedRoute,private product:ProductService) { }


  ngOnInit() {
    let productId= this.route.snapshot.paramMap.get('id')
    console.warn(productId);
    productId && this.product.getProduct(productId).subscribe((data)=>{
      console.warn(data);
      this.productData=data;
    });
  }
  submit(data:product){
    console.warn(data);
    if(this.productData){data.id = this.productData.id;}
    this.product.updateProduct(data).subscribe((result)=>{
      if(result){
        this.productMessage=environment.updateproductmessage;
      }
    });
    setTimeout(() => {this.productMessage=undefined;},3000);
  }
}
