import React from 'react'

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

export function glyphy(order) {
  if ( order === 'ascending') {
    return <span className="glyphicon glyphicon-arrow-up"></span>
  }
  else {
    return <span className="glyphicon glyphicon-arrow-down"></span>
  }
}