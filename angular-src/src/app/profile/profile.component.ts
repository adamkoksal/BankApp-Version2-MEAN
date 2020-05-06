import { Component, OnInit } from "@angular/core";
import { UserService } from "../service/user.service";
import { take } from "rxjs/operators";

@Component({
  selector: "profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  // a = {oldpassword: "", newpassword: "", confpassword: "",};
  panelOpenState = false;
  hide = true;
  hide2 = true;
  hide3 = true;
  user;
  currentPassword;

  constructor(private userService: UserService) {
    this.user = userService
      .getUser()
      .pipe(take(1))
      .subscribe((u) => (this.user = u));
  }

  ngOnInit() {}

  save1(value) {
    var u = { username: value };

    this.userService
      .changeUsername(u)
      .pipe(take(1))
      .subscribe(
        (data) => console.log(data),
        (error) => console.log(error)
      );

    alert("Username successfully changed.");
  }

  save2(value) {
    var p = { password: value };

    this.userService
      .changePassword(p)
      .pipe(take(1))
      .subscribe(
        (data) => console.log(data),
        (error) => console.log(error)
      );
    location.reload();
  }

  save3(value) {
    var a = { address: value };

    this.userService
      .changeAddress(a)
      .pipe(take(1))
      .subscribe(
        (data) => console.log(data),
        (error) => console.log(error)
      );
    alert("Address successfully changed.");
  }

  save4(qValue, aValue) {
    var sQ = {
      securityQuestion: qValue,
      securityQuestionAnswer: aValue,
    };

    this.userService
      .changeSQ(sQ)
      .pipe(take(1))
      .subscribe(
        (data) => console.log(data),
        (error) => console.log(error)
      );
    location.reload();
  }
}
