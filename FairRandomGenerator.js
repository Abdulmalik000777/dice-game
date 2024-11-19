const crypto = require("crypto");

class FairRandomGenerator {
  static generateRandomValue(range) {
    const key = crypto.randomBytes(16).toString("hex");
    const value = Math.floor(Math.random() * range);
    const hmac = crypto
      .createHmac("sha256", key)
      .update(value.toString())
      .digest("hex");
    return { value, key, hmac };
  }
}

module.exports = FairRandomGenerator;
