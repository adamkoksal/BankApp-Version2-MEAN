import { Component, OnInit } from "@angular/core";
import { AccountService } from "src/app/service/account.service";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { take } from "rxjs/operators";

@Component({
  selector: "app-create-account",
  templateUrl: "./create-account.component.html",
  styleUrls: ["./create-account.component.css"],
})
export class CreateAccountComponent implements OnInit {
  account = { name: "" };
  id: any;
  subscription: Subscription;

  constructor(private accountService: AccountService) {}

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  ngOnInit() {}

  save(value) {
    this.subscription = this.accountService.createAccount(value).subscribe(
      (data) => console.log(data),
      (error) => console.log(error)
    );
    location.reload();
  }
}
