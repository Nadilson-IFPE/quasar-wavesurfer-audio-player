//Vue v2:
//import Vue from "vue";
//export const EventBus = new Vue();

// Vue.js v3 update:
import { default as emitter } from "tiny-emitter/instance";

export default {
  $on: (...args) => emitter.on(...args),
  $once: (...args) => emitter.once(...args),
  $off: (...args) => emitter.off(...args),
  $emit: (...args) => emitter.emit(...args),
};
