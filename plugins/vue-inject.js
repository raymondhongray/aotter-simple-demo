import Vue from 'vue'

Vue.prototype.$simpleTimeFormat = function (createdAt) {
  const date = new Date(createdAt);
  const timePad = (str) => str.toString().length === 1 ? `0${str.toString()}` : str.toString();
  return `${timePad(date.getMonth() + 1)}/${timePad(date.getDate())}/${date.getFullYear()}`;
}
