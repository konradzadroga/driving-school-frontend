import { User } from './user.model';
import { Course } from './course.model';

export interface Exam {
    id: number,
    dateOfExam: Date,
    student: User,
    instructor: User,
    course: Course,
    occupied: boolean,
    passed: boolean
}

export interface ExamDTO {
    id: number,
    dateOfExam: Date,
    studentUsername: string,
    studentNameAndSurname: string,
    instructorUsername: string,
    instructorNameAndSurname: string;
    courseId: number;
    occupied: boolean;
    passed: boolean;
}