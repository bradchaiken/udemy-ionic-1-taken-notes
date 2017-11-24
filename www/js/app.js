(function() {

  var app = angular.module('starter', ['ionic']);

  app.config(function ($stateProvider, $urlRouterProvider) {

    // State #1 - initial / home state.
    $stateProvider.state('List', {
      url: '/list',
      templateUrl: 'templates/list.html'
    });

    // State #2 - edit list state.
    $stateProvider.state('Edit', {
      url: '/edit/:noteId',
      templateUrl: 'templates/edit.html'
    });

    // If the url does not match anything defined before this, render '/list'.
    $urlRouterProvider.otherwise('/list');

  });

  var notes = [
    {
      id: '1',
      title: "Title - 1",
      description: "note-1 description..."
    },
    {
      id: '2',
      title: "Title - 2",
      description: "note-2 description..."
    }
  ]

  function updateNote(note) {
    for( var i = 0; i < notes.length; i++) {
      if (notes[i].id === note.id) {
        notes[i] = note;
        return;
      }
    }
  }

  function getNote(noteId) {
    for( var i = 0; i < notes.length; i++) {
      if (notes[i].id === noteId) {
        return notes[i];
      }
    }
    return undefined;
  }

  app.controller('ListCtrl', function ($scope) {
    $scope.notes = notes;
  });

  app.controller('EditCtrl', function ($scope, $state) {
    $scope.note = angular.copy(getNote($state.params.noteId));

    $scope.save = function() {
      updateNote($scope.note);
      $state.go('List');
    }
  });

  app.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })

}());
