import {User} from "./user.model"

export interface Picture {
    id: number;
    url: string;
    user: User
}

export interface PictureDTO {
    url: string;
}