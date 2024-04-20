import { Component, Input } from '@angular/core';

import { TeacherItem } from '../../models/Teacher.model';

@Component({
  selector: 'app-teacher-row',
  standalone: true,
  imports: [],
  templateUrl: './teacher-row.component.html',
})
export class TeacherRowComponent {
  @Input({ required: true }) teacher!: TeacherItem
}
