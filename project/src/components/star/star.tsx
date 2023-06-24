type StarProp = {
  star: number;
  setRating: React.Dispatch<React.SetStateAction<number>>;
  disabled: boolean;
}

const Star = ({star, setRating, disabled}: StarProp) => (
  <>
    <input
      onChange={(e) => setRating(Number(e.target.value))}
      className="rating__input" id={`star-${star}`}
      type="radio"
      name="rating"
      value={star}
      disabled={disabled}
    />
    <label className="rating__label" htmlFor={`star-${star}`}>Rating {star}</label>
  </>
);

export default Star;
