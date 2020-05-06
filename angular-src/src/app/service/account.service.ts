import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Transaction } from "src/app/model/transaction";
import { UserService } from "./user.service";

@Injectable({
  providedIn: "root",
})
export class AccountService {
  private id;
  private userId;

  // private baseUrl = "https://bankappweb.herokuapp.com";
  private baseUrl = "";

  constructor(private http: HttpClient, private userService: UserService) {
    this.userId = localStorage.getItem("id");
  }

  getTransactionsByAccount(accountId) {
    return this.http.get<Transaction[]>(
      `${this.baseUrl}/api/transactions/${accountId}`
    );
  }

  getAccountsByUser(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/accounts?userId=${this.userId}`);
  }

  getAccountsByUserWithId(id): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/accounts?userId=${id}`);
  }

  getAccount(accountId): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/accounts/${accountId}`);
  }

  createAccount(value: any): Observable<any> {
    var userId = this.userService.getUserId();
    value.userId = userId;
    return this.http.post(`${this.baseUrl}/api/accounts`, value);
  }

  updateAccount(accountId: string, value: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/api/accounts/${accountId}`, value);
  }

  deleteAccount(accountId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/accounts/${accountId}`);
  }

  setAccountId(accountId) {
    this.id = accountId;
  }

  getAccountId() {
    return this.id;
  }

  // Transactions

  transfer(fromId, toId, amount): Observable<any> {
    const model = {
      initiatorId: fromId,
      receiverId: toId,
      amount: amount,
    };
    return this.http.post(`${this.baseUrl}/api/transactions/transfer`, model);
  }

  getBillPayCompanies(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/bill-pay`);
  }

  getBillCompany(id): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/bill-pay/${id}`);
  }

  billPay(fromId, toId, amount): Observable<any> {
    const model = {
      initiatorId: fromId,
      receiverId: toId,
      amount: amount,
    };
    return this.http.post(
      `${this.baseUrl}/api/transactions/bill-pay`,
      model
    );
  }
}
