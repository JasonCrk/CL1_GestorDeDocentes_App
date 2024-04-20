import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApiTeacherService } from '../../services/api-teacher.service';

import { TeachersTableComponent } from '../../components/teachers-table/teachers-table.component';

@Component({
  selector: 'app-list-teachers',
  standalone: true,
  imports: [
    CommonModule,
    TeachersTableComponent,
  ],
  templateUrl: './list-teachers.component.html',
})
export class ListTeachersComponent {

  apiTeacherService: ApiTeacherService = inject(ApiTeacherService)

  teachers$ = this.apiTeacherService.getAllTeachers()
}
