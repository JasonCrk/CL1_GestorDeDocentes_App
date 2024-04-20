import { Category } from '../../category/models/Category.model'

export interface Teacher {
  id: number
  name: string
  salary: number
  dni: string
  birthdate: string
  email: string
  gender: string
  category: Category
}

export interface TeacherItem {
  id: number
  name: string
  email: string
  gender: string
  category: string
}

