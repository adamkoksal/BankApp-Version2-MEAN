import { Component, OnInit, OnDestroy } from '@angular/core';
import { AccountService } from 'src/app/service/account.service';
import { UserService } from 'src/app/service/user.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit, OnDestroy {
  accounts: any;
  a= {
    accountTo: "",
    accountFrom: "",
    amount: ""
  };
  subscription: Subscription;

  constructor(private accountService: AccountService, private userService: UserService, private router: Router) {

    this.subscription = this.accountService.getAccountsByUser()
      .subscribe(a => this.accounts = a);

  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
  }

  submit(value) {
    this.accountService.transfer(value.accountFrom._id , value.accountTo, value.amount)
      .subscribe(data => {
        console.log(data);
        console.log("successfull")
      }
      , error => {
        console.log(error);
        console.log("fail");
      });

    this.router.navigate(['/home'])
    .then(() => {
      location.reload();
    });
  }

}
