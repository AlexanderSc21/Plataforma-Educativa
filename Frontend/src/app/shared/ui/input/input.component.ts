import { ChangeDetectionStrategy, Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ],
  template: `
    <label class="input-field" [attr.for]="inputId">
      @if (label) {
        <span class="input-label">{{ label }}</span>
      }
      <input
        class="input-control"
        [id]="inputId"
        [attr.type]="type"
        [attr.placeholder]="placeholder"
        [attr.autocomplete]="autocomplete"
        [required]="required"
        [disabled]="disabled"
        [value]="value"
        [attr.aria-invalid]="invalid"
        [attr.aria-describedby]="describedBy"
        (input)="handleInput($event)"
        (blur)="handleBlur()"
      />
    </label>
    @if (invalid && errorText) {
      <small class="input-error" [id]="describedBy">{{ errorText }}</small>
    }
  `,
  styles: `
    :host {
      display: block;
      width: 100%;
    }

    .input-field {
      display: grid;
      gap: 0.46rem;
      width: 100%;
    }

    .input-label {
      font-size: 0.9rem;
      font-weight: 700;
      color: #1c1d1f;
    }

    .input-control {
      width: 100%;
      padding: 0.82rem 0.95rem;
      border: 1px solid #d1d7dc;
      border-radius: 0.55rem;
      outline: none;
      font-size: 0.96rem;
      color: #1c1d1f;
      background: #ffffff;
    }

    .input-control:focus-visible {
      border-color: #5c3cfc;
      box-shadow: 0 0 0 3px rgba(92, 60, 252, 0.15);
    }

    .input-control[aria-invalid='true'] {
      border-color: #dc2626;
      box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.12);
    }

    .input-error {
      display: block;
      margin-top: 0.35rem;
      color: #b91c1c;
      font-size: 0.8rem;
      font-weight: 600;
    }
  `
})
export class InputComponent implements ControlValueAccessor {
  private static nextId = 0;

  @Input() id = '';
  @Input() label = '';
  @Input() type: 'text' | 'email' | 'password' | 'search' = 'text';
  @Input() placeholder = '';
  @Input() autocomplete = 'off';
  @Input() required = false;
  @Input() invalid = false;
  @Input() errorText = '';

  value = '';
  disabled = false;

  private readonly generatedId = `app-input-${InputComponent.nextId++}`;
  private onChange: (value: string) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  get inputId(): string {
    return this.id || this.generatedId;
  }

  get describedBy(): string | null {
    if (!this.invalid || !this.errorText) {
      return null;
    }

    return `${this.inputId}-error`;
  }

  writeValue(value: string | null): void {
    this.value = value ?? '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  handleInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.value = inputElement.value;
    this.onChange(this.value);
  }

  handleBlur(): void {
    this.onTouched();
  }
}
