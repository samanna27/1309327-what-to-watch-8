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
      previewVideoLink: film['preview_video_link'],
      actors: film['starring'],
      duration: film['run_time'],
      addedToWatchList: film['is_favorite'],
      overview: {
        description: film.description,
        rating: film['rating'],
        ratingDescr: film['rating'],
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
