import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  BASE_URL: string = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  createAccount(user: User): Observable<any> {
    return this.http.post(this.BASE_URL, user); /** INSERT INTO USERS (user) */
  }

  getAllUsers(): Observable<any> {
    return this.http.get(this.BASE_URL); /*  SELECT * FROM USERS    */
  }
  getUserById(id: number): Observable<any> {
    /* SELECT * FROM USERS WHERE USER ID=? */
    return this.http.get(`${this.BASE_URL}/${id}`);
  }

  /**UPDATE  students SET first_name='raja' ,last_name="sai",email='rajsai@gmail.com',password='ABC123'  WHERE id=2; */
  updateUserById(id: number, user: User): Observable<any> {
    return this.http.put(`${this.BASE_URL}/${id}`, user);
  }

  /** DELETE FROM students WHERE student_id=2;  */
  deleteUserById(id: number): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/${id}`);
  }
}
