import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "./user.service";
import { AccountService } from "./account.service";

@Injectable({
  providedIn: "root"
})
export class HomeResolverService implements Resolve<Account[]> {
  constructor(
    private userService: UserService,
    private accountService: AccountService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Account[]> | Promise<Account[]> | Account[] {
    return this.accountService.getAccountsByUserWithId(localStorage.getItem("id"));
  }
}
 