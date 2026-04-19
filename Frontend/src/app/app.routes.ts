import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent)
	},
	{
		path: 'profile',
		loadComponent: () => import('./features/profile/profile.component').then((m) => m.ProfileComponent)
	},
	{
		path: 'auth',
		loadChildren: () => import('./features/auth/auth.routes').then((m) => m.AUTH_ROUTES)
	},
	{
		path: '**',
		redirectTo: ''
	}
];
