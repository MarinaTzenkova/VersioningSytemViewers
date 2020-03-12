import Vue from "vue";

import confluence from "./confluence";
import formatDateMilliseconds from "./formatDateMilliseconds";
import { date, datetime, dateOnly, timeOnly } from "./date";

Vue.filter("confluence", confluence);
Vue.filter("formatDateMilliseconds", formatDateMilliseconds);
Vue.filter("date", date);
Vue.filter("datetime", datetime);
Vue.filter("dateOnly", dateOnly);
Vue.filter("timeOnly", timeOnly);
