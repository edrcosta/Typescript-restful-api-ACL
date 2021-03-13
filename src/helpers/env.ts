import { iEnv } from '../interfaces'

export class ENV {
  static initialize = (): iEnv => require('../../env.json')
}
