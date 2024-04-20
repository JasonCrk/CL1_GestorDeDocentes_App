import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Observable } from 'rxjs';

import { TeacherRequest } from '../../models/TeacherRequest.model';
import { Gender } from '../../../../models/enums/Gender.enum';
import { Category } from '../../../category/models/Category.model';

import { ApiTeacherService } from '../../services/api-teacher.service';
import { ApiCategoryService } from '../../../category/services/api-category.service';

import { notToday } from '../../../../validations/dateValidations';

@Component({
  selector: 'app-create-teacher-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './create-teacher-form.component.html',
})
export class CreateTeacherFormComponent {

  router: Router = inject(Router)

  apiTeacherService: ApiTeacherService = inject(ApiTeacherService)
  apiCategoryService: ApiCategoryService = inject(ApiCategoryService)

  categories$: Observable<Category[]> = this.apiCategoryService.getAllCategories()

  isLoading = false
  isSubmitted = false

  createTeacherForm = new FormGroup({
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

  onSubmit() {
    this.isLoading = true
    this.isSubmitted = true

    if (typeof this.createTeacherForm.controls.categoryId.value === 'string') {
      this.createTeacherForm.controls.categoryId.setValue(Number(this.createTeacherForm.controls.categoryId.value))
    }

    if (this.createTeacherForm.invalid) {
      this.isLoading = false
      console.log(this.createTeacherForm)
      return;
    }

    this.apiTeacherService.createTeacher(this.createTeacherForm.value as TeacherRequest)
      .subscribe({
        next: ({ message }) => {
          this.router.navigate(['/dashboard/teachers'])
          alert(message)
        },
        error: (err) => {
          // Esto es solo provicional, obviamente asi no hay que mostrar errores del backend al cliente
          alert(JSON.stringify(err))
        },
        complete: () => {
          this.isLoading = false
        }
      })
  }

  get name() {
    return this.createTeacherForm.controls.name
  }

  get gender() {
    return this.createTeacherForm.controls.gender
  }

  get email() {
    return this.createTeacherForm.controls.email
  }

  get salary() {
    return this.createTeacherForm.controls.salary
  }

  get category() {
    return this.createTeacherForm.controls.categoryId
  }

  get dni() {
    return this.createTeacherForm.controls.dni
  }

  get birthdate() {
    return this.createTeacherForm.controls.birthdate
  }
}
