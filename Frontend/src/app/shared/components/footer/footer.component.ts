import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="shared-footer">
      <p>Aula Nexo - {{ currentYear }}. Todos los derechos reservados.</p>
    </footer>
  `,
  styles: `
    :host {
      display: block;
    }

    .shared-footer {
      margin-top: 2rem;
      padding: 1rem;
      border-radius: 0.9rem;
      border: 1px solid #e2e8f0;
      background: #ffffff;
      text-align: center;
      color: #475569;
      font-size: 0.9rem;
    }
  `
})
export class FooterComponent {
  readonly currentYear = new Date().getFullYear();
}
