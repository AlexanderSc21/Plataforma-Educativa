import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { AuthService } from '../../auth/services/auth.service';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-account-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent {
  private readonly fb = inject(FormBuilder);
  readonly authService = inject(AuthService);
  private readonly userService = inject(UserService);

  passwordForm: FormGroup;
  successMessage = signal<string>('');
  errorMessage = signal<string>('');
  isSubmitting = signal<boolean>(false);

  constructor() {
    this.passwordForm = this.fb.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('newPassword')?.value === g.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.passwordForm.invalid) {
      if (this.passwordForm.hasError('mismatch')) {
        this.errorMessage.set('Las nuevas contraseñas no coinciden.');
      } else {
        this.errorMessage.set('Por favor, completa todos los campos correctamente.');
      }
      this.successMessage.set('');
      return;
    }

    const user = this.authService.getCurrentUser();
    if (!user) {
      this.errorMessage.set('Debes iniciar sesión primero.');
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');

    const { oldPassword, newPassword } = this.passwordForm.value;

    this.userService.changePassword(user.id, { oldPassword, newPassword }).subscribe({
      next: (res) => {
        this.successMessage.set('¡Contraseña actualizada exitosamente!');
        this.passwordForm.reset();
        this.isSubmitting.set(false);
      },
      error: (err) => {
        this.errorMessage.set(err.error?.message || 'Error al actualizar la contraseña. Verifica tu contraseña actual.');
        this.isSubmitting.set(false);
      }
    });
  }

  onDeleteAccount(userId: number) {
    if (confirm('¿Estás seguro de que deseas eliminar tu cuenta permanentemente? Esta acción no se puede deshacer.')) {
      this.userService.deleteUser(userId).subscribe({
        next: () => {
          this.authService.logout();
          window.location.href = '/';
        },
        error: (err) => {
          this.errorMessage.set('Hubo un error al intentar eliminar la cuenta.');
          console.error(err);
        }
      });
    }
  }

  getInitials(name: string): string {
    if (!name) return 'U';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  }
}
