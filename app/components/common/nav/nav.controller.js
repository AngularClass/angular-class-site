class NavController {
  constructor(){
    this.routes = [
      'blog',
      'about'
    ];

    console.log(this.routes);
  }
}

NavController.$inject = [];

export {NavController}
