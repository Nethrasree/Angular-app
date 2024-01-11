import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { FeedBack, product } from '../data-type';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FeedbackService } from '../services/feedback.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { environment } from '../environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  styles:[`.w3-input.ng-invalid{border-bottom:2px solid red;}
  .w3-input.ng-valid{border-bottom:4px solid green;}`]

})
export class HomeComponent implements OnInit{
  title: string|undefined;
  isOfferValid: boolean | undefined;
  // days: number | undefined;
  days : any|undefined;
  hours: number | undefined;
  mins: number | undefined;
  secs: number | undefined;


  applyOffer:false|boolean|undefined;

  popularProducts : undefined | product[]
  trendyProducts:undefined|product[]
  feedBackFormGroup : FormGroup;
  feedBackArray : FeedBack[]=[];
  ratingControl= new FormControl(0);
  ratingCount=environment.numberZero;
  showdetails:false | boolean | undefined;
  totalrating=environment.numberZero;

  userName:string="";
  loggedInUser: string |null=null;

  finalRating:any;
  email:'' | undefined;
  name:''|undefined;
  constructor(private product:ProductService,private feedbackservice:FeedbackService,private formbuilder:FormBuilder,private router:Router,private user:UserService){
    this.feedBackFormGroup = this.formbuilder.group({
      feedBackId:[''],
      name:[''],
      email:['',[Validators.required, Validators.email, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')]],
      mobileNo:[''],
      message:['']
    })
  }
  buttonClicked = false;

  ngOnInit(): void {
    this.offerTime();

    this.router.events.subscribe((value:any)=>{
      if(localStorage.getItem(environment.user)){
       let userStore = localStorage.getItem(environment.user);
    let userData  = userStore && JSON.parse(userStore);
    this.userName = userData.name;
      }
    })
    this.loggedInUser = localStorage.getItem(environment.user);

    this.product.buttonClicked$.subscribe(() => {
      this.buttonClicked = true;
      // Perform necessary actions in response to the button click
    });

    this.product.popularProducts().subscribe((data)=>{console.warn(data);
    this.popularProducts=data;
  });
  this.product.trendyproducts().subscribe((data)=>{
    this.trendyProducts=data;
  });

  this.getFeedBacks();
      }

      handleClick(): void {
        this.product.buttonClicked();
        this.applyOffer=true;
      }



applyOffers(){

if(true)
   this.applyOffer=true;
else{
  this.applyOffer=false;
}



}
offerTime(){

  this.isOfferValid = true;

  const time = setInterval(() => {
    var futureDate = new Date('August 8, 2023 23:50:07').getTime();
    this.applyOffer=true;
    var today = new Date().getTime();
    var balanceTime = futureDate - today;

    this.days = Math.floor(balanceTime / (1000 * 60 * 60 * 24));
    this.hours = Math.floor((balanceTime / (1000 * 60 * 60)) % 24);
    this.mins = Math.floor((balanceTime / (1000 * 60)) % 60);
    this.secs = Math.floor((balanceTime / 1000) % 60);

    if (balanceTime < environment.numberZero) {
      clearInterval(time);
      this.applyOffer=false;
      this.days = "offer is expired";
      this.hours = environment.numberZero;
      this.mins = environment.numberZero;
      this.secs = environment.numberZero;
    }
  }, 1000);

}






viewDetails()
{

  if(!localStorage.getItem(environment.user))
  {
    this.showdetails=false;
    alert("Please login before proceeding")

    this.router.navigate(['/login'])
  }
  else{
    this.showdetails=true;
    }

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
  getRating()
  {
    this.ratingCount++;
    this.totalrating += this.ratingControl?.value || 0;
     console.log(this.ratingControl.value);
     this.finalRating = (this.totalrating/this.ratingCount).toFixed(2)
  }
}
