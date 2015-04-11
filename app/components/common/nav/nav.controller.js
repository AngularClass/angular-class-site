class NavController {
  constructor(Auth, $state){
    this.Auth = Auth;
    this.$state = $state;
  }

  logOut(){
    this.Auth.logOut();
  }

  isState(state){
    return this.$state.is(state);
  }
}

NavController.$inject = ['Auth', '$state'];

export {NavController};
