  function Auth($http, $window, $state, $mdToast, Urls) {
    return {
      isLoggedIn: isLogginIn,
      login: login,
      logOut: logOut,
      forgotPassword: forgotPassword
    };

    function forgotPassword(email){
      return $http.get(`${Urls.author}/forgot?email=${email}`)
        .finally(()=>{
          $mdToast.show(
            $mdToast.simple()
              .content('Link as been emailed to you')
              .position('bottom right')
              .hideDelay(3000)
          );
        })
    }

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

  function AuthInterceptor ($window, $location, $q, $injector){
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
        if(response.status === 401 && !/login/.test(response.config.url)) {
          let $mdToast = $injector.get('$mdToast');
          $location.path('/login');
          $mdToast.show(
            $mdToast.simple()
            .content('You have been logged out')
            .position('bottom right')
            .hideDelay(5000)
          );
          // remove any stale tokens
          $window.localStorage.removeItem('act');
        }

        return $q.reject(response);
      }
    };
  }

  Auth.$inject = ['$http', '$window', '$state', '$mdToast', 'Urls'];
  AuthInterceptor.$inject = ['$window', '$location', '$q', '$injector'];

  export {Auth, AuthInterceptor};
