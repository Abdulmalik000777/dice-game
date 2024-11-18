// FairRandomGenerator.js
const crypto = require("crypto");

class FairRandomGenerator {
  static generateRandomValue(range) {
    return crypto.randomInt(range);
  }

  static generateKey() {
    return crypto.randomBytes(32).toString("hex");
  }

  static generateHMAC(key, value) {
    const hmac = crypto.createHmac("sha256", key);
    hmac.update(value);
    return hmac.digest("hex");
  }
}

module.exports = FairRandomGenerator;
