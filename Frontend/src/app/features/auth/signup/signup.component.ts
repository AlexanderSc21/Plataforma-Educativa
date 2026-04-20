import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { InputComponent } from '../../../shared/ui/input/input.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  imports: [RouterLink, ReactiveFormsModule, NavbarComponent, ButtonComponent, InputComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  readonly signupForm = this.fb.nonNullable.group({
    fullName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required]],
    terms: [false, [Validators.requiredTrue]]
  });

  errorMessage = signal<string>('');

  onSubmit(): void {
    if (this.signupForm.valid) {
      const { fullName, email, password, confirmPassword } = this.signupForm.getRawValue();

      if (password !== confirmPassword) {
        this.errorMessage.set('Las contraseñas no coinciden.');
        return;
      }

      this.authService.register({ name: fullName, email, password }).subscribe({
        next: () => {
          void this.router.navigate(['/profile']);
        },
        error: (err) => {
          console.error('Error en el registro', err);
          if (err.status === 400) {
            this.errorMessage.set('El correo ya está registrado.');
          } else {
            this.errorMessage.set('Ocurrió un error al crear la cuenta.');
          }
        }
      });
      return;
    }

    this.signupForm.markAllAsTouched();
  }
}
