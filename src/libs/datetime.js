import moment from "moment";

const dateFomat = (dt) => {
  const today = new Date();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const now = moment(dt);
  const format_month = now.format("M");
  const format_date = now.format("D");

  if (month == Number(format_month) && date == Number(format_date)) {
    return now.format("hh:mm");
  } else {
    return now.format("YYYY.MM.DD.");
  }
};

export default dateFomat;
