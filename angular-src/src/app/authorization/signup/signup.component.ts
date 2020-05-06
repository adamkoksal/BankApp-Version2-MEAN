import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/service/user.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {}

  submit(value) {
    const model = {
      username: value.username,
      password: value.password,
      address: value.address,
      securityQuestion: value.securityQuestion,
      securityQuestionAnswer: value.securityQuestionAnswer,
    };

    this.userService.signup(model).subscribe(
      (res: any) => {
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
    this.router.navigate(["/login"]);
  }
}
