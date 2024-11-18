// HMACGenerator.js
const crypto = require("crypto");

class HMACGenerator {
  static generateKey() {
    return crypto.randomBytes(32).toString("hex");
  }

  static generateHMAC(key, value) {
    const hmac = crypto.createHmac("sha256", key);
    hmac.update(value);
    return hmac.digest("hex");
  }
}

module.exports = HMACGenerator;
