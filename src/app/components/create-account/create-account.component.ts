import { SharedService } from './../../services/shared.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NaukariConstants } from 'src/app/constants/naukari.constants';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css'],
})
export class CreateAccountComponent implements OnInit {
  createAccount!: FormGroup;
  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    public sharedService: SharedService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.onInitCreateForm();
    this.clearMessage();
  }
  onInitCreateForm() {
    this.createAccount = this.fb.group({
      username: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]*$'), Validators.maxLength(10)]),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      mobileNumber: new FormControl('', Validators.required),
    });
  }

  clearMessage() {
    this.sharedService.message = '';
  }

  saveAccount() {
    this.userService.createAccount(this.createAccount.value).subscribe({
      next: (res: any) => {
        console.log(res);
        this.sharedService.message = NaukariConstants.CREATED_SUCCESS;
        setTimeout(() => {
          this.router.navigate(['login']);
        }, 2000);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  invalidFeild(fieldName: string) {
    return this.createAccount.get(fieldName)?.invalid && this.createAccount.get(fieldName)?.touched;
  }

  feildError(fieldName: string, errorType: string) {
    return this.createAccount.get(fieldName)?.errors?.[errorType];
  }

  get getValidations() {
    return NaukariConstants;
  }

}
