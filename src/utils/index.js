import Cookie from "universal-cookie";
const cookietoken = new Cookie();

export const setToLS = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

export const getFromLS = (key) => {
  const value = window.localStorage.getItem(key);

  if (value) {
    return JSON.parse(value);
  }
};

export const setTokenToCookie = (key, value, config) => {
  cookietoken.set(key, value, config);
};

export const removeTokenFromCookie = (key) => {
  cookietoken.remove(key);
};

export const getTokenFromCookie = () => {
  const token = cookietoken.get("token");
  // console.log(token)

  if (token !== undefined) {
    return token.token;
  }
};

export const isJWTExpired = (key) => {
  const value = window.localStorage.getItem(key);

  if (value) {
    return JSON.parse(value);
  }
};

export const toRibuan = (bilangan, positif = false, currency = null) => {
  if (bilangan === "" || bilangan === undefined || bilangan === null) return "";
  if (positif === true) {
    bilangan = Math.abs(bilangan);
  }
  var reverse = bilangan.toString().split("").reverse().join("");
  var ribuan = reverse.match(/\d{1,3}/g);

  if (bilangan < 0) {
    ribuan = ribuan.join(".").split("").reverse().join("");
    ribuan = currency ? `${currency}. (${ribuan})` : `(${ribuan})`;
  } else {
    ribuan = currency
      ? `${currency}. ${ribuan.join(".").split("").reverse().join("")}`
      : ribuan.join(".").split("").reverse().join("");
  }

  return ribuan;
};

export const cekTgl = (tgl) => {
  const oneDay = 24 * 60 * 60 * 1000;
  const saatini = new Date();
  var tgllahir = new Date(tgl);
  var ageday = Math.round(
    Math.round((saatini.getTime() - tgllahir.getTime()) / oneDay)
  );
  var ageyear = Math.trunc(ageday / 365);

  if (
    new Date(tgl).getFullYear() === saatini.getFullYear() &&
    new Date(tgl).getMonth + 1() < saatini.getMonth() + 2
  ) {
    return true;
  } else {
    return false;
  }
};
