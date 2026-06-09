"use strict";

const http = require("http");
const https = require("https");

class BarkNotifier {
  constructor(options = {}) {
    this.server = (options.server || "https://api.day.app").replace(/\/+$/, "");
    this.deviceKey = options.deviceKey || "";
    this.httpRequest = options.httpRequest || null;
  }

  isEnabled() {
    return !!(this.server && this.deviceKey);
  }

  send(title, body, actionUrl) {
    if (!this.isEnabled()) return Promise.resolve(false);

    const payload = {
      title,
      body,
      device_key: this.deviceKey,
      group: "little-bell",
      icon: "https://raw.githubusercontent.com/Jackychen-12/little-bell/main/assets/tray-icon.png",
    };
    if (actionUrl) {
      payload.url = actionUrl;
    }

    const postData = JSON.stringify(payload);
    const url = new URL(`${this.server}/push`);
    const isHttps = url.protocol === "https:";
    const mod = isHttps ? https : http;

    return new Promise((resolve) => {
      const req = (this.httpRequest || mod.request)(
        {
          hostname: url.hostname,
          port: url.port || (isHttps ? 443 : 80),
          path: url.pathname,
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Content-Length": Buffer.byteLength(postData),
          },
          timeout: 5000,
        },
        (res) => {
          let data = "";
          res.on("data", (chunk) => { data += chunk; });
          res.on("end", () => resolve(res.statusCode === 200));
        }
      );
      req.on("error", () => resolve(false));
      req.on("timeout", () => { req.destroy(); resolve(false); });
      req.write(postData);
      req.end();
    });
  }
}

class WebhookNotifier {
  constructor(options = {}) {
    this.url = options.url || "";
    this.method = (options.method || "POST").toUpperCase();
    this.headers = options.headers || { "Content-Type": "application/json" };
    this.bodyTemplate = options.bodyTemplate || "";
    this.httpRequest = options.httpRequest || null;
  }

  isEnabled() {
    return !!this.url;
  }

  send(title, body) {
    if (!this.isEnabled()) return Promise.resolve(false);

    let postData;
    if (this.bodyTemplate) {
      postData = this.bodyTemplate
        .replace(/\{\{title\}\}/g, title)
        .replace(/\{\{body\}\}/g, body);
    } else {
      postData = JSON.stringify({ title, body, source: "little-bell" });
    }

    const url = new URL(this.url);
    const isHttps = url.protocol === "https:";
    const mod = isHttps ? https : http;

    return new Promise((resolve) => {
      const req = (this.httpRequest || mod.request)(
        {
          hostname: url.hostname,
          port: url.port || (isHttps ? 443 : 80),
          path: url.pathname + url.search,
          method: this.method,
          headers: {
            ...this.headers,
            "Content-Length": Buffer.byteLength(postData),
          },
          timeout: 5000,
        },
        (res) => {
          res.resume();
          res.on("end", () => resolve(res.statusCode >= 200 && res.statusCode < 300));
        }
      );
      req.on("error", () => resolve(false));
      req.on("timeout", () => { req.destroy(); resolve(false); });
      req.write(postData);
      req.end();
    });
  }
}

function buildPermissionTitle(permEntry) {
  const tool = permEntry.toolName || "unknown";
  return `${tool}`;
}

function buildPermissionBody(permEntry) {
  const input = permEntry.toolInput || {};
  if (permEntry.toolName === "Bash") {
    return input.command || JSON.stringify(input).slice(0, 200);
  }
  if (permEntry.toolName === "Edit" || permEntry.toolName === "Write") {
    return input.file_path || JSON.stringify(input).slice(0, 200);
  }
  if (permEntry.toolName === "Read") {
    return input.file_path || "";
  }
  return JSON.stringify(input).slice(0, 200);
}

module.exports = { BarkNotifier, WebhookNotifier, buildPermissionTitle, buildPermissionBody };
