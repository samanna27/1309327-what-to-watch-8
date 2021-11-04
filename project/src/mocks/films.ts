import { nanoid } from '@reduxjs/toolkit';
import { Film } from '../types/film';

const filmsMock: Film = {
  id: nanoid(),
  poster: 'img/the-grand-budapest-hotel-poster.jpg',
  preview: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm',
  title: 'The Grand Budapest Hotel',
  bigPoster: 'img/bg-the-grand-budapest-hotel.jpg',
  genre: 'Drama',
  releaseDate: 2014,
  videoSrc: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm',
  director: 'Wes Anderson',
  actors: 'Bill Murray, Edward Norton, Jude Law, Willem Dafoe',
  duration: '1h 39m',
  addedToWatchList: true,
  overview: {
    description: 'In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes).\
      Zero, a junior lobby boy, becomes Gustave`s friend and protege.\
      \n\nGustave prides himself on providing first-className service to the hotel`s guests, \
      including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave`s lovers dies mysteriously, Gustave finds himself the recipient\
       of a priceless painting and the chief suspect in her murder.',
    rating: 8.9,
    ratingDescr: 'Very good',
    votes: 240,
  },
  reviews: [{
    text: 'Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director\'s funniest and most exquisitely designed films in years.',
    rate: 8.9,
    userName: 'Kate Muir',
    reviewDate: 'December 24, 2016',
  }, {
    text: 'Anderson\'s films are too precious for some, but for those of us willing to lose ourselves in them, they\'re a delight. "The Grand Budapest Hotel" is no different, except that he has added a hint of gravitas to the mix, improving the recipe.',
    rate: 8.0,
    userName: 'Bill Goodykoontz',
    reviewDate: 'November 18, 2015',
  }, {
    text: 'I didn\'t find it amusing, and while I can appreciate the creativity, it\'s an hour and 40 minutes I wish I could take back.',
    rate: 8.0,
    userName: 'Amanda Greever',
    reviewDate: 'November 18, 2015',
  }],
};

export const films = new Array(20).fill('').map((index) => {
  index={...filmsMock};
  filmsMock.id=nanoid();

  return index;
});
