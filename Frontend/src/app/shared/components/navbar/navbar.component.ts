import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="navbar" aria-label="Barra principal de navegacion">
      <a routerLink="/" class="logo" (click)="closeMenu()">
        <span class="logo-dot" aria-hidden="true"></span>
        Aula Nexo
      </a>

      <label class="search-bar" for="nav-search-input">
        <span class="sr-only">Buscar cursos, docentes o habilidades</span>
        <input id="nav-search-input" type="search" placeholder="Buscar cursos, docentes o habilidades..." />
      </label>

      <div id="primary-navigation" class="nav-links" [class.nav-open]="isMenuOpen()">
        <button
          type="button"
          class="btn-close-menu"
          aria-label="Cerrar menu"
          (click)="closeMenu()"
        >
          &times;
        </button>
        <a href="#" (click)="closeMenu()">Explorar</a>
        <a href="#" (click)="closeMenu()">Suscripcion</a>
        <a href="#" (click)="closeMenu()">Docentes</a>
        <a href="#" (click)="closeMenu()">Empresas</a>
        <a routerLink="/auth/login" class="btn btn-login" (click)="closeMenu()">Log in</a>
        <a routerLink="/auth/signup" class="btn btn-signup" (click)="closeMenu()">Sign up</a>
      </div>

      <button
        type="button"
        class="hamburger"
        aria-label="Abrir menu"
        aria-controls="primary-navigation"
        [attr.aria-expanded]="isMenuOpen()"
        (click)="toggleMenu()"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>

    <button
      type="button"
      class="menu-backdrop"
      [class.backdrop-visible]="isMenuOpen()"
      tabindex="-1"
      aria-hidden="true"
      (click)="closeMenu()"
    ></button>
  `,
  styles: `
    .btn-close-menu {
      display: none;
    }

    :host {
      display: block;
    }

    .navbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      padding: 0.85rem 1rem;
      border: 1px solid #e2e8f0;
      border-radius: 1rem;
      background: #ffffff;
      box-shadow: 0 6px 20px rgba(15, 23, 42, 0.08);
      position: sticky;
      top: 0.8rem;
      z-index: 50;
    }

    .logo {
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 1.4rem;
      color: #101828;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
    }

    .logo-dot {
      width: 0.7rem;
      height: 0.7rem;
      border-radius: 0.18rem;
      background: #5c3cfc;
    }

    .search-bar {
      flex: 1;
      max-width: 560px;
    }

    .search-bar input {
      width: 100%;
      padding: 0.72rem 1rem;
      border-radius: 999px;
      border: 1px solid #d1d5db;
      background: #f8fafc;
      color: #0f172a;
    }

    .search-bar input:focus-visible {
      outline: 2px solid #2563eb;
      outline-offset: 2px;
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 0.9rem;
    }

    .nav-links a {
      text-decoration: none;
      color: #1f2937;
      font-size: 0.92rem;
      font-weight: 500;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 0.5rem;
      font-size: 0.9rem;
      font-weight: 700;
      transition: transform 160ms ease, box-shadow 160ms ease, background-color 160ms ease;
    }

    .btn:hover {
      transform: translateY(-1px);
    }

    .btn:focus-visible {
      outline: 2px solid #2563eb;
      outline-offset: 2px;
    }

    .btn-login {
      border: 1px solid #0f172a;
      color: #0f172a;
      background: #ffffff;
      padding: 0.58rem 0.98rem;
    }

    .nav-links a.btn-login {
      color: #0f172a;
    }

    .btn-signup {
      border: 1px solid #0b1220;
      color: #ffffff;
      background: #0b1220;
      padding: 0.58rem 0.98rem;
    }

    .nav-links a.btn-signup {
      color: #ffffff;
    }

    .btn-signup:hover {
      background: #111827;
    }

    .btn-signup:active {
      background: #020617;
    }

    .hamburger {
      display: none;
      border: none;
      background: transparent;
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 0.5rem;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 0.25rem;
      cursor: pointer;
    }

    .hamburger:focus-visible {
      outline: 2px solid #2563eb;
      outline-offset: 2px;
    }

    .hamburger span {
      width: 1.3rem;
      height: 0.14rem;
      border-radius: 99px;
      background: #111827;
    }

    .menu-backdrop {
      position: fixed;
      inset: 0;
      border: none;
      background: rgba(2, 6, 23, 0.3);
      opacity: 0;
      pointer-events: none;
      transition: opacity 220ms ease;
      z-index: 40;
    }

    .backdrop-visible {
      opacity: 1;
      pointer-events: auto;
    }

    @media (max-width: 1100px) {
      .search-bar {
        max-width: 380px;
      }

      .nav-links {
        gap: 0.65rem;
      }

      .nav-links a {
        font-size: 0.86rem;
      }
    }

    @media (max-width: 900px) {
      .search-bar {
        display: none;
      }

      .btn-close-menu {
        display: block;
        position: absolute;
        top: 1.1rem;
        right: 1.1rem;
        background: none;
        border: none;
        font-size: 2.2rem;
        line-height: 1;
        color: #1f2937;
        cursor: pointer;
        padding: 0.25rem;
      }

      .hamburger {
        display: inline-flex;
      }

      .nav-links {
        position: fixed;
        top: 0;
        right: 0;
        width: min(88vw, 360px);
        height: 100dvh;
        background: #ffffff;
        border-left: 1px solid #e2e8f0;
        box-shadow: -24px 0 40px rgba(15, 23, 42, 0.16);
        padding: 5.5rem 1.3rem 1.4rem;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        gap: 0.75rem;
        transform: translateX(100%);
        transition: transform 240ms ease;
        z-index: 60;
      }

      .nav-links a {
        padding: 0.65rem 0.25rem;
        border-bottom: 1px solid #f1f5f9;
      }

      .nav-links .btn {
        margin-top: 0.35rem;
        width: 100%;
      }

      .nav-open {
        transform: translateX(0);
      }
    }
  `
})
export class NavbarComponent {
  readonly isMenuOpen = signal(false);

  toggleMenu(): void {
    this.isMenuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }
}

