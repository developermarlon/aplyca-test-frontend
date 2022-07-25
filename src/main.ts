import { createApp, Directive } from 'vue'
import { navbarStore, keyNavbarStore } from './stores/vuex/navbar'
import { userStore, keyUserStore } from './stores/vuex/user'
import App from './App.vue'
import router from './router'

import './style.css'
import './assets/styles/template.scss'
import './assets/styles/buttons.scss'
import './assets/styles/generalConfig.scss'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUsers, faPlus, faXmark, faChevronRight, faChevronLeft, faHouseChimney, faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { toucheableTable, scrollTable } from "./directives"

library.add(faUsers, faPlus, faXmark, faChevronRight, faChevronLeft, faHouseChimney, faRightToBracket);

createApp(App)
  .use(navbarStore, keyNavbarStore)
  .use(userStore, keyUserStore)
  .use(router)
  .component("font-awesome-icon", FontAwesomeIcon)
  .directive("toucheabletable", toucheableTable as Directive<HTMLElement,string>)
  .directive("scrolltable", scrollTable as Directive<HTMLElement,string>)
  .mount('#app')
