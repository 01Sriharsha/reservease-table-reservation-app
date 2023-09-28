export function describeRating(rating: number) {
  if (rating === 5) return "awesome";
  else if (rating === 4) return "nice";
  else if (rating === 3) return "good";
  else if (rating === 2) return "not bad";
  else if (rating === 1) return "bad";
  else return;
}
