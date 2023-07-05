import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-task-list',
  template: `
    <div class="list-items">
      <app-task
        *ngFor="let task of tasks"
        [task]="task"
        (onArchiveTask)="onArchiveTask.emit($event)"
        (onPinTask)="onPinTask.emit($event)"
      >
      </app-task>
      <div *ngIf="loading">loading</div>
      <div *ngIf="!loading && tasks.length === 0">empty</div>
    </div>
  `,
  styles: [],
})
export class TaskListComponent {
  /** The list of tasks */
  @Input() tasks: Task[] = [];

  /** Checks if it's in loading state */
  @Input() loading = false;

  /** Event to change task to pinned */
  @Output() onPinTask = new EventEmitter<Event>();

  /** Event to change task to archived */
  @Output() onArchiveTask = new EventEmitter<Event>();
}
