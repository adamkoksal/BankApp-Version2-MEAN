import { Component, OnInit, OnDestroy } from "@angular/core";
import { AccountService } from "src/app/service/account.service";
import { take } from "rxjs/operators";
import { Subscription} from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-edit-account-name",
  templateUrl: "./edit-account-name.component.html",
  styleUrls: ["./edit-account-name.component.css"]
})
export class EditAccountNameComponent implements OnInit, OnDestroy {
  account: any;
  id: any;
  subscription: Subscription;

  constructor(
    private accountService: AccountService,
    private router: Router
  ) {

    this.id = this.accountService.getAccountId();

    this.account = this.accountService
      .getAccount(this.id)
      .pipe(take(1))
      .subscribe(a => (this.account = a));
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    } console.log(this.id);
  }

  ngOnInit() {}

  save(value) {
    this.subscription = this.accountService
      .updateAccount(this.id, value)
      .subscribe(
        data => console.log(data),
        error => console.log(error)
      );

    this.router.navigate(["/home"]).then(() => {
      location.reload();
    });
  }
}
