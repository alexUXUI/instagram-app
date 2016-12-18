function ExampleCtrl($http, $scope) {
  'ngInject';

  const vm = this;

  vm.title = `NICK SARACENI`;

  $scope.images = []

  $http.get('http://localhost:3000/home').then(function(data){
    var info = data.data
    info.forEach(function(el){
      $scope.images.push(el);
    })
  })
}

export default {
  name: 'ExampleCtrl',
  fn: ExampleCtrl
};
