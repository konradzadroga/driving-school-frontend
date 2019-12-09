export interface Course {
    id: number;
    name: string;
    description: string;
    places: number;
  }

  export interface CourseDTO {
    id: number;
    category: string;
    description: string;
    places: number;
    startdate: Date;
    cost: number;
    instructorUsername: string;
  }