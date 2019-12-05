import {Role} from './role.model';
import { Course } from './course.model';

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
    courses: Course[];
  }

  export interface UserBasicDTO {
    username: string;
    name: string;
    surname: string;
    email: string;
  }