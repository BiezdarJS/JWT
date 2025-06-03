import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Signal,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthFacadeService } from '../../services/auth-facade.service';
import { LoginFormFacade } from '../../services/login-form-facade.service';
import { LoaderComponent } from '../loader/loader.component';
import { LoaderStateEnum } from '../../enums/loader-state';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, LoaderComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private loginFormFacade = inject(LoginFormFacade);
  private authFacade = inject(AuthFacadeService);
  public loginForm = this.loginFormFacade.loginForm;
  public loaderState: Signal<LoaderStateEnum> = computed(() =>
    this.loginFormFacade.loaderState()
  );

  public onSubmit(): void {
    if (!this.loginForm.valid) {
      return;
    }
    const userCredentials = this.loginFormFacade.getCredentials();
    this.authFacade.login(userCredentials).subscribe({
      next: (data) => console.log(data),
      error: (err) => console.error('Błąd Logowania', err),
    });
  }
}
