import random from 'lodash/random'
import * as Constants from './constants'

const getRandomItemFromArray = (array) => {
  return array[random(array.length - 1)]
}

export const randomColor = () => {
  return getRandomItemFromArray(Constants.APP_COLORS);
}

export const randomAnimal = () => {
  return getRandomItemFromArray(Constants.APP_ANIMALS);
}

export const colorsArrayToString = (colors, alpha = 1) => {
  return `rgba(${colors[0]},${colors[1]},${colors[2]},${alpha})`
}

