export function getCurrentQuarterAndYear() {
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();

  let quarter: number;
  if (month >= 0 && month <= 2) {
    quarter = 1;
  } else if (month >= 3 && month <= 5) {
    quarter = 2;
  } else if (month >= 6 && month <= 8) {
    quarter = 3;
  } else {
    quarter = 4;
  }

  return { quarter, year };
}

export function getNextQuarter() {
  const { quarter, year } = getCurrentQuarterAndYear();

  if (quarter === 4) {
    return { quarter: 1, year: year + 1 };
  } else {
    return { quarter: quarter + 1, year };
  }
}
