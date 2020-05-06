import { Directive, Input } from '@angular/core';
import { AsyncValidator, ValidationErrors, AbstractControl, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { Observable, Subscription, of } from 'rxjs';
import { UserService } from '../service/user.service';
import { map, switchMap, tap, filter } from 'rxjs/operators';
import { AccountService } from '../service/account.service';

@Directive({
  selector: '[transferAccountid]',
  providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: TransferAccountidValidatorDirective, multi: true }]
})
export class TransferAccountidValidatorDirective implements AsyncValidator {
  @Input('transferAccountid') controlUsername: string;
  subs: Subscription;

  constructor(private userService: UserService, private accountService: AccountService) { }

  validate(c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    const username = c.root.get(this.controlUsername);
    let id: number;



    if (username) {
      return this.userService.getUserByUsername(username.value).pipe(
        map(users => users[0]),
        filter(user => !!user),
        map(user => user._id),
        switchMap((id: number) => {
          return this.accountService.getAccountsByUserWithId(id);
        }),
        map(accounts => {
          const filtered = accounts.some(account => {
            return account._id === c.value;
          });
          return filtered;
        }),
        map((filtered: boolean) => filtered ? null : { 'transferAccountid': true })
        // ,tap(value => console.log('Value', value))
      )
    } else {
      return of({ 'transferAccountid': true })
    }
  }

}
