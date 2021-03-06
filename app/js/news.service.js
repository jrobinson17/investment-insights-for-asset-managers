(function () {
  angular.module('app')
    .service('NewsService', ['$http', '$q', '$state', NewsService]);

  function NewsService($http, $q, $state) {
    console.log('NewsService loading...');
    return {
      findArticles: function(riskFactor, horizon) {
        console.log('Looking for', riskFactor, horizon);
        var deferred = $q.defer();
        $http.post('/api/v1/news',
          {
            search: riskFactor.search,
            daysDate: horizon.days
          }).then(function(response) {
          deferred.resolve(response.data);
        }).catch(function(err) {
          console.log(err);
          if (err.status === 401) { $state.go('home'); }
          deferred.reject(err);
        });
        return deferred.promise;
      }
    };
  }
})();
