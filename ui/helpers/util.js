import { browserHistory } from 'react-router'

export const pathTo = (path) => () => {
  browserHistory.push(path)
}

// export const pipeState = (s, name, value) => ({
//   value,
//   onChange (e) {
//     let value = e.target.value
//     s.setState({
//       [name]: value
//     })
//   }
// })
