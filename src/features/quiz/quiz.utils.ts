export const QUIZ_PLAYS_BONUS = 114;

export const getDisplayQuizPlays = (
  apiPlays: number | null | undefined,
  bonus: number = QUIZ_PLAYS_BONUS
): number => {
  const safeApiPlays = typeof apiPlays === "number" ? apiPlays : 0;
  const safeBonus = typeof bonus === "number" ? bonus : 0;
  return Math.max(0, safeApiPlays + safeBonus);
};
