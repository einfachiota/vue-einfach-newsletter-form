import eNewsletterFormComponent from "./eNewsletterForm.vue";
import eNewsletterFormModule from './eNewsletterForm.module.js'

export default {
  install(Vue, options) {

    if (!options.url) options.url = 'http://localhost:6000'

    Vue.prototype.$eNewsletterFormOptons = options

    // Let's register our component globally
    // https://vuejs.org/v2/guide/components-registration.html
    Vue.component("e-newsletter", eNewsletterFormComponent);
    options.store.registerModule('eNewsletterForm', eNewsletterFormModule)
  }
}