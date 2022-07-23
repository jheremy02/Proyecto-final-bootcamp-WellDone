export function decodeToken(token) {
  let decodedToken;

  try {
      decodedToken= JSON.parse(atob(token.split('.')[1]))
  } catch (error) {
      return null
  }

  return decodedToken

}
