(function () {
'use strict';

angular.module('common')
.service('DataService', DataService);

DataService.$inject = ['$http', '$rootScope', 'ApiPath'];

function DataService($http, $rootScope, ApiPath) {
  var service = this;

  service.getItem = function (itemId) {
    var response = $http({
      method: "GET",
      url: (ApiPath + "/tasks/:" + itemId)
    });
    console.log(response.data);
    return response.data;
  }

  service.getItemsToReport = function () {
    var response = $http({
      method: "GET",
      url: (ApiPath + "/tasks")
    });
    return response.then(function(response) {
      return response.data
    });
  }


  service.putInfo = function (put_data) {
    var putData = put_data.data;
    return $http({
      method: "PUT",
      url: (ApiPath + "/tasks/" + put_data._id),
      data: putData,
      headers: {'Content-Type': 'application/json'}
    }).then( function(response) {
      //Broadcasting event 'item_updated', to clear and focus pipe field
      $rootScope.$broadcast('item_updated');
      console.log("success!", response.data);
    }, function(response) {
      console.log("failed!");
    });
  }

  service.postInfo  = function (post_data) {
    var postData = JSON.stringify(post_data);
    return $http({
      method: "POST",
      url: (ApiPath + "/tasks"),
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

  service.getItemsToInControll = function () {
    var response = $http({
      method: "GET",
      url:(ApiPath + "/tasks")
    });
    return response
      .then(function(response) {
        return response.data.filter(function(item) {
          return item.diameter_one && !item.diameter_three;
        });
    });
  };

// InControll end

//Stamp start

  service.getItemsToStamp = function (banch) {
    console.log("Stamp service call");
    var response = $http({
      method: "GET",
      url: (ApiPath + "/tasks")
    });
    return response
      .then(function(response) {
        return response.data.filter(function(item) {
          return item.banch === banch && !item.stamp;
        })
      })
      .then(function(response) {
        return response.sort(function(a,b) {return a.stamp_avg - b.stamp_avg});
      })
  }
//Stamp end


// Nozzle start

  service.getItemsToNozzle = function (banch, pipe) {
    var response = $http({
      method: "GET",
      url:(ApiPath + "/tasks")
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
      url:(ApiPath + "/tasks")
    }).then(function(response) {
      console.log(response);
      var filteredArray = response.data.filter(function(element) {
        return element.banch === parseInt(searchTerm) && element.status[0] === 'pending';
      });
      return filteredArray;
    }).then(function(response) {
      return response.sort(function(a,b) {
        return a.diameter_avg - b.diameter_avg;
      });
    });
  }


  // service.getElementWeight = function (itemId) {
  //   return $http({
  //     method: "GET",
  //     url: (ApiPath + "/tasks/" + itemId)
  //   }).then(function (response) {
  //     return response.data;
  //   });
  // }


  service.getElementWeight = function () {
    return $http({
      method: "GET",
      url: (ApiPath + "/weight")
    }).then(function (weight) {
      return weight.data;
    });
  }

  // Weight end

//Height start

  service.getItemsToHeight = function(searchTerm) {
    return $http({
      method: "GET",
      url:(ApiPath + "/tasks")
    }).then(function(response) {
      var filteredArray = response.data.filter(function(element) {
        return element.banch === parseInt(searchTerm) && element.status[0] === 'pending';
      });
      return filteredArray;
    }).then(function(response) {
      return response.sort(function(a,b) {
        return a.diameter_avg - b.diameter_avg;
      });
    });
  }


  service.getElementHight = function (itemId) {
    return $http({
      method: "GET",
      url:(ApiPath + "/tasks/" + itemId),
    }).then(function(response) {
      return response.data;
    });
  }

//Height end


// Out Controll start

service.getItemsToOutControll = function (searchTerm) {
    return $http({
      method: "GET",
      url:(ApiPath + "/tasks")
    }).then(function(response) {
      console.log(response);
      var filteredArray = response.data.filter(function(element) {
        return element.banch === parseInt(searchTerm) && !element.container;
      });
      return filteredArray;
    }).then(function(response) {
      return response.sort(function(a,b) {
        return a.stamp - b.stamp;
      });
    });
  }

  service.getContainer = function () {
    return $http({
      method: "GET",
      url: (ApiPath + "/tasks")
    }).then(function(response){
      var sorted_response = response.data.sort(function(a,b) {
          return b.container - a.container;
        });
      var last = sorted_response[0].container;
      var length = response.data.filter(function(item) {
        return item.container === last;
      }).length;
      var container_data = {};

      if (!last) {
        container_data.last = 602;
        container_data.length = 0;
        return container_data;
      } else if (length === 18) {
        container_data.last = last + 1;
        container_data.length = 0;
        return container_data;
      } else {
        container_data.last = last;
        container_data.length = length;
        return container_data;
      }

    });
  }

// Out Controll end

// Package start

service.getItemsToPackage = function(searchTerm) {
  return $http({
    method: "GET",
    url: (ApiPath + "/tasks")
  }).then(function(response) {
    return response.data.filter(function(item) {
      return item.container === searchTerm && item.status[0] !== 'checked';
    });
  }).then(function(response) {
    return response.sort(function(a,b) {
      return a.stamp - b.stamp;
    })
  });
}

// Package end


// PDF start
  service.getItemsToPdf = function(searchTerm) {
    return $http({
      method: "GET",
      url: (ApiPath + "/tasks")
    }).then(function(response) {
      return response.data.filter(function(item) {
        return item.container === searchTerm && item.status[0] === "checked";
      });
    }).then(function(response) {
      return response.sort(function(a,b) {
        return a.stamp - b.stamp;
      })
    });
  }

  service.getBanchItemsToPdf = function(searchTerm) {
    return $http({
      method: "GET",
      url: (ApiPath + "/tasks")
    }).then(function(response) {
      return response.data.filter(function(item) {
        return item.banch === searchTerm;
      });
    }).then(function(response) {
      return response.sort(function(a,b) {
        return a.pipe - b.pipe;
      })
    });
  }


//PDF end


// Edit start

service.getItemsToEdit = function (banch, pipe) {
  return $http({
      method: "GET",
      url:(ApiPath + "/tasks")
    }).then(function(response) {
      var filteredArray = response.data.filter(function(item) {
        return item.banch === parseInt(banch) && item.pipe === parseInt(pipe) ;
      });
      return filteredArray;
    });

  }

  service.getItemToEditContainer = function (stamp) {
  return $http({
      method: "GET",
      url:(ApiPath + "/tasks")
    }).then(function(response) {
      console.log(response);
      var filteredArray = response.data.filter(function(item) {
        return item.stamp === parseInt(stamp);
      });
      return filteredArray;
    });

  }

// Edit end

// Agent start
  service.getAgents = function () {
    return $http({
      method: "GET",
      url:(ApiPath + "/agents")
    }).then(function(response) {
      return response.data;
    });
  }

  service.putInfoAgents = function (put_data) {
    var putData = put_data.data;
    return $http({
      method: "PUT",
      url: (ApiPath + "/agents/" + put_data._id),
      data: putData,
      headers: {'Content-Type': 'application/json'}
    }).then( function(response) {
      console.log("success!", response.data);
      return response.data;
    }, function(response) {
      console.log("failed!");
    });
  }

  service.getAgentWeight = function () {
    return $http({
      method: "GET",
      url: (ApiPath + "/weight")
    }).then(function (weight) {
      return weight.data;
    });
  }

// Agent end

// Assembly start
service.getBanchItems = function (banch) {
  console.log("service banch: ", banch);
    return $http({
      method: "GET",
      url:(ApiPath + "/tasks")
    }).then(function(response) {
      var filteredArray = response.data.filter(function(element) {
        return element.banch === parseInt(banch) && element.status[0] !== 'assembled';
      });
      return filteredArray;
    }).then(function(response) {
      return response.sort(function(a,b) {
        return a.pipe - b.pipe;
      });
    });
  }

service.getDeckAgents = function (deck) {
    return $http({
      method: "GET",
      url:(ApiPath + "/agents")
    }).then(function(response) {
      console.log(response, "deck: ", deck);
      var filteredArray = response.data.filter(function(agent) {
        return agent.deck === deck;
      })
      return filteredArray;
    });
  }


  service.putElementInfo = function (data) {
    var putData = data;
    return $http({
      method: "PUT",
      url: (ApiPath + "/tasks/" + putData.id),
      data: putData,
      headers: {'Content-Type': 'application/json'}
    }).then( function(response) {
      console.log("success!");
      return response;
    }, function(response) {
      console.log("failed!");
    });
  }

  service.putAgentInfo = function (data) {
      var putData = data;
      return $http({
        method: "PUT",
        url: (ApiPath + "/agents/" + putData.id),
        data: putData,
        headers: {'Content-Type': 'application/json'}
      }).then( function(response) {
        console.log("success!", response);
        return response;
      }, function(response) {
        console.log("failed!");
      });
    }
// Assembly finsh

// Tip start
  service.getTips = function () {
    return $http({
      method: "GET",
      url:(ApiPath + "/tips")
    }).then(function(response) {
      return response.data.sort(function(a,b) {
        return b.id - a.id;
      });
    });
  }

  service.getCertainTip = function (id) {
    return $http({
      method: "GET",
      url:(ApiPath + "/tips")
    }).then(function(response) {
      console.log(id);
      return response.data.filter(function(item) {
        return item.id === id;
      });
    });
  }

  service.postTipInfo  = function (post_data) {
    var postData = JSON.stringify(post_data);
    return $http({
      method: "POST",
      url: (ApiPath + "/tips"),
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
// Tip finish

}

})();