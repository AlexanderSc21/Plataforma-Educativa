import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-badge',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="ui-badge" [class.ui-badge--light]="tone === 'light'">
      <ng-content></ng-content>
    </span>
  `,
  styles: `
    :host {
      display: inline-flex;
    }

    .ui-badge {
      display: inline-flex;
      align-items: center;
      border-radius: 999px;
      border: 1px solid rgba(255, 255, 255, 0.25);
      padding: 0.36rem 0.8rem;
      font-size: 0.7rem;
      letter-spacing: 0.09em;
      text-transform: uppercase;
      font-weight: 700;
      background: rgba(255, 255, 255, 0.2);
      color: #ffffff;
    }

    .ui-badge--light {
      background: #eff6ff;
      color: #1e3a8a;
      border-color: #bfdbfe;
    }
  `
})
export class BadgeComponent {
  @Input() tone: 'default' | 'light' = 'default';
}
