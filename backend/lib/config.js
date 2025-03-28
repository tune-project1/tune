/**
 * Self hosted is determined to be true by default
 * Unless SELF_HOSTED="false" is set in env
 */
function resolveSelfHosted() {
	if (process.env.SELFHOSTED && process.env.SELFHOSTED === "false") {
		return false;
	}

	return true;
}

function resolveRemoveEventsAfter() {
	let duration = 120; // remove events after 120 days

	if (
		process.env.REMOVE_EVENTS_AFTER &&
		!isNaN(process.env.REMOVE_EVENTS_AFTER)
	) {
		duration = process.env.REMOVE_EVENTS_AFTER;
	}

	return duration;
}

function resolveRemoveTestEventsAfter() {
	let duration = 7; // remove test events after 7 days

	if (
		process.env.REMOVE_TEST_EVENTS_AFTER &&
		!isNaN(process.env.REMOVE_TEST_EVENTS_AFTER)
	) {
		duration = process.env.REMOVE_TEST_EVENTS_AFTER;
	}

	return duration;
}

function resolveCors() {
	let url = "http://localhost:8080";

	if (process.env.APP_URL) {
		url = process.env.APP_URL;
	}

	if (process.env.CORS) {
		url = process.env.CORS;
	}

	return url;
}

const config = {
	env: process.env.NODE_ENV || "development",
	PORT: process.env.PORT || 2000,
	HOST: "0.0.0.0",
	SECRET: process.env.SECRET,

	DATABASE_URL: process.env.DATABASE_URL,
	CLICKHOUSE_URL: process.env.CLICKHOUSE_URL,

	EVENT_STORE: process.env.EVENT_STORE || "mysql",

	SELFHOSTED: resolveSelfHosted(),

	REMOVE_EVENTS_AFTER: resolveRemoveEventsAfter(),
	REMOVE_TEST_EVENTS_AFTER: resolveRemoveTestEventsAfter(),

	SERVICE_URL: process.env.SERVICE_URL || null,

	API_URL: process.env.API_URL || "http://localhost:2000",
	APP_URL: process.env.APP_URL || "http://localhost:8080",

	CORS: resolveCors(),

	baseUrl:
		process.env.NODE_ENV === "production"
			? process.env.API_URL
			: "http://localhost:2000",

	appUrl:
		process.env.NODE_ENV === "production"
			? process.env.APP_URL
			: "http://localhost:8080",

	sessionLength: 3, // in days

	events: {
		take: 40,
	},

	users: {
		take: 10,
	},

	resend: {
		TOKEN: process.env.RESEND,
	},

	tune: {
		TOKEN: process.env.OPERATIONAL,
		BASEURL: process.env.OPERATIONAL_BASEURL,
	},

	email: {
		FROM: process.env.ADMIN_EMAIL,
	},

	stripe: {
		TEST_KEY: process.env.STRIPE_TEST_KEY,
		TEST_SECRET: process.env.STRIPE_TEST_SECRET,

		LIVE_KEY: process.env.STRIPE_LIVE_KEY,
		LIVE_SECRET: process.env.STRIPE_LIVE_SECRET,
	},

	vapid: {
		EMAIL: process.env.VAPID_EMAIL,
		PUBLIC_KEY: process.env.VAPID_PUBLIC_KEY,
		PRIVATE_KEY: process.env.VAPID_PRIVATE_KEY,
	},

	cloudflare: {
		BUCKET: ``,
		ACCESS_KEY_ID: "",
		SECRET_ACCESS_KEY: "",
		ACCOUNT_ID: "",
	},

	prices: {
		eventScales: [
			{
				rate: 0.001,
				period: [0, 10000],
			},
			{
				rate: 0.0005,
				period: [10001, 100000],
			},
			{
				rate: 0.00025,
				period: [100001, 1000000],
			},
		],
	},
};

export default config;
