'use strict';

angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};
  $scope.regData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope,
    backdropClickToClose: false
  }).then(function(modal) {
    $scope.modal = modal;
  });

  //Create Registration Modal
  $ionicModal.fromTemplateUrl('templates/register.html', {
    scope: $scope
  }).then(function (modal) {
    $scope.regModal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  $scope.closeReg = function () {
    $scope.regModal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

  $scope.registerNew = function () {
    $scope.regModal.show();
  };

  $scope.doRegister = function () {
    console.log('Registering', $scope.regData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeReg();
    }, 1000);
  };

  $timeout(function () {
    $scope.modal.show();
  },1000)
})

.controller('MapCtrl', function($scope, $state, $cordovaGeolocation, $ionicModal, $interval, $window) {
  var markerCount = 0;

  var options = {timeout: 10000, enableHighAccuracy: true};
  $scope.incident = {
    severity: 0
  };

  $scope.incidentArray = [];

  $ionicModal.fromTemplateUrl('templates/report.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $cordovaGeolocation.getCurrentPosition(options).then(function(position){

    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
    //Wait until the map is loaded
    google.maps.event.addListenerOnce($scope.map, 'idle', function(){

      var marker = new google.maps.Marker({
        map: $scope.map,
        animation: google.maps.Animation.DROP,
        position: latLng
      });

      var crosshairShape = {coords:[0,0,0,0],type:'rect'};


      // Move map around to centre threat
      var crosshairMarker = new google.maps.Marker({

        map: $scope.map,

        icon: 'https://www.daftlogic.com/images/cross-hairs.gif',

        shape: crosshairShape

      });

      crosshairMarker.bindTo('position', $scope.map, 'center');

      var infoWindow = new google.maps.InfoWindow({
        content: "Your location"
      });

      google.maps.event.addListener(marker, 'click', function () {
        infoWindow.open($scope.map, marker);
      });

  }, function(error){
    console.warn("Could not get location");
  });

    addStations();

  });



  function addStations() {
    var codeBlueInfo1 = new google.maps.InfoWindow();
    var cbLatLng1 = new google.maps.LatLng(43.94325851073291, -78.89629898308107);
    var htmlMarkupForInfoWindow1 = "<b>Code Blue #1</b><br><div style='text-align: center'><button class='button button-assertive'>Call</button></div>";

    var codeBlueInfo2 = new google.maps.InfoWindow();
    var cbLatLng2 = new google.maps.LatLng(43.943057658943545, -78.89593956707307);
    var htmlMarkupForInfoWindow2 = "<b>Code Blue #2</b><br><div style='text-align: center'><button class='button button-assertive'>Call</button></div>";

    var codeBlueInfo3 = new google.maps.InfoWindow();
    var cbLatLng3 = new google.maps.LatLng(43.94440180799459, -78.89721629856416);
    var htmlMarkupForInfoWindow3 = "<b>Code Blue #3</b><br><div style='text-align: center'><button class='button button-assertive'>Call</button></div>";

    var codeBlueInfo4 = new google.maps.InfoWindow();
    var cbLatLng4 = new google.maps.LatLng(43.94369883728228, -78.89774201153108);
    var htmlMarkupForInfoWindow4 = "<b>Code Blue #4</b><br><div style='text-align: center'><button class='button button-assertive'>Call</button></div>";

    var codeBlueInfo5 = new google.maps.InfoWindow();
    var cbLatLng5 = new google.maps.LatLng(43.94566095453568, -78.89691589115449);
    var htmlMarkupForInfoWindow5 = "<b>Code Blue #5</b><br><div style='text-align: center'><button class='button button-assertive'>Call</button></div>";

    var marker1 = new google.maps.Marker({
      position: cbLatLng1,
      map: $scope.map,
      animation: google.maps.Animation.DROP,
      icon: 'img/rsz_pan_blue_circle.png'
    });

    var marker2 = new google.maps.Marker({
      position: cbLatLng2,
      map: $scope.map,
      animation: google.maps.Animation.DROP,
      icon: 'img/rsz_pan_blue_circle.png'
    });

    var marker3 = new google.maps.Marker({
      position: cbLatLng3,
      map: $scope.map,
      animation: google.maps.Animation.DROP,
      icon: 'img/rsz_pan_blue_circle.png'
    });

    var marker4 = new google.maps.Marker({
      position: cbLatLng4,
      map: $scope.map,
      animation: google.maps.Animation.DROP,
      icon: 'img/rsz_pan_blue_circle.png'
    });

    var marker5 = new google.maps.Marker({
      position: cbLatLng5,
      map: $scope.map,
      animation: google.maps.Animation.DROP,
      icon: 'img/rsz_pan_blue_circle.png'
    });

    //Gives each marker an Id for the on click
    var cbMarkerCount = 5;


    google.maps.event.addListener(marker1, 'click', (function(marker, markerCount) {
      return function() {
        codeBlueInfo1.setContent(htmlMarkupForInfoWindow1);
        codeBlueInfo1.open(map, marker);
        $scope.map.panTo(cbLatLng1); //- See more at: https://www.sundoginteractive.com/blog/working-with-dynamic-markers-in-google-maps-js-api#sthash.EhLN75wB.dpuf
      }
    })(marker1, 0));

    google.maps.event.addListener(marker2, 'click', (function(marker, markerCount) {
      return function() {
        codeBlueInfo2.setContent(htmlMarkupForInfoWindow2);
        codeBlueInfo2.open(map, marker);
        $scope.map.panTo(cbLatLng2); //- See more at: https://www.sundoginteractive.com/blog/working-with-dynamic-markers-in-google-maps-js-api#sthash.EhLN75wB.dpuf
      }
    })(marker2, 1));

    google.maps.event.addListener(marker3, 'click', (function(marker, markerCount) {
      return function() {
        codeBlueInfo3.setContent(htmlMarkupForInfoWindow3);
        codeBlueInfo3.open(map, marker);
        $scope.map.panTo(cbLatLng3); //- See more at: https://www.sundoginteractive.com/blog/working-with-dynamic-markers-in-google-maps-js-api#sthash.EhLN75wB.dpuf
      }
    })(marker3, 2));

    google.maps.event.addListener(marker4, 'click', (function(marker, markerCount) {
      return function() {
        codeBlueInfo4.setContent(htmlMarkupForInfoWindow4);
        codeBlueInfo4.open(map, marker);
        $scope.map.panTo(cbLatLng4); //- See more at: https://www.sundoginteractive.com/blog/working-with-dynamic-markers-in-google-maps-js-api#sthash.EhLN75wB.dpuf
      }
    })(marker4, 3));

    google.maps.event.addListener(marker5, 'click', (function(marker, markerCount) {
      return function() {
        codeBlueInfo5.setContent(htmlMarkupForInfoWindow5);
        codeBlueInfo5.open(map, marker);
        $scope.map.panTo(cbLatLng5); //- See more at: https://www.sundoginteractive.com/blog/working-with-dynamic-markers-in-google-maps-js-api#sthash.EhLN75wB.dpuf
      }
    })(marker5, 4))

  }


  $scope.reportEvent = function () {
    $scope.modal.show();
  };

  $scope.submitReport = function () {
    $scope.incident.time = $('#time').val();
    $scope.incident.coords = $('#coords').val();

    console.log("Got:", $scope.incident);
    var incidentString = "Incident: " + $scope.incident.title + "<br>" + "Time Reported: " + $scope.incident.time + "<br>" + "Severity: " + $scope.incident.severity + "<br>";
    var latLng = $scope.incident.coords.split(',');
    var lat = latLng[0].substr(1);
    var long = latLng[1].substr(0, latLng[1].length - 1);
    console.log(latLng);
    addMarkerToMap(lat, long, incidentString);
    $scope.incidentArray.push({
      incidentString: incidentString,
      lat: lat,
      long: long
    });

    $window.localStorage.setItem("arrayOfIncidents", JSON.stringify($scope.incidentArray));
    $scope.modal.hide();
  };

  var tick = function() {
    $scope.clock = Date.now();
  };
  tick();
  $interval(tick, 1000);

  function addMarkerToMap(lat, long, htmlMarkupForInfoWindow){
    var infowindow = new google.maps.InfoWindow();
    var myLatLng = new google.maps.LatLng(lat, long);
    var marker = new google.maps.Marker({
      position: myLatLng,
      map: $scope.map,
      animation: google.maps.Animation.DROP,
      icon: 'img/warning-icon-hi_small.png'
    });

    //Gives each marker an Id for the on click
    markerCount++;

    //Creates the event listener for clicking the marker
    // and places the marker on the map
    google.maps.event.addListener(marker, 'click', (function(marker, markerCount) {
      return function() {
        infowindow.setContent(htmlMarkupForInfoWindow);
        infowindow.open(map, marker);
      }
    })(marker, markerCount));
    //Pans map to the new location of the marker
    $scope.map.panTo(myLatLng); //- See more at: https://www.sundoginteractive.com/blog/working-with-dynamic-markers-in-google-maps-js-api#sthash.EhLN75wB.dpuf
  }
})

.controller('SettingsCtrl', function($scope, $stateParams) {
  $scope.deadswitch = false;
  $scope.deadswitchInterval = 10;
})

  .controller('MainMenuCtrl', function($scope, $window, $ionicModal) {
    $ionicModal.fromTemplateUrl('templates/addFriend.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.addModal = modal;
    });

    $ionicModal.fromTemplateUrl('templates/viewFriend.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.viewModal = modal;
    });

    $scope.friends = [];
    if($window.localStorage.getItem('friends')){
      $scope.friends = JSON.parse($window.localStorage.getItem('friends'));
    }

    $scope.addFriend = function () {
      $scope.newFriend = {
        status: "OK"
      };
      $scope.addModal.show();
    };

    $scope.doAddFriend = function () {
      $scope.friends.push($scope.newFriend);
      $scope.addModal.hide();
      $window.localStorage.setItem('friends', JSON.stringify($scope.friends));
    };

    $scope.cancelAdd = function () {
      $scope.addModal.hide();
    };

    $scope.cancelView = function () {
      $scope.viewModal.hide();
    };

    $scope.showFriend = function (index) {
      $scope.index = index;
      $scope.viewModal.show();
    }
  });
