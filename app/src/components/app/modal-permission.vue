<template>
  <Modal klass="m-permission" :active="active" @onClose="onClose">
    <button type="button" @click="onClose" class="btn">Close</button>
  </Modal>
</template>

<script>
import Constrain from "@tune/components/ui/constrain.vue";
import Modal from "@tune/components/ui/modal.vue";

export default {
  components: {
    Constrain,
    Modal,
  },

  data: function () {
    return {
      currentTab: "login",
    };
  },

  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    onClose: function () {
      this.$emit("onClose");
    },
  },

  mounted: function () {},
};
</script>

<style lang="scss">
.m-permission {
  .vfm__content {
    padding: var(--spacer-sm);
  }

  h3 {
    width: calc(100% - var(--spacer-lg));
  }
}
</style>
