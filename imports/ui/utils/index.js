import random from 'lodash/random'
import * as Constants from './constants'

export const getRandomColor = () => {
  return Constants.BASE_COLORS[random(Constants.BASE_COLORS.length - 1)]
}
