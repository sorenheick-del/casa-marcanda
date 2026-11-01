import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import { createReadStream } from "node:fs";
import SftpClient from "ssh2-sftp-client";

function required(name) {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

const expectedFingerprint = required("SFTP_HOST_FINGERPRINT");
if (!expectedFingerprint.startsWith("SHA256:")) {
  throw new Error("SFTP_HOST_FINGERPRINT must be a SHA256 fingerprint.");
}

const client = new SftpClient();
await client.connect({
  host: required("SFTP_HOST"),
  port: 22,
  username: required("SFTP_USERNAME"),
  password: required("SFTP_PASSWORD"),
  hostHash: "sha256",
  hostVerifier: (hostKeyHash) =>
    `SHA256:${Buffer.from(hostKeyHash, "hex").toString("base64").replace(/=+$/, "")}` ===
    expectedFingerprint,
});

async function uploadDirectory(localDirectory, remoteDirectory) {
  await client.mkdir(remoteDirectory, true);

  for (const entry of await readdir(localDirectory, { withFileTypes: true })) {
    const localPath = path.join(localDirectory, entry.name);
    const remotePath = path.posix.join(remoteDirectory, entry.name);

    if (entry.isDirectory()) {
      await uploadDirectory(localPath, remotePath);
    } else if (entry.isFile()) {
      await client.put(createReadStream(localPath), remotePath);
    }
  }
}

try {
  for (const entry of [".nojekyll", "index.html"]) {
    const localPath = path.resolve(entry);
    if (!(await stat(localPath)).isFile()) {
      throw new Error(`Expected website file not found: ${entry}`);
    }
    await client.put(createReadStream(localPath), path.posix.join("/", entry));
  }

  for (const directory of ["assets", "da", "de", "it"]) {
    await uploadDirectory(path.resolve(directory), path.posix.join("/", directory));
  }
} finally {
  await client.end();
}
