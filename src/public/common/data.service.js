(function () {
'use strict';

angular.module('common')
.service('DataService', DataService);

DataService.$inject = ['$http', '$rootScope'];

function DataService($http, $rootScope) {
  var service = this;

  service.getItemsToReport = function () {
    var response = $http({
      method: "GET",
      url:("http://localhost:3000/tasks")
    });
    return response.then(function(response) {
      console.log(response.data);
      return response.data
    });
  }


  service.putInfo = function (put_data) {;
    var putData = put_data.data;
    return $http({
      method: "PUT",
      url: ("http://localhost:3000/tasks/" + put_data._id),
      data: putData,
      headers: {'Content-Type': 'application/json'}
    }).then( function(response) {
      //Broadcasting event 'nozzle_updated', to clear and focus pipe field
      $rootScope.$broadcast('item_updated');
      console.log("success!");
    }, function(response) {
      console.log("failed!");
    });
  }

  service.postInfo  = function (post_data) {
    var postData = JSON.stringify(post_data);
    return $http({
      method: "POST",
      url: ("http://localhost:3000/tasks"),
      data: postData,
      headers: {'Content-Type': 'application/json'}
    }).then(function(response) {
      // Broadcasting object after successful POST request, to update itemlist in "incontroll" state of app!
      $rootScope.$broadcast('item_created', response.data);
      console.log("success!");
    }, function(response) {
      console.log("failed!");
    });
  }

// InControll start

  service.getItemsToControll = function () {
    var response = $http({
      method: "GET",
      url:("http://localhost:3000/tasks")
    });
    return response
      .then(function(response) {
        return response.data.filter(function(item) {
          return item.diameter_one && !item.diameter_three;
        });
    });
  };

// InControll end


// Nozzle start

  service.getItemsToNozzle = function (banch, pipe) {
    var response = $http({
      method: "GET",
      url:("http://localhost:3000/tasks")
    });
    return response
      .then(function(response) {
        return response.data.filter(function(item) {
          return item.banch === banch && item.pipe === pipe;
        });
    });
  }

// Nozzle end

// Weight start
  service.getItemsToWeight = function (searchTerm) {
    return $http({
      method: "GET",
      url:("http://localhost:3000/tasks")
    }).then(function(response) {
      var filteredArray = response.data.filter(function(element) {
        return element.banch === parseInt(searchTerm);
      });
      return filteredArray;
    }).then(function(response) {
      console.log(response);
      return response.sort(function(a,b) {
        return a.diameter_avg - b.diameter_avg;
      });
    });
  }
// Weight end

}

})();