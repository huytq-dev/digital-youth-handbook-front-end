export const getFakeQuizPlays = (
  quizId: string,
  min: number = 100,
  max: number = 200
): number => {
  const safeMin = Math.min(min, max);
  const safeMax = Math.max(min, max);
  const range = safeMax - safeMin + 1;

  const seed = quizId && quizId.length > 0 ? quizId : "unknown-quiz";
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) | 0;
  }

  const normalized = Math.abs(hash) % range;
  return safeMin + normalized;
};
