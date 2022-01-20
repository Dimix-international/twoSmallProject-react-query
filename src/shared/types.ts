export interface Id {
    id: number
}

export interface Image {
    fileName: string;
    authorName: string;
    authorLink: string;
    platformName: string;
    platformLink: string;
}

export interface NewUser {
    email: string;
    name?: string;
    address: string;
    phone?: string;
    token?: string
}

export type User = Id & NewUser;

export interface Appointment extends Id {
    dateTime: Date;
    treatmentName: string;
    userId?: number
}

export type AppointmentDateMap = Record<number, Appointment[]>

export interface Treatment extends Id {
    name: string;
    durationInMinutes: number;
    image: Image;
    description: string;
}

export interface Staff extends Id {
    name: string;
    treatmentNames: string [];
    image: Image
}