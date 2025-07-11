<template>
	<Modal klass="m-setup" :active="active" :closeable="false">
		<span class="app-version">{{ appVersion }}</span>
		<Constrain size="xs">
			<transition name="slide-fade" mode="out-in">
				<div class="m-setup__card" v-if="currentCard === 'intro'" key="intro">
					<div class="logo">
						<svg
							width="300"
							height="306"
							viewBox="0 0 300 306"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M0 78L144 150V306L0 234V78Z" fill="currentColor" />
							<path
								d="M6 75.0007L150 147.001L144 150L0 78L6 75.0007Z"
								fill="currentColor"
							/>
							<path
								d="M144 150L150 147.001L150 303.001L144 306V150Z"
								fill="currentColor"
							/>
							<path
								d="M150 3.00005L294 75.0001V231L150 159V3.00005Z"
								fill="currentColor"
							/>
							<path
								d="M156 0L300 72L294 75.0001L150 3.00005L156 0Z"
								fill="currentColor"
							/>
							<path
								d="M294 75.0001L300 72L300 228L294 231V75.0001Z"
								fill="currentColor"
							/>
							<path
								d="M78.0001 38.9998L222 111V267L78.0001 195V38.9998Z"
								fill="currentColor"
							/>
							<path
								d="M84.0001 36.0002L228 108L222 111L78.0001 38.9998L84.0001 36.0002Z"
								fill="currentColor"
							/>
							<path
								d="M222 111L228 108L228 264L222 267V111Z"
								fill="currentColor"
							/>
						</svg>
					</div>

					<h2>Welcome to Tune</h2>
					<p>Let's get your Tune instance set up.</p>
					<div class="text-center">
						<button
							type="button"
							class="btn btn-fancy"
							@click="onNext('connection')"
						>
							Get started
						</button>
					</div>
				</div>
				<div
					class="m-setup__card"
					v-else-if="currentCard === 'connection'"
					key="connection"
				>
					<h2 v-if="!connectionStats">Check connection with your backend</h2>
					<div class="text-center">
						<button
							v-if="!connectionStats"
							type="button"
							class="btn btn-fancy"
							@click="checkConnection"
						>
							<span v-if="checking" class="c-spinner"></span>
							Check
						</button>

						<div class="error" v-if="error">
							<p>{{ error }}</p>
							<template
								v-if="error === 'No response received from the server.'"
							>
								<p>This likely means:</p>
								<ul>
									<li>There's a CORS issue</li>
									<li>The server is down</li>
									<li>The server doesn't exist</li>
								</ul>
							</template>
							<template v-if="error === 'Invalid server instance'">
								<p>
									This means you won't be able to the server instance because
									their env variable SELFHOSTED is false or not set.
								</p>
							</template>
							<p>Connection request was made for {{ apiUrl }}</p>
						</div>
					</div>
					<template v-if="connectionStats">
						<p>You can successfully connect to your server!</p>
						<p>
							Your server has {{ connectionStats.ram }} ram and
							{{ connectionStats.availableDiskSpace }} available disk space.
						</p>
						<table border="1">
							<thead>
								<tr>
									<th>Service</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(service, i) in connectionStats.services" :key="i">
									<td>{{ service.name }}</td>
									<td>
										<span>
											{{ service.value }}
										</span>
									</td>
									<td>
										<svg
											v-if="service.status === 'inactive'"
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
											color="var(--color-danger)"
										>
											<path
												fill-rule="evenodd"
												clip-rule="evenodd"
												d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM9.70711 8.29289C9.31658 7.90237 8.68342 7.90237 8.29289 8.29289C7.90237 8.68342 7.90237 9.31658 8.29289 9.70711L10.5858 12L8.29289 14.2929C7.90237 14.6834 7.90237 15.3166 8.29289 15.7071C8.68342 16.0976 9.31658 16.0976 9.70711 15.7071L12 13.4142L14.2929 15.7071C14.6834 16.0976 15.3166 16.0976 15.7071 15.7071C16.0976 15.3166 16.0976 14.6834 15.7071 14.2929L13.4142 12L15.7071 9.70711C16.0976 9.31658 16.0976 8.68342 15.7071 8.29289C15.3166 7.90237 14.6834 7.90237 14.2929 8.29289L12 10.5858L9.70711 8.29289Z"
												fill="currentColor"
											/>
										</svg>
										<svg
											v-if="service.status === 'active'"
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
											color="var(--color-success)"
										>
											<path
												fill-rule="evenodd"
												clip-rule="evenodd"
												d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM15.774 10.1333C16.1237 9.70582 16.0607 9.0758 15.6332 8.72607C15.2058 8.37635 14.5758 8.43935 14.226 8.86679L10.4258 13.5116L9.20711 12.2929C8.81658 11.9024 8.18342 11.9024 7.79289 12.2929C7.40237 12.6834 7.40237 13.3166 7.79289 13.7071L9.79289 15.7071C9.99267 15.9069 10.2676 16.0129 10.5498 15.9988C10.832 15.9847 11.095 15.8519 11.274 15.6333L15.774 10.1333Z"
												fill="currentColor"
											/>
										</svg>

										<small v-if="service.info">({{ service.info }})</small>
									</td>
								</tr>
							</tbody>
						</table>
						<p>Let's create your account.</p>
						<div class="text-center">
							<button
								type="button"
								class="btn btn-fancy"
								@click="onNext('setup')"
							>
								Create account
							</button>
						</div>
					</template>
				</div>
				<div
					class="m-setup__card"
					v-else-if="currentCard === 'setup'"
					key="setup"
				>
					<h2>Create your account</h2>
					<FormSetup></FormSetup>
				</div>
			</transition>
		</Constrain>
	</Modal>
</template>

<script>
import Constrain from "@tune/components/ui/constrain.vue";
import Modal from "@tune/components/ui/modal.vue";
import FormSetup from "@tune/components/form/form-setup.vue";
import InputCode from "@tune/components/form/input-code.vue";

export default {
	components: {
		Constrain,
		Modal,
		FormSetup,
		InputCode,
	},

	data: function () {
		return {
			currentCard: "intro",
			code: "",

			checking: false,

			connectionStats: null,

			error: "",
		};
	},

	props: {
		active: {
			type: Boolean,
			default: false,
		},
	},

	computed: {
		appVersion: function () {
			return __APP_VERSION__;
		},
		apiUrl: function () {
			return this.$store.app.baseApiUrl;
		},
	},

	methods: {
		onResetPasswordRequest: function () {},
		onNext: function (cardName) {
			this.currentCard = cardName;
		},

		async checkConnection() {
			this.checking = true;
			try {
				const connection = await this.$store.app.checkConnection();

				if (connection) {
					this.connectionStats = connection;
				}
				this.error = "";
			} catch (err) {
				console.log(err);

				this.error = err.message || "something went wrong";
			}

			this.checking = false;
		},
	},

	mounted: function () {
		// resolve currentTab here

		let route = this.$route;

		if (route.query && "login" in route.query) {
			this.currentTab = "login";
		} else {
		}

		if (this.active) {
			setTimeout(() => {
				const firstInput = document.querySelector("input");

				if (firstInput) {
					firstInput.focus();
				}
			}, 100);
		}
	},
};
</script>

<style lang="scss">
.m-setup {
	.vfm__content {
		--x-0: 13%;
		--c-0: hsla(227.64705882352914, 3%, 9%, 0.79);
		--y-0: 82%;
		background-color: hsla(219.70588235294136, 3%, 12%, 1);
		background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 3000 3000' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E"),
			radial-gradient(
				circle at var(--x-0) var(--y-0),
				var(--c-0) var(--s-start-0),
				transparent var(--s-end-0)
			);
		animation: hero-gradient-animation 5000ms ease-in-out infinite alternate;
		background-blend-mode: overlay, normal;

		box-shadow:
			rgb(255, 255, 255) 0px 0px 0px 0px,
			rgba(0, 0, 0, 0) 0px 0px 0px 2px,
			rgba(0, 0, 0, 0.5) 0px 0px 0px 0.5px,
			rgba(0, 0, 0, 0.22) 0px 1px 1px -1px,
			rgba(0, 0, 0, 0.22) 0px 2px 2px -1px,
			rgba(255, 255, 255, 0.11) 0px 0.5px 0px 0px inset,
			rgba(255, 255, 255, 0.21) 0px 0px 1px 0px inset,
			rgba(0, 0, 0, 0.16) 0px -6px 12px -4px inset;

		width: 500px;
		min-height: 640px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	/*
  Enter and leave animations can use different
  durations and timing functions.
*/
	.slide-fade-enter-active,
	.slide-fade-leave-active {
		transition: all 300ms linear;
	}

	.slide-fade-enter-from,
	.slide-fade-leave-to {
		transform: translateY(-8px);
		opacity: 0;
	}

	.app-version {
		position: absolute;
		right: 1rem;
		bottom: 1rem;
		font-family: var(--font-family-monospace);
		font-size: var(--font-size-sm);
		opacity: 0.9;
	}

	.logo {
		text-align: center;

		svg {
			width: 48px;
			height: 48px;
			display: inline-block;
			margin-bottom: 1rem;
		}
	}

	.c-constrain {
		//height: 100%;

		&__inner {
		}
	}

	&__card {
		width: 100%;

		h2,
		p {
			text-align: center;
		}
	}

	.c-form {
		width: 300px;
		//background-color: rgba(0, 0, 0, 0.1);
		//backdrop-filter: blur(4px);
		//padding: var(--spacer);
		//border-radius: 30px;
	}

	.form-control {
		background-color: rgba(0, 0, 0, 0.35);
	}

	.error {
		margin: 1rem 0;
		padding: var(--margin-lg);
		background-color: hsla(var(--hue-red), 0%, 16%, 0.75);
		backdrop-filter: blur(4px);
		border-radius: var(--border-radius);
		text-align: left;
		font-size: var(--font-size-sm);
		font-weight: 500;
		color: var(--color-warning);

		h2,
		p {
			text-align: left;
		}

		p {
			&:last-of-type {
				margin-bottom: 0;
			}
		}
	}

	@media screen and (max-height: 800px) {
		.vfm__content {
			min-height: 88vh;
		}
	}

	@media screen and (max-width: 576px) {
		padding: 0;

		.vfm__content {
			width: 100vw;
			height: 100vh;
			border-radius: 0;
		}
		.form-control {
			min-height: 44px;
			font-size: var(--font-size);
		}
		.btn {
			height: 44px;
		}
	}
}
</style>
