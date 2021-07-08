const uncaughtErrorMessage = 'Sorry, something went wrong during the request. There may be a connection issue or the server may be down. Please try again later.'

const MOBILE_WINDOW_SIZE = 767;
const ESC_KEYCODE = 27;

const TOP_TWO = 2;
const ZERO_ITEMS = 0;
const THREE_ITEMS = 3;

function displayDate(date) {
  const dateObj = new Date(date);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return dateObj.toLocaleString('en-US', options);
}

function convertDate() {
  const date = new Date();
  // expected example output: current date without 1. day of the week or time
  const to = date.toISOString().slice(0, 10);
  // calculate a date 7 days ago then return a string
  const from = date.toJSON(date.setDate(date.getDate() - 7)).slice(0, 10);
  return { to, from };
}

export {
  uncaughtErrorMessage,
  MOBILE_WINDOW_SIZE,
  ESC_KEYCODE,
  TOP_TWO,
  ZERO_ITEMS,
  THREE_ITEMS,
  displayDate,
  convertDate,
};
