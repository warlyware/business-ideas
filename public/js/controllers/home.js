'use strict';

angular.module('HypothesisApp')
.controller('HomeCtrl', function($scope, $http, $location, $state) {
  console.log('home!');

  $scope.submitHypothesis = function() {
    console.log($scope.hypo);
    $http.post('/hypothesis', $scope.hypo)
      .success(function(idea) {
        console.log(idea);
        $state.go('hypoPosted', { 'ideaCode': idea.code });
      })
      .error(function(err) {
        console.log(err);
      });
  }

});