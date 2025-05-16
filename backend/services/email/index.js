import config from "#lib/config.js";
import { Eta } from "eta";
import path from "path";
import mjml2html from "mjml";
import { Resend } from "resend";
import prisma from "#lib/prisma.js";
import fs from "fs";
import moment from "moment";
import { customAlphabet } from "nanoid";
import nodemailer from "nodemailer";

const alphabet = "abcdefghijklmnopqrstuvwxyz"; // Your custom letters
const generateId = customAlphabet(alphabet, 4); // Generate 4-character IDs

const __dirname = path.resolve("");

const eta = new Eta({
  tags: ["{{", "}}"],
  views: path.join(__dirname, "./services/email/templates"),
});

class Email {
  from = config.email.FROM;
  devGroup = config.email.devGroup || [];
  managementGroup = config.email.managementGroup || [];
  email = null;
  resend = null;
  transporter = null;

  async setup() {
    // setup via resend directly
    if (config.resend.TOKEN && config.email.FROM) {
      const resend = new Resend(config.resend.TOKEN);

      this.resend = resend;
      console.log("sending email via resend");

      // or if available, setup via smtp
    } else if (config.email.SMTP_HOST) {
      let opts = {
        host: config.email.SMTP_HOST,
        port: config.email.SMTP_PORT || 587,
        secure: config.email.SMTP_PORT === 465 ? true : false, // true for port 465, false for other ports
      };
      if (config.email.SMTP_USERNAME) {
        let auth = {
          user: config.email.SMTP_USERNAME,
          pass: config.email.SMTP_PASSWORD || "",
        };
        opts.auth = auth;
      }
      this.transporter = nodemailer.createTransport(opts);
      console.log("sending email via smtp");
    } else {
      console.log("saving email to file");
    }

    return true;
  }

  async test() {
    let value = "file";
    let info = "";

    if (config.resend.TOKEN && config.email.FROM) {
      value = "resend";
    }
    if (config.resend.TOKEN && !config.email.FROM) {
      value = "file";
      info = "FROM env var needs to be set to receive emails from RESEND";
    }
    if (!config.resend.TOKEN) {
      value = "file";
      info = "Resend setup not found. Emails will be written as text files inside /backend/private";
    }

    return {
      name: "email",
      value: value,
      status: "active",
      info: info,
    };
  }

  async sendTest(email) {
    const html = `Email body`;

    await this.send({
      subject: `Test email`,
      to: email,
      html: html,
      text: "test",
    });
  }

  async saveEmailToFile(payload) {
    try {
      // Destructure payload
      const { subject, text } = payload;

      const tempId = generateId();

      // Generate the folder and file path
      const folderPath = path.join(__dirname, "/private/emails");
      const dateTime = moment().format("DD-MM-YYYY-HH-mm");
      const slugifiedSubject = subject
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      const fileName = `${dateTime}-${tempId}-${slugifiedSubject || "no-subject"}.txt`;
      const filePath = path.join(folderPath, fileName);

      // Ensure the folder exists
      await fs.promises.mkdir(folderPath, { recursive: true });

      // Write the email content to the file
      const emailContent = `Subject: ${subject}\n\n${text}`;
      await fs.promises.writeFile(filePath, emailContent, "utf8");

      console.log(`Email saved to file: ${filePath}`);
    } catch (error) {
      console.error("Error saving email to file:", error.message);
    }
  }

  async send(obj) {
    let from = this.from;

    let to = obj.to;

    if (typeof to !== "string") {
      to = to[0];
    }

    let payload = {
      to: to,
      from: from, // Use the email address or domain you verified above
      subject: obj.subject || "NO SUBJECT",
      text: obj.text || "",
      html: obj.html || "",
      attachments: obj.attachments || [],
    };

    if (config.env !== "production") {
      payload.subject = `[TEST] ${payload.subject}`;
    }

    let response = null;

    if (this.resend) {
      try {
        response = await this.resend.emails.send(payload);

        delete payload.attachments;
        delete payload.html;

        let str = JSON.stringify(payload);

        //console.log(str);
      } catch (err) {
        console.log(err);

        throw err;
      }
    } else if (this.transporter) {
      try {
        const info = await this.transporter.sendMail({
          from: `Tune <${payload.from}>`, // sender address
          to: payload.to,
          subject: payload.subject,
          text: payload.text,
          html: payload.html,
        });

        response = info;
      } catch (err) {
        console.log(err);
        throw err;
      }
    } else {
      this.saveEmailToFile(payload);
      response = true;
    }

    return response;
  }

  async renderHtml(htmlPath, fields, htmlOnly = false) {
    let mjml = await eta.render(htmlPath, fields);

    if (htmlOnly) {
      return mjml;
    }

    let mjmlObject = mjml2html(mjml);

    return mjmlObject.html;
  }

  async userWelcome(user) {
    const context = {
      ...config,
    };
    let fields = {
      user,
      context,
    };

    let html = await this.renderHtml("user-welcome.mjml", fields);

    await this.send({
      subject: `Welcome to Tune, ${user.firstName}`,
      to: user.email,
      html: html,
      text: "test",
    });
  }

  async sendActivationEmail(user, workspace, code) {
    let subject = `Tune - Activate your account`;

    let baseUrl = config.appUrl;

    let link = `${baseUrl}/?code=${code}`;
    let limit = workspace.freeEvents || 10000;

    let text = `
      Hi ${user.firstName},

      Thank you for signing up for Tune!

      Click this link to verify your email:
      ${link}

      Regards
      Shash
    `;

    return await this.send({
      subject,
      to: user.email,
      text,
    });
  }

  async onResetPasswordRequest(user) {
    let subject = `Tune - Your password reset request`;

    let baseUrl = config.appUrl;

    let link = `${baseUrl}/?resetpasswordtoken=${user.resetPasswordToken}`;

    let text = `
      Hi ${user.firstName},

      We received a reset password request from you.

      Click this link to reset your password.
      ${link}

      Regards
      Shash
    `;

    return await this.send({
      subject,
      to: user.email,
      text,
    });
  }

  async onNewWorkspace(userId, workspace) {
    let subject = `Tune - New project created`;

    let user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    let baseUrl = config.appUrl;

    let text = `
      Hi ${user.firstName},

      Your project "${workspace.name}" has been created!

      Regards
      Shash
    `;

    return await this.send({
      subject,
      to: user.email,
      text,
    });
  }

  async onWorkspaceHold(workspace, reason) {
    if (!workspace.adminId) {
      console.log(`No adminId for workspace ${workspace.name}`);
      return;
    }
    let subject = `Tune - Your project has been put on hold`;

    let user = await prisma.user.findUnique({
      where: {
        id: workspace.adminId,
      },
    });

    let baseUrl = config.appUrl;

    let text = `
      Hi ${user.firstName},

      We noticed your project "${workspace.name}" has reached the free event limit, and as a result, it's currently on hold.

      To continue tracking events without interruption, you can update your billing details here:
      app.tune/settings/billing

      If you have any questions or need assistance, feel free to reach out at shash@tune

      Regards
      Shash
    `;

    return await this.send({
      subject,
      to: user.email,
      text,
    });
  }

  async onWorkspaceDeactivated(workspace) {
    if (!workspace.adminId) {
      console.log(`No adminId for workspace ${workspace.name}`);
      return;
    }
    let subject = `Tune - Your project has been deactivated`;

    let user = await prisma.user.findUnique({
      where: {
        id: workspace.adminId,
      },
    });

    let baseUrl = config.appUrl;

    let text = `
      Hi ${user.firstName},

      It looks like your project has exceeded the free event limit, and no billing details have been added yet. As a result, your project is currently inactive, and new events aren’t being tracked.

      To continue using Tune, you can update your billing details here: app.tune/settings/billing.

      If you have any questions or need any help, feel free to reach out at shash@tune.

      Best,
      Shash
    `;

    return await this.send({
      subject,
      to: user.email,
      text,
    });
  }

  async onWorkspaceInformEvents(workspace) {
    if (!workspace.adminId) {
      console.log(`No adminId for workspace ${workspace.name}`);
      return;
    }
    let subject = `Tune - Your project has been deactivated`;

    let user = await prisma.user.findUnique({
      where: {
        id: workspace.adminId,
      },
    });

    let baseUrl = config.appUrl;

    let text = `
      Hi ${user.firstName},

      Let me help you setup your project on Tune.

      1. To get the best out of Tune, use the Nodejs SDK.

      2. If you're builing a SaaS, map out all your events in a central file.

      3. Keep your Api key safe in a .env file.

      Let me know if you have any questions. I'm here to help you integrate Tune in your product.

      Best,
      Shash
    `;

    return await this.send({
      subject,
      to: user.email,
      text,
    });
  }

  async sendNagEmail(workspace, nagPercentage) {
    let user = await prisma.user.findUnique({
      where: {
        id: workspace.adminId,
      },
    });

    let text = `
Hi ${user.firstName},

Just a quick heads-up—your project "${workspace.name}" has now used ${nagPercentage}% of its free event limit.

Once you reach the full limit, new events won’t be tracked unless billing details are added. To keep things running smoothly, you can enter your card details here: app.tune/settings/billing.

Let me know if you have any questions — I’m happy to help!

Cheers
Shash
    `;

    let subject = `Tune - Your project need billing details`;

    if (nagPercentage > 94) {
      subject = `Tune - Your free event limit is ${nagPercentage} used`;
    }

    return await this.send({
      subject,
      to: user.email,
      text,
    });
  }

  async inviteUser(user, adminUser, link) {
    let text = `
Hi ${user.firstName},

You have been invited into ${adminUser.firstName}'s project at Tune

To accept this invite, click on this link and create your account:
${link}

This invitation will automatically expire in 7 days.

Cheers
Shash
    `;

    let subject = `Tune - You are invited to join a project`;

    return await this.send({
      subject,
      to: user.email,
      text,
    });
  }
}

export default new Email();
