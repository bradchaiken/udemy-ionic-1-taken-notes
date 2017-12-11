angular.module('taking-notes.user', [])
.factory('User', function($http) {

  var apiUrl = 'http://localhost:8200';

  var loggedIn = false;

  return {

    login: function(credentials) {
      return $http.post(apiUrl + '/authenticate', credentials)
        .then(function(response) {
          var token = response.data.token;
          $http.defaults.headers.common.Authorization = 'Bearer ' + token;
          loggedIn = true;
        })
      loggedIn = true;
    },

    isLoggedIn: function() {
      return loggedIn;
    }

  };
});
