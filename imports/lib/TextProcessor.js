import StringSimilarity from 'string-similarity'

export default class TextProcessor {
  constructor() {}

  static compareTwoStrings(string1, string2) {
    return StringSimilarity.compareTwoStrings(string1, string2)
  }
}