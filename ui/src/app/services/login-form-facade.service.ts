import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { IUserCredentials } from '../interfaces/user-credentials.interface';
import { LoaderStateEnum } from '../enums/loader-state';

@Injectable({
  providedIn: 'root',
})
export class LoginFormFacade {
  private formBuilder = inject(FormBuilder);
  public loaderState: WritableSignal<LoaderStateEnum> = signal(
    LoaderStateEnum.IDLE
  );

  public loginForm = this.formBuilder.group({
    username: [null, Validators.required],
    password: [null, Validators.required],
  });

  get username(): AbstractControl | null {
    return this.loginForm.get('username');
  }

  get password(): AbstractControl | null {
    return this.loginForm.get('password');
  }

  public getCredentials(): IUserCredentials {
    return {
      username: this.username?.value,
      password: this.password?.value,
    };
  }
}
