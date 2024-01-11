import { Component, OnInit } from '@angular/core';
import { product } from '../data-type';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from '../services/product.service';
import { environment } from '../environment';

@Component({
  selector: 'app-viewproducts',
  templateUrl: './viewproducts.component.html',
  styleUrls: ['./viewproducts.component.css']
})
export class ViewproductsComponent implements OnInit {
  productList:undefined |product[]
  productMessage:undefined|string;
  deleteIcon=faTrash;editicon=faEdit;
  constructor(private product:ProductService) { }

  ngOnInit() : void{
    this.list();
  }
  deleteProduct(id:number){
    console.warn("test id",id)

    this.product.deleteProduct(id).subscribe((result)=>{
      if(result){
         this.productMessage=environment.deleteproductmessage;
         this.list();
      }
    })
    setTimeout(() => this.productMessage=undefined,3000);
  }

 list(){
  this.product.productList().subscribe((result)=>{
    console.warn(result)
   if(result){ this.productList=result;}
  })
 }
}
