import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';

import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroTrash } from '@ng-icons/heroicons/outline';

import { ApiTeacherService } from '../../services/api-teacher.service';

@Component({
  selector: 'app-delete-teacher-button',
  standalone: true,
  imports: [NgIconComponent],
  viewProviders: [provideIcons({ heroTrash })],
  templateUrl: './delete-teacher-button.component.html',
})
export class DeleteTeacherButtonComponent {
  @Input({ required: true }) teacherId!: number

  router: Router = inject(Router)

  apiTeacherService: ApiTeacherService = inject(ApiTeacherService)

  onDeleteTeacher() {
    this.apiTeacherService.deleteTeacher(this.teacherId)
      .subscribe({
        next: ({ message }) => {
          alert(message)
          window.location.reload()
        },
        error: (err) => {
          // Se que asi no se manejan los errores, pero como no pidio manejo de error en Angular ya pues este es el resultado
          alert(err)
        }
      })
  }
}
