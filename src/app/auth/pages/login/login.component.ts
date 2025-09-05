import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { validateForm } from '../../../shared/forms/helpers/form.helper';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { NotificationComponent } from '../../../shared/ui/notification/notification.component';
import { type LoginRequest } from '../../models/auth.interface';
import { AuthStore } from '../../store/auth.store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent, NotificationComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly auth = inject(AuthStore);
  private readonly router = inject(Router);

  protected register = signal(false);
  protected readonly notice = this.auth.notice;

  protected readonly title = computed(() => (this.register() ? 'Register' : 'Login'));
  protected readonly submitLabel = computed(() =>
    this.register() ? 'Already have an account? Login' : 'Click here to register',
  );

  protected form: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor() {
    effect(() => {
      if (this.auth.token()) {
        this.router.navigateByUrl('/shopping');
      }
    });
  }

  protected get emailError(): string | null {
    const control = this.form.get('email');
    if (!control || !(control.dirty || control.touched)) {
      return null;
    }

    if (control.hasError('required')) {
      return 'Email is required';
    }

    if (control.hasError('email')) {
      return 'Enter a valid email';
    }

    if (control.hasError('email')) {
      return 'Enter a valid email';
    }

    return null;
  }

  protected get passwordError(): string | null {
    const control = this.form.get('password');
    if (!control || !(control.dirty || control.touched)) {
      return null;
    }

    if (control.hasError('required')) {
      return 'Password is required';
    }

    if (control.hasError('minlength')) {
      return 'Password must be at least 6 characters';
    }

    return null;
  }

  protected onSubmit(): void {
    if (!validateForm(this.form)) {
      return;
    }

    const credentials = this.form.getRawValue() as LoginRequest;

    if (this.register()) {
      this.auth.register(credentials);
      return;
    }

    this.auth.login(credentials);
  }

  protected toggleFormType(): void {
    this.register.set(!this.register());
  }
}
