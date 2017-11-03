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

const componentToHex = (c) => {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

const rgbToHex = (r, g, b) => {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

export const lightenDarkenColor = (initialVal, amt) => {
  let usePound = false;

  const col = rgbToHex(initialVal[0], initialVal[1], initialVal[2]);

  if (col[0] == "#") {
    col      = col.slice(1);
    usePound = true;
  }

  const num = parseInt(col, 16),
        r   = (num >> 16) + amt,
        b   = ((num >> 8) & 0x00FF) + amt,
        g   = (num & 0x0000FF) + amt;

  return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
}