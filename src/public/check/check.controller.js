(function () {
"use strict";

angular.module('public')
.controller('CheckController', CheckController);

CheckController.$inject = ['DataService', '$scope', 'Password', '$state'];
function CheckController(DataService, $scope, Password, $state) {

  this.$onInit = function() {
    this.password = '';
    this.alert = '';
  }

  this.goToEdit = function() {
    if (this.password === Password) {
      $state.go('public.edit');
    } else {
      this.alert = 'Wrong password, try again dude!'
    }
  }

}


})();