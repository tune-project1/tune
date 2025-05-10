import config from "#lib/config.js";
import axios from "axios";

async function check(email) {
  const timeout = 3000;
  const form = {
    email,
  };
  const url = `${config.SERVICE_URL}/api/v1/check`;
  try {
    const response = await Promise.race([
      axios.post(url, form),
      new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), timeout)),
    ]);
    return response.data;
  } catch (error) {
    if (error.message === "Timeout") {
      return { allow: true }; // Timeout occurred
    }
    // allow
    return { allow: true };
  }
}

async function accessCheck(email) {
  try {
    return await check(email);
  } catch (err) {
    return false;
  }
}

export default accessCheck;
