import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { CreateAccountComponent } from "./account-details/create-account/create-account.component";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import * as $ from "jquery";
import { AccountService } from "../service/account.service";
import { UserService } from '../service/user.service';

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  account$: any;
  user: any;
  sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService,
    private userService: UserService,
    public dialog: MatDialog
  ) {
    $(function () {
      $(window).scroll(function () {
        var mass = Math.max(20, 50 - 0.25 * $(this).scrollTop()) + "px";

        $("#expandable").css({ "font-size": mass, "line-height": mass });
      });
    });

    this.account$ = this.route.snapshot.data["accounts"];
    // this.accountService.getAccountsByUser().subscribe((accounts) => {
    //   this.account$ = accounts;
    // });
    this.user = this.route.snapshot.data["user"];
    // this.userService.getUser().subscribe(user => {
    //   this.user = user;
    // })
  }

  ngOnInit() {}

  openDialog() {
    this.dialog.open(CreateAccountComponent);
  }
}
