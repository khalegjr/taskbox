import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-task",
  template: `
    <div className="list-item">
      <label for="title" [attr.aria-label]="task.title + ''">
        <input
          type="text"
          [value]="task.title"
          readonly="true"
          id="title"
          name="title"
        />
      </label>
    </div>
  `,
  styleUrls: ["./task.component.css"],
})
export class TaskComponent {
  /**
   * The shape of the task object
   */
  @Input() task: any;

  @Output() onPinTask = new EventEmitter<Event>();
  @Output() onArchiveTask = new EventEmitter<Event>();
}
