'use strict';

angular.module('HypothesisApp')
.controller('PostedCtrl', function($scope, $http, $location, $state, $stateParams) {
  console.log('posted!');
  $scope.showOne = true;
  $scope.showTwo = false;
  $scope.showThree = false;
  $scope.showFour = false;
  console.log($stateParams);
    $http.get('/hypothesis/' + $stateParams.ideaCode)
      .success(function(idea) {
        console.log(idea);
        $scope.idea = idea;
      })
      .error(function(err) {
        console.log(err);
      });

  $scope.finishSurvey = function() {
     Materialize.toast('Thank you for taking our survey!', 4000)
  }

});