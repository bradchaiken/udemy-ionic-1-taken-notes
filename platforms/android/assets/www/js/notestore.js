angular.module('taking-notes.notestore', [])
  .factory('NoteStore', function() {

    var notes = angular.fromJson(window.localStorage['notes'] || '[]');

    function persist() {
      window.localStorage['notes'] = angular.toJson(notes);
    }

    return {

      list: function() {
        return notes;
      },

      get: function(noteId) {
        for (var i = 0; i < notes.length; i++) {
          if (notes[i].id === noteId) {
            return notes[i];
          }
        }
        return undefined;
      },

      create: function(note) {
        notes.push(note);
        persist();
      },

      update: function(note) {
        for (var i = 0; i < notes.length; i++) {
          if (notes[i].id === note.id) {
            notes[i] = note;
            persist();
            return;
          }
        }
      },

      move: function(note, fromIndex, toIndex) {
        notes.splice(fromIndex, 1);
        notes.splice(toIndex, 0, note);
        persist();
      },

      remove: function(noteId) {
        for (var i = 0; i < notes.length; i++) {
          if (notes[i].id === noteId) {
            notes.splice(i, 1);
            persist();
            return;
          }
        }
      }

    };

  });
