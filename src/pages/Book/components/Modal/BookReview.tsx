import { IBookReview } from 'src/shared/interfaces';

export default function BookReview({ review }: { review: IBookReview }) {
  return <div>{review.user}</div>;
}
