import Cookies from "js-cookie";
import ejs from "ejs";
import testTemplate from "./test.html" with { type: "text" };

// cookie key to ignore the "local storage full" popup dialog
const SKIP_WARNING_DIALOG_KEY = "bbb_ignore_storage";

function shouldSkipDialog() {
  const x = Cookies.get(SKIP_WARNING_DIALOG_KEY);
  return x !== undefined;
}

function setSkipDialog(x: boolean) {
  if (x) {
    // ignore the cookie for this session only
    Cookies.set(SKIP_WARNING_DIALOG_KEY, "1");
  } else {
    Cookies.remove(SKIP_WARNING_DIALOG_KEY);
  }
}

const DOMAINS = [
  { url: "http://danbooru.donmai.us/", untrusted: false },
  { url: "https://danbooru.donmai.us/", untrusted: false },
  { url: "http://donmai.us/", untrusted: false },
  { url: "https://donmai.us/", untrusted: true },
  { url: "http://sonohara.donmai.us/", untrusted: false },
  { url: "https://sonohara.donmai.us/", untrusted: true },
  { url: "http://hijiribe.donmai.us/", untrusted: false },
  { url: "https://hijiribe.donmai.us/", untrusted: true },
  { url: "http://safebooru.donmai.us/", untrusted: false },
  { url: "https://safebooru.donmai.us/", untrusted: false },
  { url: "http://testbooru.donmai.us/", untrusted: false },
];

// console.log(shouldSkipDialog());
// console.log(setSkipDialog(false));


let people = ['geddy', 'neil', 'alex'];
let html = ejs.render(testTemplate, {people: people});
console.log(html);


throw new Error("apple");
// return {};
