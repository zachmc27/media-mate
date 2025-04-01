class AuthService {
  

  loggedIn() {
    const token = this.getToken();
    return token;
  }

  getToken(): string {
    const loggedUser = localStorage.getItem('id_token') || '';
    return loggedUser;
  }


  login(idToken: string, userId: number) {
    localStorage.setItem('id_token', idToken);
    localStorage.setItem('user_Id', userId.toString());
    window.location.assign('/');
  }


  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('user_Id');
    window.location.assign('/login');
  }

  getUserId () {
    const userId = localStorage.getItem("user_Id");
    return userId ? parseInt(userId, 10) : null;
  }
}

export default new AuthService();
