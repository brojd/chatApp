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
  
  setUserDetails(id, name, lastName, fullName, positionId) {
    localStorage.setItem('userId', id);
    localStorage.setItem('firstName', name);
    localStorage.setItem('lastName', lastName);
    localStorage.setItem('fullName', fullName);
    localStorage.setItem('positionId', positionId);
  }
  
  removeUserDetails() {
    localStorage.removeItem('userId');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('fullName');
  }
  
  getUserName() {
    return localStorage.getItem('firstName');
  }
  
  getUserId() {
    return localStorage.getItem('userId');
  }
  
  getPositionId() {
    return localStorage.getItem('positionId');
  }

}
