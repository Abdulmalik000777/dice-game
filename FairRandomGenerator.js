const crypto = require("crypto");
const HMACGenerator = require("./HMACGenerator");

class FairRandomGenerator {
  static generateRandomValue(range) {
    const value = crypto.randomInt(range);
    const key = HMACGenerator.generateKey();
    const hmac = HMACGenerator.generateHMAC(key, value.toString());
    return { value, key, hmac };
  }
}

module.exports = FairRandomGenerator;