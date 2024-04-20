import { Routes } from '@angular/router';

import { DashboardLayoutComponent } from './pages/layouts/dashboard-layout/dashboard-layout.component';

import { ListTeachersComponent } from './features/teacher/sections/list-teachers/list-teachers.component';
import { CreateTeacherFormComponent } from './features/teacher/sections/create-teacher-form/create-teacher-form.component';
import { TeacherDetailsComponent } from './features/teacher/sections/teacher-details/teacher-details.component';
import { UpdateTeacherFormComponent } from './features/teacher/sections/update-teacher-form/update-teacher-form.component';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    children: [
      {
        path: 'teachers',
        children: [
          {
            path: '',
            component: ListTeachersComponent
          },
          {
            path: 'create',
            component: CreateTeacherFormComponent
          },
          {
            path: ':teacherId',
            component: TeacherDetailsComponent
          },
          {
            path: ':teacherId/edit',
            component: UpdateTeacherFormComponent
          }
        ]
      },
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard/teachers'
  }
];
