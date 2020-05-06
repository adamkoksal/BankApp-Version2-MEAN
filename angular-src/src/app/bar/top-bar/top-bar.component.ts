import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/service/user.service";
import { Router } from "@angular/router";

@Component({
  selector: "top-bar",
  templateUrl: "./top-bar.component.html",
  styleUrls: ["./top-bar.component.css"],
})
export class TopBarComponent implements OnInit {
  loggedIn: boolean;

  constructor(private userService: UserService, private router: Router) {
    this.loggedIn = this.userService.loggedIn();
  }

  ngOnInit() {}

  logout() {
    this.loggedIn = false;
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    this.router.navigate(["/login"])
      .then(()=> window.location.reload());
  }
}
