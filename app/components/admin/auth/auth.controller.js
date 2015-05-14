
class AuthController {
  constructor(Auth, $mdToast){
    this.name = 'Auth';
    this.credits = {};
    this.Auth = Auth;
    this.$mdToast = $mdToast;
  }

  login() {
    this.Auth.login(this.credits)
    .catch(e =>{
      this.credits = {};
      this.$mdToast.show(
        this.$mdToast.simple()
          .content(e.message || e.data)
          .position('bottom right')
          .hideDelay(3000)
      );
    });
  }

  showForgatPassword(){

    this.Auth.forgotPassword()
  }
}

AuthController.$inject = ['Auth', '$mdToast'];

export {AuthController};
