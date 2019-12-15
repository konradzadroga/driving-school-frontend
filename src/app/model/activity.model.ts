import {User, UserDTO} from './user.model';
import {Course, CourseDTO} from './course.model';

export interface Activity {
    id: number;
    date_of_activity: Date;
    rate: number;
    comment: string;
    course: Course;
    instructor: User;
    student: User;
}

export interface ActivityDTO {
    id: number;
    date_of_activity: Date;
    rate: number;
    comment: string;
    course: CourseDTO;
    instructor: UserDTO;
    student: UserDTO;
}