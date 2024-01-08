import en from "./en.json";
import LocalizedStrings from "react-localization";

export let localLang = JSON.parse(localStorage.getItem("lang"))
  ? JSON.parse(localStorage.getItem("lang"))
  : "en";

let strings;

if (!strings) {
  strings = new LocalizedStrings({
    en,
  });
}

strings.setLanguage(localLang);

export default strings;
