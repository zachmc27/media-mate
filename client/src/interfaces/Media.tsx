export default interface Media {
    id: number;
    title: string;
    name: string;
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
    media: MediaDetails;
    trailerKey: string;
    overview: string;
    cast: string;
}

interface MediaDetails {
    id: number;
    title: string;
    year: number;
    cover: string;  // This matches the 'cover' field from your data
}

