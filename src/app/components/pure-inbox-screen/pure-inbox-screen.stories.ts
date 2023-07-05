import { CommonModule } from '@angular/common';
import { importProvidersFrom } from '@angular/core';
import { NgxsModule, Store } from '@ngxs/store';
import {
  Meta,
  StoryObj,
  applicationConfig,
  moduleMetadata,
} from '@storybook/angular';

import { fireEvent, within } from '@storybook/testing-library';
import { TasksState } from 'src/app/state/task.state';
import { TaskModule } from '../task.module';
import { PureInboxScreenComponent } from './pure-inbox-screen.component';

const meta: Meta<PureInboxScreenComponent> = {
  component: PureInboxScreenComponent,
  title: 'PureInboxScreen',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CommonModule, TaskModule],
    }),
    applicationConfig({
      providers: [Store, importProvidersFrom(NgxsModule.forRoot([TasksState]))],
    }),
  ],
};

export default meta;
type Story = StoryObj<PureInboxScreenComponent>;

export const Default: Story = {};

export const Error: Story = {
  args: {
    error: true,
  },
};

export const WithInteractions: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Simulates pinning the first task
    await fireEvent.click(canvas.getByLabelText('pinTask-1'));

    // Simulates pinning the third task
    await fireEvent.click(canvas.getByLabelText('pinTask-3'));
  },
};
