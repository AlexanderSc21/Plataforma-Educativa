import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { ProfileCoursesComponent } from './components/profile-courses/profile-courses.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink, NavbarComponent, ProfileCoursesComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
}
