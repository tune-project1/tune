# Tune - Open-Source Event Tracking Tool

[Tune](https://tunedocuments.info) is a powerful, open-source platform designed for tracking and managing events. Monitor user signups, webhooks, cron jobs, and a variety of other activities with ease and flexibility.

## 🌟 Core Features

- **Instant Notifications**: Receive real-time push notifications for critical events directly on your phone or through the web application.
- **Event Monitoring**: Keep track of important events with a robust and intuitive interface.
- **Webhook Triggers**: Activate webhooks effortlessly using customizable action buttons.
- **Nested Contexts**: Understand complex workflows through events-in-events for deeper insights.
- **Mobile-Friendly**: Use Tune as a progressive web app (PWA) with full support for mobile push notifications.
- **Tech Product Focus**: Built specifically to meet the needs of modern tech-driven products.

---

## 📖 Getting Started

Dive into our comprehensive [documentation](https://tune/docs/start-here) to explore setup guides, usage instructions, and advanced configurations. Whether you're a beginner or an experienced developer, our docs make onboarding seamless.

---

## 🚀 Why Choose Tune?

- **Flexible Self-Hosting**: Deploy Tune with ease using options like Render.com, Docker, or other platforms, supported by step-by-step video tutorials.
- **Minimal Dependencies**: The open-source version requires no complex third-party integrations, such as ClickHouse, keeping your setup lightweight.
- **Feature-Rich**: Send JSON or formatted JSON, bundle logs into contexts, create action buttons, and more—all designed for power and simplicity.
- **Developer-Friendly**: Clean, modular code with no unnecessary dependencies, making it easy to understand, customize, or extend.

---

## 🔧 Technology Stack

Tune is built with a streamlined and modern tech stack to ensure performance and maintainability:

- **Node.js**: Version 18 or higher
- **MySQL**: Version 8.x for reliable data storage
- **Prisma ORM**: Simplifies database interactions
- **ClickHouse**: Optional for advanced analytics
- **Express.js**: Version 5.x for a robust backend
- **Vue.js**: Version 3 for a reactive frontend
- **Vite**: Fast and modern build tooling

### Monorepo Structure

Tune is organized as a monorepo with the following components:

- **/app**: The single-page application (SPA) for the Tune interface
- **/backend**: The Express.js-powered backend handling API requests
- **/website**: The Astro.js-based marketing website
- **/packages**: Shared npm packages used across all repositories for code reusability

---


## 🔍 Use Cases

Tune is versatile and can be adapted for various scenarios, including:

- **SaaS Platforms**: Track user signups, subscription events, and API usage.
- **DevOps Monitoring**: Monitor cron jobs, server health, and automated workflows.
- **E-Commerce**: Track order events, payment webhooks, and customer interactions.
- **IoT Applications**: Log and analyze device events in real time.

---

## ⚙️ Advanced Features

- **Custom Dashboards**: Create tailored dashboards to visualize event data.
- **API Integration**: Seamlessly integrate with external APIs for enhanced functionality.
- **Event Batching**: Group related events for efficient processing and analysis.
- **Role-Based Access**: Manage user permissions for secure team collaboration.


---

## 🙌 Acknowledgements

A huge thank you to our contributors, community members, and open-source libraries that make Tune possible. Special shoutout to the [Node.js](https://nodejs.org), [Vue.js](https://vuejs.org), and [Prisma](https://prisma.io) communities for their incredible tools.
