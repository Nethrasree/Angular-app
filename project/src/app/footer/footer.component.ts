import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { FeedbackService } from '../services/feedback.service';
import { FeedBack } from '../data-type';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  styles:[`.w3-input.ng-invalid{border-bottom:2px solid red;}
  .w3-input.ng-valid{border-bottom:4px solid green;}`]
})
export class FooterComponent implements OnInit {
  feedBackFormGroup : FormGroup;
  feedBackArray : FeedBack[]=[];
  constructor(private product:ProductService,private feedbackservice:FeedbackService,private formbuilder:FormBuilder){
    this.feedBackFormGroup = this.formbuilder.group({
      feedBackId:[''],
      name:['',[Validators.required,Validators.pattern('[A-Z][A-Za-z]{3,}$')]],
      email:['',[Validators.required, Validators.email, Validators.pattern('[a-z][a-z0-9._%+-]+@[a-z.-][a-z0-9]+([\.])[a-z]{2,4}$')]],
      mobileNo:['',[Validators.required]],
      message:['',[Validators.required]]
    })
  }
  ngOnInit(): void {
    this.getFeedBacks();
  }
  getFeedBacks(){
     this.feedbackservice.getFeedBack().subscribe(response=>
      {
        console.log(response);
        this.feedBackArray = response;
      })
}


  onSubmit(){
    console.log(this.feedBackFormGroup.value);
    this.feedbackservice.addFeedBack(this.feedBackFormGroup.value)
    .subscribe(response=>{
      console.log(response);
      this.getFeedBacks();
      this.feedBackFormGroup.setValue(
        {
          feedBackId:'',
          name:'',
          email:'',
          mobileNo:'',
          message:'',
        } );
        this.feedBackFormGroup.reset();
     })
  }
   }




