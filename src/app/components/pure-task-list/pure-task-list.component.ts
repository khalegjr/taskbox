import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-pure-task-list',
  template: `
    <div class="list-items">
      <app-task
        *ngFor="let task of tasksInOrder"
        [task]="task"
        (onArchiveTask)="onArchiveTask.emit($event)"
        (onPinTask)="onPinTask.emit($event)"
      >
      </app-task>
      <div
        *ngIf="!loading && tasksInOrder.length === 0"
        class="wrapper-message"
      >
        <span class="icon-check"></span>
        <p class="title-message">You have no tasks</p>
        <p class="subtitle-message">Sit back and relax</p>
      </div>

      <div *ngIf="loading">
        <div *ngFor="let i of [1, 2, 3, 4, 5, 6]" class="loading-item">
          <span class="glow-checkbox"></span>
          <span class="glow-text">
            <span>Loading</span> <span>cool</span> <span>state</span>
          </span>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class PureTaskListComponent {
  /**
   * @ignore
   * Component property to define ordering of tasks
   */
  tasksInOrder: Task[] = [];

  /** Checks if it's in loading state */
  @Input() loading = false;

  /** Event to change task to pinned */
  @Output() onPinTask = new EventEmitter<Event>();

  /** Event to change task to archived */
  @Output() onArchiveTask = new EventEmitter<Event>();

  @Input() set tasks(arr: Task[]) {
    const initialTasks = [
      ...arr.filter((t) => t.state === 'TASK_PINNED'),
      ...arr.filter((t) => t.state !== 'TASK_PINNED'),
    ];
    const filteredTasks = initialTasks.filter(
      (t) => t.state === 'TASK_INBOX' || t.state === 'TASK_PINNED'
    );

    this.tasksInOrder = filteredTasks.filter(
      (t) => t.state === 'TASK_INBOX' || t.state === 'TASK_PINNED'
    );
  }
}
