function handleError(res, err) {
  console.error(err)
  res.sendStatus(500)
}

export default handleError
