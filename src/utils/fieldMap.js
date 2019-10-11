export default (from, to, rules) => {
  for (let item of rules) {
    if (typeof (item) === 'string') {
      if (item.indexOf(':') !== -1) {
        to[item.split(':')[1]] = from[item.split(':')[0]]
      } else {
        to[item] = from[item]
      }
    } else if (typeof (item) === 'function') {
      item(from, to)
    }
  }
}
