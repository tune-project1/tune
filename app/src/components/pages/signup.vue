<template>
  <div class="p-signup">
    <Constrain>
      <article>
        <h1>Tune</h1>
        <p>Panacea for your tune issues</p>
      </article>
      <FormSignup></FormSignup>
      <div>
        <p>Have an account?<router-link to="/login"> Log in now</router-link></p>
      </div>
    </Constrain>
  </div>
</template>

<script>
import Constrain from "@tune/components/ui/constrain.vue";
import Modal from "@tune/components/ui/modal.vue";
import FormSignup from "@tune/components/form/form-signup.vue";

export default {
  components: {
    Constrain,
    Modal,
    FormSignup,
  },

  beforeRouteEnter: async function (to, from, next) {
    next((vm) => {
      vm.$store.activity.refresh();
    });
  },
};
</script>

<style lang="scss">
.p-signup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--color-bg-2);
  display: flex;
  align-items: center;
  justify-content: center;

  article {
    text-align: center;
  }

  h1 {
    font-family: "PP Editorial New";
    font-weight: 500;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    background-color: linear-gradient(180deg, #fff 45%, rgba(255, 255, 255, 0.6));
    background-image: linear-gradient(180deg, #fff 45%, rgba(255, 255, 255, 0.6));
  }
}
</style>
