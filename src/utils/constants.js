const uncaughtErrorMessage = "Sorry, something went wrong during the request. There may be a connection issue or the server may be down. Please try again later."

function displayDate(date) {
  const dateObj = new Date(date);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return dateObj.toLocaleString("en-US", options);
}

function convertDate() {
  let date = new Date();
  // expected example output: current date without 1. day of the week or time
  let to = date.toISOString().slice(0, 10);
  // calculate a date 7 days ago then return a string
  let from = date.toJSON(date.setDate(date.getDate() - 7)).slice(0, 10);
  return { to, from };
}

export {
  uncaughtErrorMessage, displayDate, convertDate
};