import { Component, OnInit } from '@angular/core';
import { ApiService, Post } from '../../services/api.service';

@Component({
  selector: 'app-api-data',
  template: `
    <div class="api-data-container">
      <h1>API Data from JSONPlaceholder</h1>
      <p>This page demonstrates consuming data from a public API.</p>
      
      <button (click)="loadPosts()" class="load-btn">Load Posts</button>
      
      <div *ngIf="loading" class="loading">Loading...</div>
      
      <div *ngIf="posts.length > 0" class="posts-container">
        <div *ngFor="let post of posts.slice(0, 10)" class="post-card">
          <h3>{{ post.title }}</h3>
          <p>{{ post.body }}</p>
          <small>User ID: {{ post.userId }} | Post ID: {{ post.id }}</small>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .api-data-container {
      max-width: 800px;
      margin: 0 auto;
    }
    h1 {
      color: #1f2937; /* dark slate */
      text-align: center;
    }
    .load-btn {
      background-color: #2563eb; /* blue-600 */
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 6px;
      cursor: pointer;
      font-size: 1rem;
      margin-bottom: 2rem;
      transition: background-color 0.2s ease;
    }
    .load-btn:hover {
      background-color: #1d4ed8; /* blue-700 */
    }
    .loading {
      text-align: center;
      font-size: 1.2rem;
      color: #6b7280; /* gray-500 */
    }
    .posts-container {
      display: grid;
      gap: 1rem;
    }
    .post-card {
      border: 1px solid #e5e7eb; /* gray-200 */
      border-radius: 8px;
      padding: 1rem;
      background-color: #ffffff;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    }
    .post-card h3 {
      margin-top: 0;
      color: #111827; /* gray-900 */
    }
    .post-card p {
      color: #374151; /* gray-700 */
    }
    .post-card small {
      color: #6b7280; /* gray-500 */
    }
  `]
})
export class ApiDataComponent implements OnInit {
  posts: Post[] = [];
  loading = false;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.loading = true;
    this.apiService.getPosts().subscribe({
      next: (posts) => {
        this.posts = posts;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading posts:', error);
        this.loading = false;
      }
    });
  }
}
