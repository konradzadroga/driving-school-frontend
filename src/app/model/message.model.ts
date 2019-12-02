import {User, UserDTO} from './user.model';

export interface Message {
    id: number;
    content: string;
    sentDate: Date;
    sender: User;
    receiver: UserDTO;
}

export interface MessageDTO {
    id: number;
    content: string;
    sentDate: Date;
    sender: UserDTO;
    receiver: UserDTO;
}

export interface SendMessageDTO {
    receiverUsername: string;
    content: string;
}