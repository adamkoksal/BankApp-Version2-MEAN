import { Directive } from '@angular/core';
import { NG_ASYNC_VALIDATORS, AsyncValidator, AbstractControl, ValidationErrors } from '@angular/forms';
import { UserService } from '../service/user.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Directive({
  selector: '[transferUsername]',
  providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: TransferUsernameValidatorDirective, multi: true }]

})
export class TransferUsernameValidatorDirective implements AsyncValidator  {

  constructor(private userService: UserService) { }

  validate(c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.userService.getUserByUsername(c.value).pipe(
      map(users => {
        return users && users.length > 0 ? null : {'transferUsername': true} ;
      })
    );
  }

}
