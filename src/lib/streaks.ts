export function getStreaks(datesCompleted: Record<string, boolean>) {
  const completedDays = Object.entries(datesCompleted)
    .filter((date) => date[1] == true)
    .map((date) => date[0])
    .sort();

  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;

  // logic for longest streak

  let prevDate = null;

  for (let i = 0; i < completedDays.length; i++) {
    const date = completedDays[i];
    const curr = new Date(date);

    if (prevDate) {
      const diff = dateDifference(prevDate, curr);
      if (diff === 1) {
        tempStreak++;
      } else {
        longestStreak = Math.max(tempStreak, longestStreak);
        tempStreak = 1;
      }
    } else {
      tempStreak++;
    }

    prevDate = curr;
  }

  longestStreak = Math.max(longestStreak, tempStreak);

  //current streak
  const daysSet = new Set(completedDays);
  const curr = new Date();
  for (let i = 0; i < 365; i++) {
    const d = new Date();
    d.setDate(curr.getDate() - i);
    const key = d.toISOString().split("T")[0];
    if (daysSet.has(key)) {
      currentStreak += 1;
    } else {
      break;
    }
  }

  return { currentStreak, longestStreak };
}

function dateDifference(d1: Date, d2: Date) {
  const ms = d2.getTime() - d1.getTime();
  return Math.round(ms / (1000 * 60 * 60 * 24));
}
