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
  
  setUserDetails(nickname, avatarUrl) {
    localStorage.setItem('nickname', nickname);
    localStorage.setItem('avatarUrl', avatarUrl);
  }
  
  getUserDetails() {
    let result = {
      nickname: localStorage.getItem('nickname'),
      avatarUrl: localStorage.getItem('avatarUrl')
    };
    return result;
  }
  
  removeUserDetails() {
    localStorage.removeItem('nickname');
    localStorage.removeItem('avatarUrl');
  }

}
