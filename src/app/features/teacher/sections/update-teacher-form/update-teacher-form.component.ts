import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Gender } from '../../../../models/enums/Gender.enum';
import { TeacherRequest } from '../../models/TeacherRequest.model';

import { ApiTeacherService } from '../../services/api-teacher.service';
import { ApiCategoryService } from '../../../category/services/api-category.service';

import { notToday } from '../../../../validations/dateValidations';

@Component({
  selector: 'app-update-teacher-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './update-teacher-form.component.html',
})
export class UpdateTeacherFormComponent implements OnInit {

  router: Router = inject(Router)
  activatedRouter = inject(ActivatedRoute)

  apiTeacherService: ApiTeacherService = inject(ApiTeacherService)
  apiCategoryService: ApiCategoryService = inject(ApiCategoryService)

  teacherId: number = Number(this.activatedRouter.snapshot.params['teacherId'])

  categories$ = this.apiCategoryService.getAllCategories()
  teacherDetails$ = this.apiTeacherService.getOneTeacher(this.teacherId)

  isLoading = false
  isSubmitted = false

  updateTeacherForm = new FormGroup({
    name: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(45)
    ]),
    email: new FormControl<string>('', [
      Validators.required,
      Validators.email,
      Validators.minLength(10),
      Validators.maxLength(45)
    ]),
    dni: new FormControl<string>('', [
      Validators.required,
      Validators.pattern(/^[1-9][0-9]{7}$/),
    ]),
    birthdate: new FormControl<Date>(new Date(), [
      Validators.required,
      notToday
    ]),
    salary: new FormControl<number>(0, [
      Validators.required,
      Validators.min(1)
    ]),
    categoryId: new FormControl<number>(0, [
      Validators.required,
      Validators.min(1),
      Validators.pattern("^[1-9][0-9]*")
    ]),
    gender: new FormControl<Gender>(Gender.Hombre, Validators.required)
  })

  ngOnInit(): void {
    this.teacherDetails$.subscribe({
      next: teacher => {
        this.updateTeacherForm.patchValue({
          name: teacher.name,
          categoryId: teacher.category.id,
          email: teacher.email,
          dni: teacher.dni,
          salary: teacher.salary,
          birthdate: new Date(teacher.birthdate),
          gender: Gender[teacher.gender as keyof typeof Gender]
        })
      },
      error: (err) => {
        alert(err.message)
      }
    })
  }

  onSubmit() {
    this.isLoading = true
    this.isSubmitted = true

    if (typeof this.updateTeacherForm.controls.categoryId.value === 'string') {
      this.updateTeacherForm.controls.categoryId.setValue(
        Number(this.updateTeacherForm.controls.categoryId.value)
      )
    }

    if (this.updateTeacherForm.invalid) {
      this.isLoading = false
      return;
    }

    this.apiTeacherService.updateTeacher(this.teacherId, this.updateTeacherForm.value as TeacherRequest)
      .subscribe({
        next: ({ message }) => {
          this.router.navigate(['/dashboard/teachers'])
          alert(message)
        },
        error: (err) => {
          // Esto es solo provicional, obviamente asi no hay que mostrar errores del backend al cliente
          alert(err.message)
        },
        complete: () => {
          this.isLoading = false
        }
      })
  }

  get name() {
    return this.updateTeacherForm.controls.name
  }

  get gender() {
    return this.updateTeacherForm.controls.gender
  }

  get email() {
    return this.updateTeacherForm.controls.email
  }

  get salary() {
    return this.updateTeacherForm.controls.salary
  }

  get category() {
    return this.updateTeacherForm.controls.categoryId
  }

  get dni() {
    return this.updateTeacherForm.controls.dni
  }

  get birthdate() {
    return this.updateTeacherForm.controls.birthdate
  }
}
