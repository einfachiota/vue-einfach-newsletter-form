<template>
  <form
  id="app"
  @submit="checkForm"
>
  <p v-if="errors.length">
    <b>Please correct the following error(s):</b>
    <ul>
      <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
    </ul>
  </p>

  <p>
    <input
      type="submit"
      value="Submit"
    >
  </p>

</form>
</template>

<script>
import axios from "axios";
export default {
  name: "eNewsletterForm",
  data() {
    return {
      form: null,
      loading: "false",
      response: null
    };
  },
  computed: {
    order() {
      return this.$store.state.order;
    }
  },
  methods: {
    checkForm() {
      const self = this;
      axios
        .post(this.$eNewsletterFormOptons.url, this.form)
        .then(function(response) {
          console.log("response");
          console.log(response);
          self.response = response;
        })
        .catch(function(error) {
          console.log("CLG");
          console.log(error);
          self.data.status = "error";
        });
    }
  },
  sockets: {
    connect() {
      console.log("socket connected");
    },
    payments(payment) {
      console.log("payments", payment);
      if (payment.status === "paymentArrived") {
        this.state = "transaction_incoming";
      } else if (payment.status === "paymentSuccess") {
        console.log("emit payment");
        this.$emit("paymentSuccess", payment);
      }
    },
    disconnect() {
      console.log("socket disconnect");
    }
  }
};
</script>