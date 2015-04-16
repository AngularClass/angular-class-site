
class AuthController {
  constructor(Auth){
    this.name = 'Auth';
    this.credits = {};
    this.Auth = Auth;
  }

  login() {
    this.Auth.login(this.credits);
  }
}

AuthController.$inject = ['Auth'];

export {AuthController};
