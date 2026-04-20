import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../../features/auth/services/auth.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, AsyncPipe],
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
        
        @if (authService.currentUser$ | async; as user) {
          <div class="user-menu-container">
            <button class="user-avatar" (click)="toggleUserDropdown()">
              {{ getInitials(user.name) }}
            </button>
            
            @if (isUserDropdownOpen()) {
              <div class="user-dropdown">
                <div class="dropdown-header">
                  <div class="dropdown-avatar">{{ getInitials(user.name) }}</div>
                  <div class="dropdown-info">
                    <p class="dropdown-name">{{ user.name }}</p>
                    <p class="dropdown-email">{{ user.email }}</p>
                  </div>
                </div>
                <div class="dropdown-divider"></div>
                <a routerLink="/profile" class="dropdown-item" (click)="closeMenus()">My Profile</a>
                <a routerLink="/profile/settings" class="dropdown-item" (click)="closeMenus()">Account settings</a>
                <div class="dropdown-divider"></div>
                <button class="dropdown-item logout-btn" (click)="logout()">Logout</button>
              </div>
            }
          </div>
        } @else {
          <a routerLink="/auth/login" class="btn btn-login" (click)="closeMenu()">Log in</a>
          <a routerLink="/auth/signup" class="btn btn-signup" (click)="closeMenu()">Sign up</a>
        }
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
      (click)="closeMenus()"
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

    .user-menu-container {
      position: relative;
    }

    .user-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: #111827;
      color: #ffffff;
      font-weight: 700;
      font-size: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      cursor: pointer;
      transition: transform 150ms ease;
    }

    .user-avatar:hover {
      transform: scale(1.05);
    }

    .user-dropdown {
      position: absolute;
      top: calc(100% + 10px);
      right: 0;
      width: 260px;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
      padding: 0.5rem 0;
      z-index: 100;
    }

    .dropdown-header {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
    }

    .dropdown-avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background-color: #111827;
      color: #ffffff;
      font-weight: 700;
      font-size: 1.2rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .dropdown-info {
      overflow: hidden;
    }

    .dropdown-name {
      margin: 0;
      font-weight: 700;
      font-size: 1rem;
      color: #1f2937;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .dropdown-email {
      margin: 0;
      font-size: 0.85rem;
      color: #6b7280;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .dropdown-divider {
      height: 1px;
      background-color: #e2e8f0;
      margin: 4px 0;
    }

    .dropdown-item {
      display: block;
      width: 100%;
      text-align: left;
      padding: 10px 16px;
      background: none;
      border: none;
      font-size: 0.95rem;
      color: #4b5563;
      text-decoration: none;
      cursor: pointer;
    }

    .dropdown-item:hover {
      background-color: #f8fafc;
      color: #111827;
    }

    .logout-btn {
      color: #dc2626;
    }

    .logout-btn:hover {
      background-color: #fef2f2;
      color: #b91c1c;
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
  readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  
  readonly isMenuOpen = signal(false);
  readonly isUserDropdownOpen = signal(false);

  toggleMenu(): void {
    this.isMenuOpen.update((open) => !open);
    this.isUserDropdownOpen.set(false);
  }

  toggleUserDropdown(): void {
    this.isUserDropdownOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }

  closeMenus(): void {
    this.isMenuOpen.set(false);
    this.isUserDropdownOpen.set(false);
  }

  logout(): void {
    this.authService.logout();
    this.closeMenus();
    void this.router.navigate(['/']);
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

