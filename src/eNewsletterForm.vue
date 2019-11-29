<template>
  <form
  id="app"
>
  <p v-if="errors.length">
    <b>Please correct the following error(s):</b>
    <ul>
      <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
    </ul>
  </p>

  <p>
    <label for="first_name">Vorname</label>
    <input
      id="first_name"
      v-model="form.first_name"
      type="text"
      name="first_name"
    >
  </p>

   <p>
    <label for="last_name">Nachname</label>
    <input
      id="last_name"
      v-model="form.last_name"
      type="text"
      name="last_name"
    >
  </p>
   <p>
    <label for="email">Deine E-Mail Adresse</label>
    <input
      id="email"
      v-model="form.email"
      type="email"
      name="email"
    >
  </p>
  <p>
    <button
      @click="checkForm"
    >Jetzt Abonieren</button>
  </p>

</form>
</template>

<script>

export default {
  name: "eNewsletterForm",
  data() {
    return {
      form: {
        first_name: null,
        last_name: null,
        email: null
      },
      loading: "false",
      response: null,
      errors: []
    };
  },
  computed: {
    order() {
      return this.$store.state.order;
    }
  },
  methods: {
    checkForm(e) {
      this.errors = [];

      console.log("send")
      if (this.form.first_name && this.form.last_name && this.form.email) {
              console.log("yes")

      const self = this;
      fetch(this.$eNewsletterFormOptons.url, {method: 'post', data: this.form})
        .then((response) => res.json())
        .then(function(response) {
          console.log("response");
          console.log(response);
          self.response = response;
        })
        .catch(function(error) {
          console.log(error);
          self.errors.push('Error.', error);
        })
      } else {
        // form error handling
        if (!this.form.first_name) {
          this.errors.push('Name required.');
        }
        if (!this.form.last_name) {
          this.errors.push('Nachname required.');
        }
        if (!this.form.email) {
          this.errors.push('Email required.');
        }
      }


    
      e.preventDefault();
    }
  }
};
</script>