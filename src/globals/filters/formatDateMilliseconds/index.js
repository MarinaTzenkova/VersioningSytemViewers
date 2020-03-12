function formatDateMilliseconds(milliseconds) {
  var days, hours, minutes, seconds, total_hours, total_minutes, total_seconds;

  // total_seconds = parseInt(Math.floor(milliseconds / 1000));
  total_seconds = parseInt(milliseconds);
  total_minutes = parseInt(Math.floor(milliseconds / 60));
  total_hours = parseInt(Math.floor(total_minutes / 60));
  days = parseInt(Math.floor(total_hours / 24));

  seconds = parseInt(total_seconds % 60);
  minutes = parseInt(total_minutes % 60);
  hours = parseInt(total_hours % 24);

  return days + "d:" + hours + "h:" + minutes + "m:" + seconds + "s";
}

export default formatDateMilliseconds;
