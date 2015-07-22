'use strict';

var app = angular.module('HypothesisApp', ['ui.router']);

app.run(function(){
  console.log('Hypothesis, go!');
})
.config(function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('home', {url: '/', templateUrl: '../templates/home.html', controller: 'HomeCtrl'})
  .state('hypoPosted', {
    url: '/hypo/:ideaCode',
    templateUrl: '../templates/posted.html', 
    controller: 'PostedCtrl'
    // params: ['ideaCode']
  });
})
.constant('urls',{
  'apiUrl': ''
});
