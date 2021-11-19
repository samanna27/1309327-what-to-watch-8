export type FilmOverview = {
  description: string;
  rating: number;
  ratingDescr: string;
  votes: number;
}

export type FilmReview = {
  id: number
  rating?: number;
  comment?: string;
  user: {
    id: number;
    name: string;
  }
  date: string;
}

export type Film = {
  id: number;
  poster: string;
  preview: string;
  previewImage: string;
  title: string;
  bigPoster: string;
  genre: string;
  releaseDate: number;
  videoSrc: string;
  previewVideoLink: string,
  director: string;
  actors: string[];
  duration: string;
  addedToWatchList: boolean;
  overview: FilmOverview;
  reviews: FilmReview[];
};

export type ReviewStarRating = readonly boolean[];
export type Genre = string;
