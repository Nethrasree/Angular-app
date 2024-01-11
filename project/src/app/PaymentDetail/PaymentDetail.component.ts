import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { PaymentDetailService } from '../services/PaymentDetail.service';
import { NgForm } from '@angular/forms';
import { PaymentDetail } from '../data-type';
import { environment } from '../environment';

@Component({
  selector: 'app-PaymentDetail',
  templateUrl: './PaymentDetail.component.html',
  styleUrls: ['./PaymentDetail.component.css']
})
export class PaymentDetailComponent implements OnInit {
  toastr: any;
  orderMsg:string|undefined;

  constructor(private product:ProductService,private router:Router,public service:PaymentDetailService) { }

  ngOnInit() {
  }
  onSubmit(form: NgForm) {
    if (this.service.formData.PaymentDetailId == environment.numberZero)
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
        this.toastr.info('Updated successfully', 'Payment Detail Register')
      },
      error => { console.log(error); }
    );
  }


  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formData = new PaymentDetail();
  }

}
