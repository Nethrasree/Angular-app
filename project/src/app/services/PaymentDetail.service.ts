import { Injectable } from '@angular/core';
import { PaymentDetail } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentDetailService {

constructor(private http:HttpClient) { }
readonly baseUrl = environment.API_URL+'PaymentDetail';
formData:PaymentDetail = new PaymentDetail()
list: PaymentDetail[] | undefined;
postPaymentDetail()
{
 return this.http.post(this.baseUrl,this.formData);

}
putPaymentDetail() {
  return this.http.put(`${this.baseUrl}/${this.formData.PaymentDetailId}`, this.formData);
}

deletePaymentDetail(id: number) {
  return this.http.delete(`${this.baseUrl}/${id}`);
}

refreshList() {
  this.http.get(this.baseUrl)
    .toPromise()
    .then(res =>this.list = res as PaymentDetail[]);
}

}
