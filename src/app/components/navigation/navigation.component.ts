import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation',
  template: `
    <nav class="navbar">
      <div class="nav-brand">
        <h2>Sticky Notes</h2>
      </div>
      <ul class="nav-links">
        <li><a routerLink="/home" routerLinkActive="active">Home</a></li>
        <li><a routerLink="/api-data" routerLinkActive="active">API Data</a></li>
        <li><a routerLink="/form" routerLinkActive="active">Sticky Notes</a></li>
      </ul>
    </nav>
  `, 
  styles: [`
    .navbar {
      background-color: #f9fafb; /* light gray background */
      color: #1f2937; /* dark slate text */
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #e5e7eb; /* subtle border */
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    }
    .nav-brand h2 {
      margin: 0;
      font-weight: 700;
      color: #2563eb; /* blue-600 */
    }
    .nav-links {
      list-style: none;
      display: flex;
      gap: 1.5rem;
      margin: 0;
      padding: 0;
    }
    .nav-links a {
      color: #374151; /* gray-700 */
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: 6px;
      transition: background-color 0.2s, color 0.2s;
    }
    .nav-links a:hover {
      background-color: #e0e7ff; /* indigo-100 */
      color: #1e3a8a; /* indigo-900 */
    }
    .nav-links a.active {
      background-color: #2563eb; /* blue-600 */
      color: white;
    }
  `]
})
export class NavigationComponent { }
