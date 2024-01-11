import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../services/feedback.service';
import { FeedBack } from '../data-type';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-listfeedback',
  templateUrl: './listfeedback.component.html',
  styleUrls: ['./listfeedback.component.css']
})
export class ListfeedbackComponent implements OnInit {
 feedBackArray : FeedBack[]=[];
 feedBackFormGroup : FormGroup;

  constructor(private feedbackservice:FeedbackService,private formbuilder:FormBuilder) {
    this.feedBackFormGroup = this.formbuilder.group({
      feedbackId:[''],
      Name:[''],
      Email:[''],
      MobileNo:[''],
      Message:['']
    })

   }



   ngOnInit():void {
    this.getFeedBacks();
     }
     getFeedBacks(){
       this.feedbackservice.getFeedBack().subscribe(response=>
         {
           console.log(response);
            this.feedBackArray = response;
         })
     }

    fillfeedback(feedback:FeedBack)
     {
       this.feedBackFormGroup.setValue(
      {
       feedbackId: feedback.feedbackId,
             name:feedback.Name,
             email:feedback.Email,
             mobileNo:feedback.MobileNo,
             message:feedback.Message
     })

   }
   deleteFeedBacks(feedbackID :string){
     this.feedbackservice.deleteFeedBack(feedbackID).subscribe
     (response=>{
       console.log(response);
       this.getFeedBacks();
     })

   }

   onSubmit(){
     console.log(this.feedBackFormGroup.value);
     if(this.feedBackFormGroup.value.feedBackId !=null &&  this.feedBackFormGroup.value.feedBackId !="")
     {
       this.feedbackservice.updateFeedBack(this.feedBackFormGroup.value)
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
           // this.feedBackFormGroup.reset();
        })
     }
     else{
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
   }
