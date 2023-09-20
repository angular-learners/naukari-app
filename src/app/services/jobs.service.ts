import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  BASE_URL:string="http://localhost:3000/jobs";
  constructor(private http:HttpClient) { }

  createJob(jobPayload:any):Observable<any>{
     return this.http.post(this.BASE_URL, jobPayload);
  }

  updateJob(jobPayload:any,id:number):Observable<any>{
    return this.http.put(`${this.BASE_URL}/${id}`, jobPayload);
  }
}
