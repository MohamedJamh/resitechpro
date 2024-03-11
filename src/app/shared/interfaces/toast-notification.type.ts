import {ToastNotificationType} from "../enums/toast-notification-type.enum";

export interface IToastNotification {
    message: string;
    type: ToastNotificationType;
}

export class ToastNotification implements IToastNotification{
    message: string;
    type: ToastNotificationType;
    constructor(message: string, type: ToastNotificationType){
        this.message = message;
        this.type = type;
    }
}
