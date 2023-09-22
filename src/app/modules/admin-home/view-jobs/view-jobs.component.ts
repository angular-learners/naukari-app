import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobsService } from 'src/app/services/jobs.service';

@Component({
  selector: 'app-view-jobs',
  templateUrl: './view-jobs.component.html',
  styleUrls: ['./view-jobs.component.css']
})
export class ViewJobsComponent implements OnInit {
  jobsList: any[] = [];
  filterJobs: any[] = [];
  //  expList:any[]=[1,2,3,4];
  expList = [
    { id: 1, exp: "1", checked: false },
    { id: 2, exp: "2", checked: false },
    { id: 3, exp: "3", checked: false },
    { id: 3, exp: "4", checked: false }

  ];

  constructor(private jobService: JobsService, private router: Router) {

  }


  ngOnInit(): void {
    this.getAllJobs();
  }

  getAllJobs() {
    this.jobService.getAllJobs().subscribe(
      {
        next: (res: any) => {
          console.log(res);
          this.jobsList = [...res];
          this.filterJobs = [...this.jobsList];
        },
        error: (err: any) => {
          console.log(err);
        }
      }
    )
  }

  editJob(id: number) {
    this.router.navigate(['admin-home/add-edit-jobs', id]);
  }


  expChange(exp: any, expChecked: any) {
    if (expChecked) {
      this.filterJobs = this.jobsList.filter((element: any) => {
        return element.experience == exp.toString();
      });
    } else {
       this.filterJobs=this.jobsList;
    }
    console.log(this.expList);
  }

  searchJobs(event: any) {
    const searchText=event.target.value;
    if (!searchText) {
      this.filterJobs = this.jobsList;
    } else {
      this.filterJobs = this.jobsList.filter((element) => {
        return element.jobTitle.toLowerCase().includes(searchText.toLowerCase());
      });
    }
  }
  
}

