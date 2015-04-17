  function Auth($http, $window, $state, $mdToast, Urls) {
    return {
      isLoggedIn: isLogginIn,
      login: login,
      logOut: logOut
    };

    function logOut(){
      $window.localStorage.removeItem('act');
      $state.go('home');
    }

    function isLogginIn(){
      return !!$window.localStorage.getItem('act');
    }

    function login(credits) {
      if (!credits.password || !credits.email ) {
        return;
      }

      return $http.post(`${Urls.author}/login`, credits)
        .then(function(resp){
          $window.localStorage.setItem('act', resp.data.token);
          $state.go('admin.posts');
        });
    }
  }

  function AuthInterceptor ($window, $location, $q){
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($window.localStorage.getItem('act')) {
          config.headers.Authorization = 'Bearer ' + $window.localStorage.getItem('act');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {

          $location.path('/login');
          // remove any stale tokens
          $window.localStorage.removeItem('act');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  }

  Auth.$inject = ['$http', '$window', '$state', '$mdToast', 'Urls'];
  AuthInterceptor.$inject = ['$window', '$location', '$q'];

  export {Auth, AuthInterceptor};
