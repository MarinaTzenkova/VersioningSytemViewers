function formatDateString() {
  var curdate = new Date();
  var currentdate = curdate.toString();
  var datestring = currentdate.split("GMT");
  var datefinal = datestring[0].split(" ");
  var time = datefinal[4].split(":");
  var datetostore =
    datefinal[3] +
    "/" +
    MonthToNumber(datefinal[1]) +
    "/" +
    datefinal[2] +
    " " +
    time[0] +
    ":" +
    time[1];

  function MonthToNumber(month) {
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    for (var i = 0; i < months.length; i++) {
      if (month == months[i]) return i + 1;
    }
    return null;
  }
  return datetostore;
}

export default formatDateString;
