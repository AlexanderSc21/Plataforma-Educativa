import { ChangeDetectionStrategy, Component } from '@angular/core';

export type ProfileCourse = {
  title: string;
  author: string;
  rating: string;
  ratingCount: string;
  currentPrice: string;
  oldPrice: string;
  imageUrl: string;
  premium: boolean;
  tags: string[];
};

@Component({
  selector: 'app-profile-courses',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './profile-courses.component.html',
  styleUrls: ['./profile-courses.component.css']
})
export class ProfileCoursesComponent {
  readonly courses: ProfileCourse[] = [
    {
      title: 'AI Engineer Agentic Track: The Complete Agent y MCP Course',
      author: 'Ed Donner, Ligency',
      rating: '4.7',
      ratingCount: '37,229',
      currentPrice: 'S/ 40.90',
      oldPrice: 'S/ 58.90',
      imageUrl: 'https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?auto=format&fit=crop&q=80&w=700',
      premium: true,
      tags: ['Bestseller']
    },
    {
      title: 'AI Engineer Core Track: LLM Engineering, RAG, QLoRA, and Agents',
      author: 'Ligency, Ed Donner',
      rating: '4.7',
      ratingCount: '32,734',
      currentPrice: 'S/ 40.90',
      oldPrice: 'S/ 58.90',
      imageUrl: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&q=80&w=700',
      premium: true,
      tags: ['Bestseller']
    },
    {
      title: '100 Days of Code: The Complete Python Pro Bootcamp',
      author: 'Dr. Angela Yu, Developer and Lead Instructor',
      rating: '4.7',
      ratingCount: '420,182',
      currentPrice: 'S/ 43.90',
      oldPrice: 'S/ 62.90',
      imageUrl: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&q=80&w=700',
      premium: true,
      tags: ['Bestseller']
    },
    {
      title: 'Generative AI for Beginners',
      author: 'Aakriti E-Learning Academy',
      rating: '4.6',
      ratingCount: '106,556',
      currentPrice: 'S/ 29.90',
      oldPrice: 'S/ 39.90',
      imageUrl: 'https://images.unsplash.com/photo-1676299081847-824916de030a?auto=format&fit=crop&q=80&w=700',
      premium: true,
      tags: ['Bestseller']
    },
    {
      title: 'Ultimate AWS Certified Solutions Architect Associate 2026',
      author: 'Stephane Maarek | AWS Certified Cloud',
      rating: '4.7',
      ratingCount: '287,160',
      currentPrice: 'S/ 47.90',
      oldPrice: 'S/ 67.90',
      imageUrl: 'https://images.unsplash.com/photo-1580894894513-541e068a3e2b?auto=format&fit=crop&q=80&w=700',
      premium: true,
      tags: ['Bestseller']
    }
  ];

  scrollCourses(slider: HTMLElement, distance: number): void {
    slider.scrollBy({
      left: distance,
      behavior: 'smooth'
    });
  }
}
