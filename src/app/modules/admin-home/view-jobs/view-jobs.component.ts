import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobsService } from 'src/app/services/jobs.service';

@Component({
  selector: 'app-view-jobs',
  templateUrl: './view-jobs.component.html',
  styleUrls: ['./view-jobs.component.css']
})
export class ViewJobsComponent implements OnInit {
 jobsList:any[]=[];

  constructor(private jobService: JobsService,private router:Router) {

  }


  ngOnInit(): void {
     this.getAllJobs();
  }

  getAllJobs() {
    this.jobService.getAllJobs().subscribe(
      {
        next: (res: any) => {
          console.log(res);
          this.jobsList=[...res];
        },
        error: (err: any) => {
          console.log(err);
        }
      }
    )
  }

  editJob(id:number){
      this.router.navigate(['admin-home/add-edit-jobs',id]);
  }
}
