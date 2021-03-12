export class ENV {
  static initialize() {
    const env = require('../../env.json')

    process.env.SERVER_PORT = env.SERVER_PORT || 3000
  }
}
