<p align="center">
  <a href="https://tune">
    <img src="media/tune-banner.jpg" width="340px" alt="Tune Event tracker" />
  </a>
</p>

<p align="center">
    <a href="https://tune" target="_blank">Website</a> |
    <a href="https://tune/api" target="_blank">Docs</a> |
    <a href="https://tune/selfhosted/introduction" target="_blank">Self-hosting</a> |
    <a href="https://tune/pitch" target="_blank">Pitch</a> |
    <a href="https://tune/vision" target="_blank">Vision</a>
    <br /><br />
</p>

Tune is a open-source Event tracking tool. Monitor signups, webhooks, cronjobs and more. Tune is a Open source alternative to Logsnag, another Event tracking tool in the same category.

![Tune Event tracker](media/tune-screenshot.png)

### Why use Tune?

- Get push notifications for critical events straight to your phone, or on the webapp
- Monitor critical events
- Trigger webhooks via action buttons
- Understand complex events via contexts(events-in-events)
- Usable on mobile as a progressive web app(can receive push notifications on mobile too)
- Built for tech businesses

## How to use Tune?

Right now there are two ways to use Tune

- Join the waitlist on [Discord](https://discord.gg/QmfGeMGM)
- Self-host [Tune](https://tune/selfhosted)

### Highlights

- Very few 3rd party dependencies. No need to install clickhouse in the open source version.
- Feature packed. Send json, formatted json, bundle up logs in contexts, add action buttons, and more.
- Easy to grok and tear apart - no useless dependencies, nor unnecessarily complex code.

## Structure

This is a monorepo of 3 repos:

- /app the spa for tune
- /backend the expressjs api powering the backend
- /website astrojs marketing website

And the /packages folder has public npm packages which are shared across all repos.

### Community

We have a active Discord community.
<a href="https://discord.gg/QmfGeMGM" target="_blank">Discord</a>
