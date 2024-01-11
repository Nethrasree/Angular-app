import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { environment } from '../environment';
@Component({
  selector: 'app-personaldetail',
  templateUrl: './personaldetail.component.html',
  styleUrls: ['./personaldetail.component.css']
})
 export class PersonaldetailComponent implements OnInit {
  modalTitle="";
  // fname:string='';
  imageUrl: string='';
  constructor(private user:UserService, private http:HttpClient) {
  // this.fname = this.user.name;
  }
  personalDetails: any = [];
  personId = 0;
  name="";
  dateOfBirth="";
  email="";
  gender="";
  address="";
  mobileNo="";
  identityProof=environment.identityProof;
  PhotoPath=environment.PHOTO_URL;

  ngOnInit()
  {
    this.refreshList();
    // this.fname = this.user.name;
  }
  refreshList()
   {
     this.http.get<any>(environment.API_URL + 'PersonalDetail')
      .subscribe(data =>
      {

        this.personalDetails=data;
      });
   }
   addClick() {
    this.modalTitle = "Add details";
    this.personId = 0;
    this.name ="";
    this.dateOfBirth = "";
    this.email = "";
    this.gender = "";
    this.address = "";
    this.mobileNo = "";
    this.identityProof=environment.identityProof;
  }
  editClick(personaldetail:any) {
    this.modalTitle = "edit details";
    this.personId=personaldetail.personId;
    this.name=personaldetail.name;
    this.dateOfBirth = personaldetail.dateOfBirth;
    this.email = personaldetail.email;
    this.gender = personaldetail.gender;
    this.address = personaldetail.address;
    this.mobileNo = personaldetail.mobileNo;
    this.identityProof = personaldetail.identityProof;
  }

  createClick() {
    var value = {
      name:this.name,
      dateOfBirth:this.dateOfBirth,
      email:this.email,
      gender:this.gender,
      address:this.address,
      mobileNo:this.mobileNo,
      identityProof: this.identityProof
    };

    this.http.post(environment.API_URL+'PersonalDetail', value)
      .subscribe(response => {
        alert(response.toString());
        this.refreshList();
      });
  }
updateClick(){
     var value = {
      personId:this.personId,
      name:this.name,
      dateOfBirth:this.dateOfBirth,
      email:this.email,
      gender:this.gender,
      address:this.address,
      mobileNo:this.mobileNo,
      identityProof: this.identityProof
     };
     this.http.put(environment.API_URL+'PersonalDetail', value)
      .subscribe(response => {
        alert(response.toString());
        this.refreshList();
      });
  }

  deleteClick(personId:any) {
    if(confirm("are you sure to delete?")){
    this.http.delete(environment.API_URL + 'PersonalDetail/' + personId)
      .subscribe(response => {
        alert(response.toString());
        this.refreshList();
      });
    }
  }


  imageUpload(event:any){
     var file=event.target.files[0];
     const formData:FormData=new FormData();
     formData.append('file',file,file.name);
    //  const reader = new FileReader();
     this.http.post(environment.API_URL+'PersonDetail/SaveFile',formData)
     .subscribe((data:any)=>
     {
      this.identityProof=data.target.result;
      this.identityProof=data.toString();
     });

  }
}
