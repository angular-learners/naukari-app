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
  profileForm!: FormGroup;
  userId!: number;
  hideInputs: boolean = false;
  constructor(private userService: UserService) {

  }
  ngOnInit(): void {
    this.onInitProfileForm();
    this.getlocalStorageData();
    this.getUser();
  
  }

  onInitProfileForm() {
    this.profileForm = new FormGroup({
      'username':new FormControl(''),
      'email': new FormControl(''),
      'password':new FormControl(''),
      'mobileNumber': new FormControl('')
    })
  }

  getUser() {
    this.userService.getUserById(this.userId).subscribe(
      {
        next: (res: any) => {
          this.userDetails=res;
           console.log(res);
        },
        error: (err: any) => {
          console.log(err);
        }
      }
    )
  }

  getlocalStorageData() {
    const user= JSON.parse(localStorage.getItem('user') as any);
    this.userId = user[0].id;
  }
  enableInputs(){
      this.hideInputs=true;
      this.profileForm.patchValue({
        'username':this.userDetails?.username,
        'email': this.userDetails?.email,
        'password':this.userDetails?.password,
        'mobileNumber': this.userDetails?.mobileNumber
      })
  }

  updateProfile() {
    this.hideInputs = false;
      this.userService.updateUserById(this.userId, this.profileForm.value).subscribe(
        {
          next: (res: any) => {
            console.log(res);
            this.getUser();
          },
          error: (err: any) => {
            console.log(err);
          }
        }
      )
  }
}
