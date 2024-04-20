import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { ApiTeacherService } from '../../services/api-teacher.service';

@Component({
  selector: 'app-teacher-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './teacher-details.component.html',
})
export class TeacherDetailsComponent {
  apiTeacherService: ApiTeacherService = inject(ApiTeacherService)
  activatedRoute: ActivatedRoute = inject(ActivatedRoute)

  teacher$ = this.apiTeacherService.getOneTeacher(Number(this.activatedRoute.snapshot.params['teacherId']))
}
