import {Role} from '../role/role.model';
import { Course } from '../course/course.model';

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
  }