export function _dt(ts) {
  let dt = (typeof ts === 'string') ? new Date(parseInt(ts)) :new Date(ts)
  return dt.toLocaleDateString()
}

