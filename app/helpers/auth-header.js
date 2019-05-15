export default function authHeader() {
  // return authorization header with jwt token
  const user = JSON.parse(localStorage.getItem('user'));

  // if (user && user.token) {
  //     return { 'Authorization': 'Bearer ' + user.userToken };
  // } else {
  //     return {};
  // }
  if (user && user.apiUser && user.apiPassword) {
    return {
      apiUser: user.apiUser,
      apiPassword: user.apiPassword
    };
  }
  return {};
}
