export interface Flickpick {
    id: number;
    name: string;
    description: string;
    listOfChoices: number[];
}

export interface FlickpickArray {
    Flickpicks: Flickpick[];
}