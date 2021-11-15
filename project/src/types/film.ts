export type FilmOverview = {
  description: string;
  rating: number;
  ratingDescr: string;
  votes: number;
}

export type FilmReview = {
  text?: string;
  rate?: number;
  userName: string;
  reviewDate: string;
}

export type Film = {
  id: string;
  poster: string;
  preview: string;
  previewImage: string;
  title: string;
  bigPoster: string;
  genre: string;
  releaseDate: number;
  videoSrc: string;
  director: string;
  actors: string;
  duration: string;
  addedToWatchList: boolean;
  overview: FilmOverview;
  reviews: FilmReview[];
};

export type ReviewStarRating = readonly boolean[];
export type Genre = string;
