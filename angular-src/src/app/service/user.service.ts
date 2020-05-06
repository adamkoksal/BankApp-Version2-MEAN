import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private id: String;

  // private baseUrl = "https://bankappweb.herokuapp.com";
  private baseUrl = "";

  constructor(private http: HttpClient) {
    this.id = localStorage.getItem("id");
  }

  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/users`);
  }

  getUser(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/users/${this.id}`);
  }

  getUserWithId(id): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/users/${id}`);
  }

  getUserByUsername(username: string) {
    return this.http.get<any[]>(
      `${this.baseUrl}/api/users?username=${username}`
    );
  }

  changeUsername(value): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/api/users/username/${this.id}`,
      value
    );
  }

  changePassword(value): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/api/users/password/${this.id}`,
      value
    );
  }

  changePasswordWithId(value, id): Observable<any> {
    return this.http.put(`${this.baseUrl}/api/users/password/${id}`, value);
  }

  changeAddress(value): Observable<any> {
    return this.http.put(`${this.baseUrl}/api/users/address/${this.id}`, value);
  }

  changeSQ(value): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/api/users/security-question/${this.id}`,
      value
    );
  }

  getUserId() {
    return this.id;
  }

  login(user): Observable<Object> {
    return this.http.post(`${this.baseUrl}/api/auth`, user);
  }

  checkPassword(password): Observable<any> {
    const value = {
      id: this.id,
      password: password,
    };
    return this.http.post(`${this.baseUrl}/api/auth/check-password`, value);
  }

  checkSQA(value): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/auth/check-sqa`, value);
  }

  loggedIn() {
    return !!localStorage.getItem("token");
  }

  signup(user): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/users`, user);
  }
}
