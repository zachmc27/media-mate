export default interface CollabList {
    name: string;
    userOneId: number;
    userTwoId: number;  
    flickPickListId: number[];
    matches: number[];
    mediaDetails: CollabMediaDetails[];
}

interface CollabMediaDetails {
    id: number,
    title: string,
    year: number,
    genre_ids: number[],
    vote_average: number,
    poster_path: string,
    trailerKey: string,
    popularity: number,
    overview: string;
}