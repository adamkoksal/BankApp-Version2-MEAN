import { Component, OnInit, Input } from "@angular/core";
import { UserService } from "src/app/service/user.service";
import { take, map } from "rxjs/operators";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.css"],
})
export class ForgotPasswordComponent implements OnInit {
  a = {securityQuestion: "" };
  sQ: string;
  sQA: string;
  id: number;
  error: boolean;
  hide2 = true;
  hide3 = true;
  page = 1;
  success: boolean;

  constructor(private userService: UserService) {}

  ngOnInit() {}

  next1(username) {
    this.page = 2;
    this.userService
      .getUserByUsername(username)
      .pipe(
        take(1),
        map((users) => users[0])
      )
      .subscribe((user: any) => {
        this.sQ = user.securityQuestion;
        this.sQA = user.securityQuestionAnswer;
        this.id = user._id;
      });
  }

  next2(sQA) {
    const value = {
      id: this.id, 
      securityQuestionAnswer: sQA,
    };
    this.userService.checkSQA(value).subscribe((boolean) => {
      if (boolean) this.page = 3;
      else {
        this.error = true;
        this.a.securityQuestion = "";
      }
    });
  }

  submit(value) {
    var p = { password: value };

    this.userService
      .changePasswordWithId(p, this.id)
      .pipe(take(1))
      .subscribe(
        (res) => {
          console.log(res);
        },
        (error) => console.log(error)
      );
    this.success = true;
    this.page = 4;
  }
}
