import { SharedService } from './../../../services/shared.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NaukariConstants } from 'src/app/constants/naukari.constants';
import { JobsService } from 'src/app/services/jobs.service';

@Component({
  selector: 'app-add-edit-job',
  templateUrl: './add-edit-job.component.html',
  styleUrls: ['./add-edit-job.component.css'],
})
export class AddEditJobComponent implements OnInit {
  addEditJobForm!: any;
  jobId!: number;

  constructor(
    private fb: FormBuilder,
    private jobService: JobsService,
    public sharedService: SharedService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.jobId = Number(this.route.snapshot.paramMap.get('id'));
  }
  ngOnInit(): void {
    this.onInitAddEditJobsForm();
    // this.sharedService.message;
    this.getJob();
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
          locationName: [''],
        }),
      ]),
      isActive: [true],
      createdDate: [''],
      updatedDate: [''],
      jobDescription: [''],
      technologies: this.fb.array([
        this.fb.group({
          techName: ['']
        })
      ])
    });
  }

  get getTechnologies(): FormArray<any> {
    return this.addEditJobForm.get('technologies') as FormArray;
  }

  addNewTechnology(): FormGroup {
    return this.fb.group({
      techName: ['']
    })
  }

  addTechnology(){
    this.getTechnologies.push(this.addNewTechnology());
  }

  removeTechnology(index:number){
    this.getTechnologies.removeAt(index);
  }







  get getLocations(): FormArray {
    return this.addEditJobForm.get('locations') as FormArray;
  }

  addNewLocation() {
    return this.fb.group({
      locationName: [''],
    });
  }

  addLocation() {
    this.getLocations.push(this.addNewLocation());
  }

  removeLocation(index: number) {
    this.getLocations.removeAt(index);
  }

  saveJob() {
    if (this.jobId) {
      this.jobService.updateJob(this.addEditJobForm.value, this.jobId).subscribe({
        next: (res: any) => {
          console.log(res);
          this.sharedService.message = NaukariConstants.JOB_UPDATED;

          setTimeout(() => {
            this.router.navigate(['admin-home/view-jobs'])
          }, 3000)
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    } else {
      this.addEditJobForm.get('createdDate')?.setValue(new Date());
      this.jobService.createJob(this.addEditJobForm.value).subscribe({
        next: (res: any) => {
          console.log(res);
          this.sharedService.message = NaukariConstants.JOB_CREATED;
          this.addEditJobForm.reset();
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    }
  }

  patchValues(edit: any) {
    let { jobTitle, experience, companyName, companyLogo, description, isActive, jobDescription } = edit;
    this.addEditJobForm.patchValue({
      jobTitle: [jobTitle],
      experience: [experience],
      package: [edit.package],
      companyName: [companyName],
      companyLogo: [companyLogo],
      description: [description],
      locations: [this.patchLocations(edit)],
      isActive: [isActive],
      updatedDate: [new Date()],
      jobDescription: [jobDescription],
      technologies:[this.patchTechnlogies(edit)]
    })
  }

  patchTechnlogies(res:any){
    const techArray=this.addEditJobForm.get('technologies') as FormArray;

    while(techArray.length<res.technologies.length){
        techArray.push(this.addNewTechnology());
    }
      
    res.technologies.forEach((element:any,index:any) => {
       const techControl=techArray.at(index);
        if(techControl){
          techControl.get('techName')?.patchValue(element.techName);
        }
    });

  }


  patchLocations(res: any) {
    const locationsArray = this.addEditJobForm.get('locations') as FormArray;

    // Ensure that the FormArray has enough controls
    while (locationsArray.length < res.locations.length) {
      locationsArray.push(this.addNewLocation());
    }

    // Patch values from res.locations to the corresponding controls
    res.locations.forEach((element: any, index: number) => {
      const locationControl = locationsArray.at(index);
      if (locationControl) {
        locationControl.get('locationName')?.patchValue(element.locationName);
      }
    });
  }


  getJob() {
    this.jobService.getJobById(this.jobId).subscribe(
      {
        next: (res: any) => {
          this.patchValues(res);
          console.log(res);
        },
        error: (err: any) => {
          console.log(err);
        }
      }
    )
  }
}
