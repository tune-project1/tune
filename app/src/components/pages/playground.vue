<template>
  <div class="p-playground">
    <Playground type="app" :apikey="apikey"></Playground>
  </div>
</template>

<script>
import Playground from "@tune/components/playground/index.vue";
export default {
  components: {
    Playground,
  },

  computed: {
    baseApiUrl: function () {
      return this.$store.app.baseApiUrl;
    },
    user: function () {
      return this.$store.user.resource;
    },
    workspace: function () {
      return this.$store.workspace.resource;
    },
    baseApiUrl: function () {
      return this.$store.app.baseApiUrl;
    },
    assetPath: function () {
      let baseUrl = this.baseApiUrl;
      return `${baseUrl}/uploads`;
    },
    apikeys: function () {
      if (!this.workspace) {
        return [];
      }

      if (!this.workspace.keys) {
        return [];
      }

      return this.workspace.keys;
    },
    apikey: function () {
      if (this.apikeys) {
        return this.apikeys[0].key;
      }
    },
  },
};
</script>

<style lang="scss">
.p-playground {
}
</style>
