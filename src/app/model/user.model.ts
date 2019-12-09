import {Role} from './role.model';
import { Course, CourseDTO } from './course.model';

export interface User {
    id: number;
    username: string;
    name: string;
    surname: string;
    email: string;
    pesel: number;
    birthdate: Date;
    roles: Role[];
    courses: Course[];
  }

  export interface UserDTO {
    username: string;
    name: string;
    surname: string;
    email: string;
    pesel: number;
    birthdate: Date;
    roles: string[];
    courses: CourseDTO[];
  }

  export interface UserBasicDTO {
    username: string;
    name: string;
    surname: string;
    email: string;
  }