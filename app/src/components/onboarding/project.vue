<template>
  <div class="c-onboarding-project">
    <Constrain size="sm">
      <article>
        <h3>Setup your project</h3>
        <p>In Tune, all your events, billing and user accounts belongs to a project.</p>

        <p>Let's setup your first project:</p>
        {{ projectName }}
        <FormProjectname @onSubmit="onSubmit" :projectName="suggestion"></FormProjectname>
        <!-- <button class="btn btn-primary" @click="$emit('onNext')">Next</button> -->
      </article>
    </Constrain>
  </div>
</template>

<script>
import Constrain from "@tune/components/ui/constrain.vue";
import FormProjectname from "@tune/components/form/form-projectname.vue";
export default {
  components: {
    Constrain,
    FormProjectname,
  },

  data: function () {
    return {
      placeholder: "Project name",
      projectName: "",
    };
  },

  computed: {
    user: function () {
      return this.$store.user.resource;
    },
    suggestion: function () {
      if (!this.user) {
        return "";
      }

      return `${this.user.firstName}'s project`;
    },
    apikey: function () {
      return "ops_123123123";
    },
  },

  methods: {
    onSubmit: function () {
      this.$store.app.sendNotification(`Project created!`);
      this.$emit("onNext");
    },
  },
};
</script>

<style lang="scss">
.c-onboarding-project {
}
</style>
