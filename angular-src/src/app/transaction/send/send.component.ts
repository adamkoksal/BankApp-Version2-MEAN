import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { AccountService } from "src/app/service/account.service";
import { UserService } from "src/app/service/user.service";
import { Router } from "@angular/router";

@Component({
  selector: "send",
  templateUrl: "./send.component.html",
  styleUrls: ["./send.component.css"],
})
export class SendComponent implements OnInit, OnDestroy {
  accounts: any;
  subscription: Subscription;

  constructor(
    private accountService: AccountService,
    private userService: UserService,
    private router: Router
  ) {
    this.subscription = this.accountService
      .getAccountsByUser()
      .subscribe((a) => (this.accounts = a));
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {}

  submit(value) {
    console.log(value);
    this.accountService
      .transfer(value.accountFrom._id, value.accountId, value.amount)
      .subscribe(
        (data) => {
          console.log(data);
          console.log("successfull");
        },
        (error) => {
          console.log(error);
          console.log("fail");
        }
      );

    this.router.navigate(["/home"]).then(() => {
      location.reload();
    });
  }
}
