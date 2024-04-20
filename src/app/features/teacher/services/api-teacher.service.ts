import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable } from 'rxjs';

import { MessageResponse } from '../../../models/MessageResponse';

import { Teacher, TeacherItem } from '../models/Teacher.model';
import { TeacherRequest } from '../models/TeacherRequest.model';

@Injectable({
  providedIn: 'root'
})
export class ApiTeacherService {
  httpClient: HttpClient = inject(HttpClient)
  BASE_API_URL = 'http://localhost:4000/api/v1/teachers'

  constructor() { }

  getAllTeachers(): Observable<TeacherItem[]> {
    return this.httpClient.get<TeacherItem[]>(this.BASE_API_URL)
  }

  getOneTeacher(teacherId: number): Observable<Teacher> {
    return this.httpClient.get<Teacher>(this.BASE_API_URL + '/' + teacherId)
  }

  createTeacher(teacherData: TeacherRequest): Observable<MessageResponse> {
    return this.httpClient.post<MessageResponse>(this.BASE_API_URL, teacherData)
  }

  deleteTeacher(teacherId: number) {
    return this.httpClient.delete<MessageResponse>(this.BASE_API_URL + '/' + teacherId)
  }

  updateTeacher(teacherId: number, teacherData: TeacherRequest) {
    return this.httpClient.put<MessageResponse>(this.BASE_API_URL + '/' + teacherId, teacherData)
  }
}
