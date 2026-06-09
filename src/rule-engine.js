"use strict";

function matchPattern(pattern, key) {
  if (!pattern || !key) return false;
  const escaped = pattern.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
  return new RegExp(`^${escaped}$`, "i").test(key);
}

function buildPatternKey(toolName, toolInput) {
  if (!toolName) return "";
  if (!toolInput || typeof toolInput !== "object") return toolName;
  if (toolName === "Bash") {
    return `Bash:${toolInput.command || ""}`;
  }
  if (toolName === "Edit" || toolName === "Write" || toolName === "Read") {
    return `${toolName}:${toolInput.file_path || ""}`;
  }
  return toolName;
}

class RuleEngine {
  constructor(rules = {}) {
    this.autoAllow = Array.isArray(rules.auto_allow) ? rules.auto_allow : [];
    this.autoDeny = Array.isArray(rules.auto_deny) ? rules.auto_deny : [];
  }

  evaluate(toolName, toolInput) {
    const key = buildPatternKey(toolName, toolInput);
    if (!key) return null;

    for (const pattern of this.autoDeny) {
      if (matchPattern(pattern, key)) return "deny";
    }
    for (const pattern of this.autoAllow) {
      if (matchPattern(pattern, key)) return "allow";
    }
    return null;
  }
}

module.exports = { RuleEngine, buildPatternKey, matchPattern };
