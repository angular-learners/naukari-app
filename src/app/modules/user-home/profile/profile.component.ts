import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userDetails!: any;
  counter:number=0;
  profileForm!: FormGroup;
  userId!: number;
  hideInputs: boolean = false;
  constructor(private userService: UserService) {

  }
  ngOnInit(): void {
    this.getlocalStorageData();
    this.onInitProfileForm();
  }

  onInitProfileForm() {
    this.profileForm = new FormGroup({
      'email': new FormControl(''),
      'mobileNumber': new FormControl('')
    })
  }

  getlocalStorageData() {
    this.userDetails = JSON.parse(localStorage.getItem('user') as any);
    this.userId = this.userDetails[0].id;
  }

  updateProfile() {
    this.counter=this.counter+1
    this.hideInputs = true;
    if(this.counter==1){
      this.profileForm.patchValue({
        'email': this.userDetails[0].email,
        'mobileNumber': this.userDetails[0].mobileNumber
      })
    }
    console.log(this.profileForm.value);
    if(this.counter>=2){
      this.userService.updateUserById(this.userId, this.profileForm.value).subscribe(
        {
          next: (res: any) => {
            console.log(res);
            
             this.userDetails=[{email:res.email,mobileNumber:res.mobileNumber}];
             this.hideInputs=false;
          },
          error: (err: any) => {
            console.log(err);
          }
        }
      )
    }
   
  }
}
