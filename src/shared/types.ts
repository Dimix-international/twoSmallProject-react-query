export interface Id {
    id:number
}

export interface Image {
    fileName:string;
    authorName:string;
    authorLink:string;
    platformName:string;
    platformLink:string;
}

export interface Treatment extends Id {
    name:string;
    durationInMinutes:number;
    image:Image;
    description:string;
}

export interface Staff extends Id {
    name:string ;
    treatmentNames: string [];
    image:Image
}