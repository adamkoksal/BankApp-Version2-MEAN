import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/service/user.service";
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  a = { username: "", password: "" };
  error: boolean;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {}

  login(user) {
    this.userService.login(user).subscribe(
      (res: any) => {
        console.log(res);
        localStorage.setItem("token", res.token);
        localStorage.setItem("id", res.id);
        this.router.navigate(["/"]).then(() => window.location.reload());
      },
      (error) => {
        console.log(error);
        this.error = true;
        this.a.password = "";
      }
    );
  }
}
