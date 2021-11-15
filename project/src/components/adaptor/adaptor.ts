import { FilmReview } from '../../types/film';

const defineFilmRating = (rating: number) => {
  switch (true) {
    case ( rating >= 0 && rating < 3):
      return 'Bad';
    case  (rating >= 3 && rating < 5):
      return 'Normal';
    case  (rating >= 5 && rating < 8):
      return 'Good';
    case  (rating >= 8 && rating < 10):
      return 'Very good';
    case  (rating === 10 ):
      return 'Awesome';
  }
};

const transferMinutesToDurationString = (minutes: number) => {
  const hours = minutes / 60;
  const min = minutes % 60;

  return `${hours}h ${min}m`;
};

export const adaptToClient = (film: any) => {
  const adaptedFilm = Object.assign(
    {},
    film,
    {
      poster: film['poster_image'],
      preview: film['preview_video_link'],
      previewImage: film['preview_image'],
      title: film.name,
      bigPoster: film['background_image'],
      releaseDate: film['released'],
      videoSrc: film['video_link'],
      actors: film['starring'],
      duration: transferMinutesToDurationString(film['run_time']),
      addedToWatchList: film['is_favorite'],
      overview: {
        description: film['description'],
        rating: film['rating'],
        ratingDescr: defineFilmRating(film['rating']),
        votes: film['scores_count'],
      },
    },
  );

  delete adaptedFilm['poster_image'];
  delete adaptedFilm['preview_video_link'];
  delete adaptedFilm['preview_image'];
  delete adaptedFilm['name'];
  delete adaptedFilm['background_image'];
  delete adaptedFilm['released'];
  delete adaptedFilm['video_link'];
  delete adaptedFilm['starring'];
  delete adaptedFilm['run_time'];
  delete adaptedFilm['is_favorite'];
  delete adaptedFilm['description'];
  delete adaptedFilm['rating'];
  delete adaptedFilm['is_favorite'];
  delete adaptedFilm['scores_count'];
  delete adaptedFilm['background_color'];

  return adaptedFilm;
};

export const adaptToServer = (comment: FilmReview) => {
  const adaptedComment = Object.assign(
    {},
    comment,
    {
      'rating': comment.rate,
      'comment': comment.text,
    },
  );

  delete adaptedComment.text;
  delete adaptedComment.rate;

  return adaptedComment;
};
