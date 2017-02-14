function handleError(res, err) {
  console.error('handleError', err)
  res.sendStatus(500)
}

export default handleError
