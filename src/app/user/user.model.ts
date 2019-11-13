import {Role} from '../role/role.model';

export interface User {
    id: number;
    username: string;
    name: string;
    surname: string;
    email: string;
    pesel: number;
    birthdate: Date;
    roles: Role[];
  }