import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { AccountService } from "./account.service";

@Injectable({
  providedIn: "root",
})
export class BillpayResolverService implements Resolve<any> {
  constructor(private accountService: AccountService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>| Promise<any> | any {
    return this.accountService.getBillPayCompanies();
  }
}
