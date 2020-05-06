import { Component, OnDestroy, ViewChild } from "@angular/core";
import { AccountService } from "src/app/service/account.service";
import { take, map } from "rxjs/operators";
import {
  MatTableDataSource,
  MatSort,
  MatPaginator,
  MatDialog,
} from "@angular/material";
import { Transaction } from "src/app/model/transaction";
import { Subscription } from "rxjs";
import { EditAccountNameComponent } from "./edit-account-name/edit-account-name.component";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "account-details",
  templateUrl: "./account-details.component.html",
  styleUrls: ["./account-details.component.css"],
})
export class AccountDetailsComponent implements OnDestroy {
  displayedColumns: string[] = ["date", "description", "amount"];
  id: string;
  transaction$;
  account: any;
  dataSource: MatTableDataSource<Transaction>;
  transactions: Transaction[] = [];
  subscription: Subscription;
  company$;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private accountService: AccountService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.id = this.route.snapshot.paramMap.get('id');

    this.company$ = this.route.snapshot.data["billpays"];

    this.account = this.accountService
      .getAccount(this.id)
      .pipe(take(1))
      .subscribe((a) => (this.account = a));

    this.subscription = this.accountService
      .getTransactionsByAccount(this.id)
      .subscribe((stream) => {
        this.dataSource.data = stream as any;
      });

    this.accountService.setAccountId(this.id);

    this.dataSource = new MatTableDataSource(this.transaction$);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openDialog() {
    this.dialog.open(EditAccountNameComponent);
  }

  deneme(value) {
    console.log(value);
  }

  deleteAccount() {
    this.accountService.deleteAccount(this.id).subscribe(
      (data) => console.log(data),
      (error) => console.log(error)
    );

    this.router.navigate(["/home"]).then(() => {
      location.reload();
    });
  }
}
