export default interface Media {
    id: number;
    title: string;
    mediaTitle: string;
    mediaId: number;
    year: number;
    genre: number[];
    rating: number;
    vote_average: number;
    cover: string;
    embedKey: string;
    poster_path: string;
    userRating: number;
}