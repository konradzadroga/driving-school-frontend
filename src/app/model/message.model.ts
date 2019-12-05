import {User, UserBasicDTO} from './user.model';

export interface Message {
    id: number;
    content: string;
    sentDate: Date;
    sender: User;
    receiver: User;
}

export interface MessageDTO {
    id: number;
    content: string;
    sentDate: Date;
    sender: UserBasicDTO;
    receiver: UserBasicDTO;
}

export interface SendMessageDTO {
    receiverUsername: string;
    content: string;
}