import { iEnv } from '../interfaces'
import * as fs from 'fs'

export class ENV {
  static initialize = (): iEnv => {
    if(fs.existsSync('../../env.json')){
      return require('../../env.json')  
    }
    return require('../../env-sample.json')
  }
}
