const AUTH_KEY = 'auth_token';

export class StorageService {
  getAuthToken() {
    return localStorage.getItem(AUTH_KEY);
  }

  setAuthToken(token) {
    localStorage.setItem(AUTH_KEY, token);
  }

  removeAuthToken() {
    localStorage.removeItem(AUTH_KEY);
  }
  
  setUserDetails(nickname) {
    localStorage.setItem('nickname', nickname);
  }
  
  getUserDetails() {
    let result = {
      nickname: localStorage.getItem('nickname')
    };
    return result;
  }
  
  removeUserDetails() {
    localStorage.removeItem('nickname');
  }

}
