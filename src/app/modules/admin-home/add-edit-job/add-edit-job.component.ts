import { SharedService } from './../../../services/shared.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { NaukariConstants } from 'src/app/constants/naukari.constants';
import { JobsService } from 'src/app/services/jobs.service';

@Component({
  selector: 'app-add-edit-job',
  templateUrl: './add-edit-job.component.html',
  styleUrls: ['./add-edit-job.component.css']
})
export class AddEditJobComponent implements OnInit {
  addEditJobForm!: FormGroup;

  constructor(private fb: FormBuilder, private jobService: JobsService, public sharedService: SharedService) {

  }
  ngOnInit(): void {
    this.onInitAddEditJobsForm();
    this.sharedService.message;
  }

  form() {
    this.addEditJobForm = new FormGroup({
      jobTitle: new FormControl('')
    })
  }

  onInitAddEditJobsForm() {
    this.addEditJobForm = this.fb.group({
      jobTitle: [''],
      experience: [''],
      package: [''],
      companyName: [''],
      companyLogo: [''],
      description: [''],
      locations: this.fb.array([
        this.fb.group({
          locationName: ['']
        })
      ]),
      isActive: [true],
      createdDate: [''],
      updatedDate: [''],
      jobDescription: ['']
    })
  }


  get getLocations(): FormArray {
    return this.addEditJobForm.get('locations') as FormArray;
  }

  addNewLocation() {
    return this.fb.group({
      locationName: ['']
    })
  }

  addLocation() {
    this.getLocations.push(this.addNewLocation());
  }

  removeLocation(index: number) {
    this.getLocations.removeAt(index);
  }



  saveJob() {
    this.addEditJobForm.get('createdDate')?.setValue(new Date());
    this.jobService.createJob(this.addEditJobForm.value).subscribe(
      {
        next: (res: any) => {
          console.log(res);
          this.sharedService.message = NaukariConstants.JOB_CREATED;
          this.addEditJobForm.reset();
        },
        error: (err: any) => {
          console.log(err);
        }
      }
    )
    // console.log(this.addEditJobForm.value);
  }
}
