import { Component, Input } from '@angular/core';

import { TeacherItem } from '../../models/Teacher.model';

import { DeleteTeacherButtonComponent } from '../delete-teacher-button/delete-teacher-button.component';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroPencilSquare } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-teachers-table',
  standalone: true,
  imports: [
    DeleteTeacherButtonComponent,
    NgIconComponent
  ],
  viewProviders: [provideIcons({ heroPencilSquare })],
  templateUrl: './teachers-table.component.html',
})
export class TeachersTableComponent {
  @Input({ required: true }) teachers!: TeacherItem[]
}

