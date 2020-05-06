import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { HomeComponent } from "./home/home.component";
import { ProfileComponent } from "./profile/profile.component";
import { TopBarComponent } from "./bar/top-bar/top-bar.component";
import { RouterModule } from "@angular/router";
import { SignupComponent } from "./authorization/signup/signup.component";
import { LoginComponent } from "./authorization/login/login.component";
import { TransactionComponent } from "./transaction/transaction/transaction.component";
import { AccountDetailsComponent } from "./home/account-details/account-details.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule } from "@angular/material";
import { MatChipsModule } from "@angular/material/chips";
import { MatCardModule } from "@angular/material/card";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { EditAccountNameComponent } from "./home/account-details/edit-account-name/edit-account-name.component";
import { MatInputModule } from "@angular/material/input";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatTabsModule } from "@angular/material/tabs";
import { MatSelectModule } from "@angular/material/select";
import { MatStepperModule } from "@angular/material/stepper";

import { FormsModule } from "@angular/forms";
import { CreateAccountComponent } from "./home/account-details/create-account/create-account.component";
import { UniqueUsernameValidatorDirective } from "./validator/unique-username-validator.directive";
import { CompareValidatorDirective } from "./validator/compare-validator.directive";
import { TransferComponent } from "./transaction/transfer/transfer.component";
import { SendComponent } from "./transaction/send/send.component";
import { BillPayComponent } from "./transaction/bill-pay/bill-pay.component";
import { TransferUsernameValidatorDirective } from "./validator/transfer-username-validator.directive";
import { TransferAccountidValidatorDirective } from "./validator/transfer-accountid-validator.directive";
import { LoginGuard } from "./authorization/login.guard";
import { AuthGuard } from "./authorization/auth.guard";
import { OldPasswordCompareDirective } from "./validator/old-password-compare.directive";
import { ForgotPasswordComponent } from "./authorization/forgot-password/forgot-password.component";
import { HomeResolverService } from "./service/home-resolver.service";
import { UserResolverService } from "./service/user-resolver.service";
import { AccountService } from "./service/account.service";
import { UserService } from "./service/user.service";
import { BillpayResolverService } from "./service/billpay-resolver.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    TopBarComponent,
    SignupComponent,
    LoginComponent,
    TransactionComponent,
    AccountDetailsComponent,
    EditAccountNameComponent,
    CreateAccountComponent,
    UniqueUsernameValidatorDirective,
    CompareValidatorDirective,
    TransferComponent,
    SendComponent,
    BillPayComponent,
    TransferUsernameValidatorDirective,
    TransferAccountidValidatorDirective,
    OldPasswordCompareDirective,
    ForgotPasswordComponent,
  ],
  entryComponents: [EditAccountNameComponent, CreateAccountComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(
      [
        {
          path: "profile",
          component: ProfileComponent,
          canActivate: [AuthGuard],
        },
        {
          path: "transaction",
          component: TransactionComponent,
          canActivate: [AuthGuard],
        },
        {
          path: "home/account-details",
          component: AccountDetailsComponent,
          resolve: {
            billpays: BillpayResolverService,
          },
          canActivate: [AuthGuard],
          runGuardsAndResolvers: "always",
        },

        {
          path: "home/account-details/:id",
          component: AccountDetailsComponent,
          resolve: {
            billpays: BillpayResolverService,
          },
          canActivate: [AuthGuard],
          runGuardsAndResolvers: "always",
        },

        {
          path: "home",
          component: HomeComponent,
          resolve: {
            accounts: HomeResolverService,
            user: UserResolverService,
          },
          canActivate: [AuthGuard],
          runGuardsAndResolvers: "always",
        },

        { path: "login", component: LoginComponent, canActivate: [LoginGuard] },
        {
          path: "signup",
          component: SignupComponent,
          canActivate: [LoginGuard],
        },
        {
          path: "forgot-password",
          component: ForgotPasswordComponent,
          canActivate: [LoginGuard],
        },

        { path: "", redirectTo: "/home", pathMatch: "full" },
        { path: "**", redirectTo: "/home", pathMatch: "full" },
      ],
      { onSameUrlNavigation: "reload" }
    ),
    MatButtonModule,
    MatChipsModule,
    MatCardModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatTabsModule,
    MatSelectModule,
    MatStepperModule,
    BrowserAnimationsModule,
  ],
  providers: [
    HomeResolverService,
    UserResolverService,
    BillpayResolverService,
    AccountService,
    UserService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
