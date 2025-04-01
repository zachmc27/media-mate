export interface Flickpick {
    id: number;
    name: string;
    description: string;
    listOfChoices: number[];
}

export interface FlickpickSession {
    id?: number;
    userId: number;
    flickPickListId: number;
    listOfChoices?: number[];
}