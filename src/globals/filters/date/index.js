function date(d) {
  return new Date(d).toLocaleString();
}

function datetime(t) {
  return new Date(+t * 1000).toLocaleString();
}

function dateOnly(d) {
  return new Date(d).toLocaleDateString();
}

function timeOnly(d) {
  return new Date(d).toLocaleTimeString();
}

export { date, datetime, dateOnly, timeOnly };
