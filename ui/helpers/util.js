import { browserHistory } from 'react-router'

export const pathTo = (path) => () => {
  browserHistory.push(path)
}

export const objectURLFrom = (sentences) => {
  let texts = sentences.map(s => s.translated + '\n\n')
  let blob = new Blob(texts, {type: 'text/plain'})
  let objectURL = window.URL.createObjectURL(blob)
  return objectURL
}

/* global Blob */
