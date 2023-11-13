import StarRating from 'react-star-ratings';
import { Rating } from '../../../models/rating';

type Props = {
  ratings: Rating[];
};

const Ratings = ({ ratings }: Props) => {
  if (!ratings) {
    return null;
  }
  let ratingsCount = ratings.length;

  const ratingsSum = ratings.reduce((acc, rating) => acc + rating.star, 0);
  let highestPossible = ratingsCount * 5;
  let result = (ratingsSum * 5) / highestPossible;

  return (
    <div className="text-center pt-1 pb-3">
      <span>
        <StarRating
          starDimension="20px"
          starSpacing="2px"
          starRatedColor="red"
          rating={result}
        />
        ({ratings.length})
      </span>
    </div>
  );
};

export default Ratings;
