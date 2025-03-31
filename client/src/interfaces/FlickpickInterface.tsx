export interface Flickpick {
    id: number;
    name: string;
    description: string;
    listOfChoices: number[];
}

export interface FlickpickSession {
    id?: number;
    userOneId: number;
    userTwoId: number;
    flickPickListId: number;
    listOfChoices?: number[];
    userOneResponse?: string[];
    userTwoResponse?: string[];
    matches?: number[];
    status?: 'Incomplete' | 'Completed';
}