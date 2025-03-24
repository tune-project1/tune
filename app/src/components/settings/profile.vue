<template>
	<section class="c-settings-profile">
		<DemoWrap>
			<FormUser></FormUser>
		</DemoWrap>
		<hr />
		<button
			class="btn btn-danger"
			type="button"
			@click.prevent="$store.user.logout()"
		>
			Logout
		</button>
	</section>
</template>

<script>
import FormSettings from "@tune/components/form/form-settings.vue";
import FormUser from "@tune/components/form/form-user.vue";
import FormPassword from "@tune/components/form/form-password.vue";
import FormEmail from "@tune/components/form/form-email.vue";
import Permission from "@/components/app/permission.vue";
import Code from "@tune/components/code/index.vue";

import DemoWrap from "@/components/app/demo-wrap.vue";

export default {
	components: {
		FormUser,
		DemoWrap,
	},

	computed: {
		isDemo: function () {
			return this.$store.workspace.isDemo;
		},
		workspace: function () {
			return this.$store.workspace.resource;
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
	},
};
</script>

<style lang="scss">
.c-settings-profile {
}
</style>
