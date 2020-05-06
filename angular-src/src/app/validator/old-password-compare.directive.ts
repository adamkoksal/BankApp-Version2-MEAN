import { Directive } from '@angular/core';
import { AsyncValidator, AbstractControl, ValidationErrors, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { UserService } from '../service/user.service';
import { map } from 'rxjs/operators';

@Directive({
  selector: '[oldPassword]',
  providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: OldPasswordCompareDirective, multi: true }]
})
export class OldPasswordCompareDirective implements AsyncValidator {

  constructor(private userService: UserService) { }

  validate(c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {

    return this.userService.checkPassword(c.value).pipe(
      map((boolean) => {
        return boolean === true ? null : {'oldPassword': true};
      })
    )
  }

}
