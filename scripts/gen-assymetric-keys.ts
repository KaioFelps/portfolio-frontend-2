#!/usr/bin/env -S node --experimental-strip-types --no-warnings
import { generateKeyPairSync } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const JWT_PUBLIC_KEY = "JWT_PUBLIC_KEY";
const JWT_PRIVATE_KEY = "JWT_PRIVATE_KEY";

type Keys = Record<string, string> & {
  privateKey: string;
  publicKey: string;
};

function main() {
  const envFile = getEnvFile(".env");
  const { privateKey, publicKey } = encodeKeysToBase64(getKeys());

  let environmentVars = getEnvVariables(envFile);
  environmentVars = upsertEnvVar(environmentVars, JWT_PUBLIC_KEY, publicKey);
  environmentVars = upsertEnvVar(environmentVars, JWT_PRIVATE_KEY, privateKey);

  saveEnvironmentVariables(envFile, environmentVars);
}

function getKeys(): Keys {
  const { privateKey, publicKey } = generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: "spki",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs8",
      format: "pem",
    },
  });

  return { privateKey, publicKey };
}

function encodeKeysToBase64(keys: Keys): Keys {
  return {
    privateKey: encodeKeyToBase64(keys.privateKey),
    publicKey: encodeKeyToBase64(keys.publicKey),
  };
}

function getEnvVariables(path: string) {
  return existsSync(path) ? readFileSync(path, "utf8") : "";
}

function upsertEnvVar(content: string, key: string, value: string): string {
  const pattern = new RegExp(`^${key}=.*$`, "m");
  const line = `${key}="${value}"`;

  if (pattern.test(content)) {
    return content.replace(pattern, line);
  }

  return content.endsWith("\n") ? content + line : `${content}\n${line}`;
}

function saveEnvironmentVariables(path: string, environmentVariables: string) {
  writeFileSync(path, environmentVariables);
}

function encodeKeyToBase64(key: string): string {
  return Buffer.from(
    key
      .replace(/-----(BEGIN|END) (RSA )?(PRIVATE|PUBLIC) KEY-----/g, "")
      .replace(/\r?\n|\r/g, "")
      .trim(),
  ).toString("base64");
}

function getEnvFile(file: string): string {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  return join(__dirname, "..", file);
}

main();
