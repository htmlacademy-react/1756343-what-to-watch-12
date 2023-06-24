type GenresListProp = {
  genres: string[];
  activeGenre: string;
  changeGenre: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
}


const GenresList = ({genres, activeGenre, changeGenre}: GenresListProp) => (
  <ul className="catalog__genres-list">
    {genres.map((genre, i) => (
      i < 10 ? (
        <li
          className={`catalog__genres-item ${activeGenre === genre ? 'catalog__genres-item--active' : ''}`}
          key={genre}
          onClick={(e) => changeGenre(e)}
        >
          <a href="/" className="catalog__genres-link">{genre}</a>
        </li>
      ) :
        null
    ))}
  </ul>
);

export default GenresList;
