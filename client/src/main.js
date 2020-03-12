import Vue from "vue";
import VueRouter from "vue-router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faUserAltSlash,
  faShapes,
  faMicrophone,
  faMicrophoneSlash,
  faVideo,
  faVideoSlash,
  faCog
} from "@fortawesome/free-solid-svg-icons";

import App from "./App.vue";

import "./assets/styles/index.css";

Vue.config.productionTip = false;

library.add(faUserAltSlash);
library.add(faShapes);
library.add(faMicrophone);
library.add(faMicrophoneSlash);
library.add(faVideo);
library.add(faVideoSlash);
library.add(faCog);
Vue.component("fa-icon", FontAwesomeIcon);

Vue.use(VueRouter);
const router = new VueRouter({ routes: [] });

new Vue({
  render: h => h(App),
  router
}).$mount("#app");
