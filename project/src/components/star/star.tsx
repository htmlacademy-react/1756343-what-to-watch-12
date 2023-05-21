type StarProp = {
  star: number;
  setRating: React.Dispatch<React.SetStateAction<number>>;
}

const Star = ({star, setRating}: StarProp) => (
  <>
    <input onChange={(e) => setRating(Number(e.target.value))} className="rating__input" id={`star-${star}`} type="radio" name="rating" value={star} />
    <label className="rating__label" htmlFor={`star-${star}`}>Rating {star}</label>
  </>
);

export default Star;
