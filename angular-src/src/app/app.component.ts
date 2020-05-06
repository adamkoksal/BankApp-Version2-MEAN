import { Component, OnDestroy } from "@angular/core";
import { UserService } from "./service/user.service";
import { AccountService } from "./service/account.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "BankApp";

  constructor(
    private userService: UserService,
    private accountService: AccountService
  ) {
  }
}
