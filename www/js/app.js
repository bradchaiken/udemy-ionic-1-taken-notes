(function() {

  var app = angular.module('taking-notes', ['ionic', 'taking-notes.notestore']);

  app.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider.state('list', {
      url: '/list',
      templateUrl: 'templates/list.html',
      cache: false
    });

    $stateProvider.state('add', {
      url: '/add',
      templateUrl: 'templates/edit.html',
      controller: 'AddCtrl'
    });

    $stateProvider.state('edit', {
      url: '/edit/:noteId',
      templateUrl: 'templates/edit.html',
      controller: 'EditCtrl'
    });

    $urlRouterProvider.otherwise('/list');
  });

  app.controller('ListCtrl', function($scope, NoteStore) {
    $scope.reordering = false;

    function refreshNotes() {
      NoteStore.list().then(function(notes) {
        $scope.notes = notes;
      });
    }
    refreshNotes();

    $scope.remove = function(noteId) {
      NoteStore.remove(noteId).then(refreshNotes);
    };

    $scope.move = function(note, fromIndex, toIndex) {
      NoteStore.move(note, fromIndex, toIndex);
    };

    $scope.toggleReordering = function() {
      $scope.reordering = !$scope.reordering;
    };
  });

  app.controller('AddCtrl', function($scope, $state, NoteStore) {
    $scope.note = {
      title: '',
      description: ''
    };
    $scope.save = function() {
      NoteStore.create($scope.note).then(function() {
        $state.go('list');
      });
    };
  });

  app.controller('EditCtrl', function($scope, $state, NoteStore) {
    NoteStore.get($state.params.noteId).then(function(note) {
      $scope.note = note;
    });
    $scope.save = function() {
      NoteStore.update($scope.note).then(function() {
        $state.go('list');
      });
    };
  });

  app.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  });

}());
