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

export interface MatchList {
    id?: number;
    userId: number;
    flickPickListId: number;
    flickPickListName: string;
    response: number[];
    status: 'Inprogress' | 'Completed';
}