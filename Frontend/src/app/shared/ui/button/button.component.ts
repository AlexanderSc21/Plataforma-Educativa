import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      class="ui-button"
      [class.ui-button--primary]="variant === 'primary'"
      [class.ui-button--secondary]="variant === 'secondary'"
      [class.ui-button--ghost]="variant === 'ghost'"
      [class.ui-button--full]="fullWidth"
      [attr.type]="type"
      [disabled]="disabled"
    >
      <ng-content></ng-content>
    </button>
  `,
  styles: `
    :host {
      display: inline-flex;
    }

    .ui-button {
      border: 1px solid transparent;
      border-radius: 0.55rem;
      padding: 0.86rem 1rem;
      font-size: 0.96rem;
      font-weight: 700;
      line-height: 1;
      cursor: pointer;
      transition: transform 160ms ease, box-shadow 160ms ease, background-color 160ms ease;
    }

    .ui-button:hover {
      transform: translateY(-1px);
    }

    .ui-button:focus-visible {
      outline: 2px solid #2563eb;
      outline-offset: 2px;
    }

    .ui-button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }

    .ui-button--primary {
      border-color: #5c3cfc;
      background: #5c3cfc;
      color: #ffffff;
    }

    .ui-button--primary:hover:not(:disabled) {
      background: #4a2fd4;
    }

    .ui-button--secondary {
      border-color: #d1d7dc;
      background: #ffffff;
      color: #1c1d1f;
    }

    .ui-button--ghost {
      border-color: transparent;
      background: transparent;
      color: #1f2937;
    }

    .ui-button--full {
      width: 100%;
    }
  `
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() variant: 'primary' | 'secondary' | 'ghost' = 'primary';
  @Input() fullWidth = false;
  @Input() disabled = false;
}
