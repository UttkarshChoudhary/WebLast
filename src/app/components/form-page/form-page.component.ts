import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-form-page',
  template: `
    <div class="form-container">
      <h1>Add New Todo</h1>
      
      <form [formGroup]="todoForm" (ngSubmit)="onSubmit()" class="todo-form">
        <div class="form-group">
          <label for="title">Todo Title *</label>
          <input 
            type="text" 
            id="title"
            formControlName="title"
            class="form-control"
            [class.error]="todoForm.get('title')?.invalid && todoForm.get('title')?.touched"
          >
          <div *ngIf="todoForm.get('title')?.invalid && todoForm.get('title')?.touched" class="error-message">
            <span *ngIf="todoForm.get('title')?.errors?.['required']">Title is required</span>
            <span *ngIf="todoForm.get('title')?.errors?.['minlength']">Title must be at least 3 characters</span>
          </div>
        </div>

        <div class="form-group">
          <label for="description">Description</label>
          <textarea 
            id="description"
            formControlName="description"
            class="form-control"
            rows="3"
            [class.error]="todoForm.get('description')?.invalid && todoForm.get('description')?.touched"
          ></textarea>
          <div *ngIf="todoForm.get('description')?.invalid && todoForm.get('description')?.touched" class="error-message">
            <span *ngIf="todoForm.get('description')?.errors?.['maxlength']">Description cannot exceed 200 characters</span>
          </div>
        </div>

        <div class="form-group">
          <label for="priority">Priority *</label>
          <select 
            id="priority"
            formControlName="priority"
            class="form-control"
            [class.error]="todoForm.get('priority')?.invalid && todoForm.get('priority')?.touched"
          >
            <option value="">Select Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <div *ngIf="todoForm.get('priority')?.invalid && todoForm.get('priority')?.touched" class="error-message">
            <span *ngIf="todoForm.get('priority')?.errors?.['required']">Priority is required</span>
          </div>
        </div>

        <button type="submit" [disabled]="todoForm.invalid" class="submit-btn">
          Add Todo
        </button>
      </form>

      <div *ngIf="submitted" class="success-message">
        Todo added successfully! <a routerLink="/home">View all todos</a>
      </div>
    </div>
  `,
  styles: [`
    .form-container {
      max-width: 600px;
      margin: 0 auto;
    }
    h1 {
      color: #1f2937; /* dark slate */
      text-align: center;
    }
    .todo-form {
      background: #ffffff;
      padding: 2rem;
      border-radius: 8px;
      border: 1px solid #e5e7eb; /* light gray border */
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    }
    .form-group {
      margin-bottom: 1.5rem;
    }
    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 600;
      color: #374151; /* gray-700 */
    }
    .form-control {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #d1d5db; /* gray-300 */
      border-radius: 6px;
      font-size: 1rem;
      background-color: #f9fafb; /* light gray background */
      transition: border-color 0.2s, box-shadow 0.2s;
    }
    .form-control:focus {
      outline: none;
      border-color: #2563eb; /* blue-600 */
      box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
      background-color: #ffffff;
    }
    .form-control.error {
      border-color: #dc2626; /* red-600 */
    }
    .error-message {
      color: #dc2626; /* red-600 */
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }
    .submit-btn {
      background-color: #2563eb; /* blue-600 */
      color: white;
      border: none;
      padding: 0.75rem 2rem;
      border-radius: 6px;
      cursor: pointer;
      font-size: 1rem;
      width: 100%;
      transition: background-color 0.2s;
    }
    .submit-btn:hover:not(:disabled) {
      background-color: #1d4ed8; /* blue-700 */
    }
    .submit-btn:disabled {
      background-color: #9ca3af; /* gray-400 */
      cursor: not-allowed;
    }
    .success-message {
      background-color: #d1fae5; /* green-100 */
      color: #065f46; /* green-800 */
      padding: 1rem;
      border-radius: 6px;
      margin-top: 1rem;
      text-align: center;
      border: 1px solid #a7f3d0; /* green-200 */
    }
    .success-message a {
      color: #065f46; /* green-800 */
      font-weight: bold;
    }
  `]
})
export class FormPageComponent implements OnInit {
  todoForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private todoService: TodoService
  ) {
    this.todoForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.maxLength(200)]],
      priority: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.todoForm.valid) {
      const formValue = this.todoForm.value;
      const todoTitle = `${formValue.title} (${formValue.priority} priority)`;
      
      this.todoService.addTodo(todoTitle);
      this.todoForm.reset();
      this.submitted = true;
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        this.submitted = false;
      }, 3000);
    }
  }
}
