export function sortGenerator(sortBy, order) {
  if ( order === 'ascending') {
    return (a, b) =>
      a[sortBy] > b[sortBy] ? 1 :
      a[sortBy] === b[sortBy] ? 0 : -1
  }
  else {
    return (a, b) =>
    a[sortBy] < b[sortBy] ? 1 :
    a[sortBy] === b[sortBy] ? 0 : -1
  }
}
