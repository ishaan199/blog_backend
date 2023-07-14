
const checkUrl = (url) => {
    let urls = /(https?:\/\/(?:www\.)?[\w+-_.0-9@\/]+logo.(?:png|jpg|jpeg))/i;
    return url.test(url);
};

const checkMobile = (number) => {
  const mobileRegex = /^[5-9]{1}[0-9]{9}$/;
  return mobileRegex.test(number);
};

const checkName = (value) => {
  const regex = /^[a-zA-Z]+([\s][a-zA-Z]+)*$/;
  return regex.test(value);
};

const checkEmail = (email) => {
  const emailRegex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
  return emailRegex.test(email);
};

const checkPassword = (pass) => {
    let password = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;
    return password.test(pass);
};

module.exports = {checkUrl, checkMobile, checkName, checkEmail, checkPassword};