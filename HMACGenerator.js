const crypto = require("crypto");

class HMACGenerator {
  static generateKey() {
    return crypto.randomBytes(32).toString("hex");
  }

  static generateHMAC(key, message) {
    return crypto.createHmac("sha3-256", key).update(message).digest("hex");
  }
}

module.exports = HMACGenerator;
