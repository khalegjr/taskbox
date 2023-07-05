import {
  Meta,
  StoryObj,
  componentWrapperDecorator,
  moduleMetadata,
} from '@storybook/angular';

import { CommonModule } from '@angular/common';

import * as TaskStories from '../task/Task.stories';
import { TaskComponent } from '../task/task.component';
import { PureTaskListComponent } from './pure-task-list.component';

const meta: Meta<PureTaskListComponent> = {
  component: PureTaskListComponent,
  title: 'PureTaskList',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      // Import both components to allow component composition with Storybook
      declarations: [PureTaskListComponent, TaskComponent],
      imports: [CommonModule],
    }),
    // Wraps our stories with a decorator
    componentWrapperDecorator(
      (story) => `<div style="margin: 3em">${story}</div>`
    ),
  ],
  render: (args: PureTaskListComponent) => ({
    props: {
      ...args,
      onPinTask: TaskStories.actionsData.onPinTask,
      onArchiveTask: TaskStories.actionsData.onArchiveTask,
    },
  }),
};

export default meta;
type Story = StoryObj<PureTaskListComponent>;

export const Default: Story = {
  args: {
    tasks: [
      { ...TaskStories.Default.args?.task, id: '1', title: 'Task 1' },
      { ...TaskStories.Default.args?.task, id: '2', title: 'Task 2' },
      { ...TaskStories.Default.args?.task, id: '3', title: 'Task 3' },
      { ...TaskStories.Default.args?.task, id: '4', title: 'Task 4' },
      { ...TaskStories.Default.args?.task, id: '5', title: 'Task 5' },
      { ...TaskStories.Default.args?.task, id: '6', title: 'Task 6' },
    ],
  },
};

export const WithPinnedTasks: Story = {
  args: {
    tasks: [
      // Shaping the stories through args composition
      // Inherited data coming from the Default story
      ...(Default.args?.tasks?.slice(0, 5) || []),
      { id: '6', title: 'Task 6 (pinned)', state: 'TASK_PINNED' },
    ],
  },
};

export const Loading: Story = {
  args: {
    tasks: [],
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    // Shaping the stories through args composition
    // Inherited data coming from the Loading story
    ...Loading.args,
    loading: false,
  },
};
