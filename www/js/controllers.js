angular.module('starter.controllers', ['kinvey'])

.controller('DashCtrl', function($scope) {

    $scope.myTest = function() {
        console.log('inside myTest');
        $ionicSideMenuDelegate.toggleLeft();
    };


})

.controller('PlacesCtrl', function($kinvey, $scope, $rootScope) {

   console.log('places ctrl');

   $scope.doRefresh = function() {
        console.log( $rootScope.current_loc);
        console.log( document.getElementById("myrange").value);
        console.log( document.getElementById("myinterest").value);

        var distance = parseInt(document.getElementById('myrange').value);
        console.log( distance );

        var myzone = [$rootScope.current_loc[1], $rootScope.current_loc[0]];

        var query = new Kinvey.Query();
        query.equalTo('keyword', document.getElementById("myinterest").value).near('_geoloc', myzone, distance);
        console.log(query);
        //query.near('_geoloc', $rootScope.current_loc, document.getElementById("myrange"));
        $kinvey.DataStore.find('places', query).then(function(places) {
            console.log(places);
            $scope.places = places;
        });

   }

})


.controller('SearchCtrl', function($scope, $kinvey) {

    $scope.$on('$ionicView.beforeEnter', function() {
        console.log('load search view');
        $scope.showme = false;
        $kinvey.DataStore.find('planes').then(function(planes) {
            console.log(planes);
            $scope.planes = planes;
        });
    });


    $scope.searchme = function() {
        console.log('inside searchctrl');

        console.log(document.getElementById("chosenPlane").value);

        var query = new Kinvey.Query();
        query.equalTo('name', document.getElementById("chosenPlane").value);
        $kinvey.DataStore.find('planes', query).then(function(thisplane) {
            console.log(thisplane);
            $scope.thisplane = thisplane[0];
            $scope.showme = true;
        });
    };
})

.controller('InsertContactCtrl', function($scope, $kinvey, $ionicLoading) {
    $scope.insertme = function() {
        var mycname = document.getElementById("custname").value;
        document.getElementById("custname").value = "";
        console.log(mycname);

        var motorcycle = document.getElementById("motorcycle").value;
        console.log(motorcycle);
        document.getElementById("motorcycle").value = "";

        var sticker = document.getElementById("sticker").value;
        console.log(sticker);
        document.getElementById("sticker").value = "";

        var testdrive = document.getElementById("testdrive").checked;
        console.log(testdrive);
        //document.getElementById("testdrive").value = false;

        var mytestdrive = true;
        if (testdrive == "on") {
            mytestdrive = true;
        } else {
            mytestdrive = false;
        }


        var data = {};

        data.Name = mycname;
        data.Motorcycle__c = motorcycle;
        data.TestRide__c = testdrive;
        data.Motorcycle_Cost__c = sticker;
        data.CloseDate = "2012-05-14T20:21:00Z";
        data.AccountId = "00161000002foreAAA";
        data.StageName = "Prospect";

        console.log(JSON.stringify(data));


        $kinvey.DataStore.save('opportunities', data).then(function(data) {
            console.log(data);
        });

        $ionicLoading.show({
            template: 'prospect inserted',
            noBackdrop: true,
            duration: 2000
        });

    };
})



.controller('CompeteCtrl', function($scope, $kinvey, $ionicLoading) {
    $scope.compareme = function() {
        console.log('inside compareme');
        var mychkAuto = document.getElementById("chkAuto").checked;
        console.log(mychkAuto);

        var mychkHome = document.getElementById("chkHome").checked;
        console.log(mychkHome);


        var mychkLife = document.getElementById("chkLife").checked;
        console.log(mychkLife);

        var data = {};

        data.auto = mychkAuto;
        data.home = mychkHome;
        data.life = mychkLife;
        data.name = "Mattie";


        $kinvey.DataStore.save('competition', data).then(function(data) {

            console.log(data);
            $scope.acme = data.acme;
            $scope.amfam = data.amfam;
            $scope.progressive = data.progressive;
            $scope.statefarm = data.statefarm;
        });

        $ionicLoading.show({
            template: 'computing price comparison',
            noBackdrop: true,
            duration: 2000
        });

    };
})


.controller('SendEmailCtrl', function($scope, $kinvey, $ionicLoading) {
    $scope.sendme = function() {
        var myemail = document.getElementById("sendtoemail").value;
        document.getElementById("sendtoemail").value = "";
        var sendtoname = document.getElementById("myrecipientname").value;
        document.getElementById("myrecipientname").value = "";
        console.log(myemail);

        var data = {};

        data.to = myemail;
        data.subject = "Time to Schedule an Insurance Coverage Review";
        data.body = "Dear Policyholder:\n\n\nWe notice that you are past due for a coverage review.  Did you know that over half of all coverage reviews end up saving the customer money?  Contact your agent today for a comprehensive look at your coverage.>";
        data.html_body = "<html>Dear " + sendtoname + ":<br><br>We notice that you are past due for a coverage review.  Did you know that over half of all coverage reviews end up saving the customer money?  Contact your agent today for a comprehensive look at your coverage.<br><img src='http://www.lexpage.com/images/inscard2.jpg'></html>";
        data.reply_to = "coveragereviw@acmeinsurance.com";


        console.log(myemail);
        //Kinvey.DataStore.save('books', data);
        $kinvey.DataStore.save('email', data).then(function(data) {
            console.log(data);
        });

        $ionicLoading.show({
            template: 'email sent',
            noBackdrop: true,
            duration: 2000
        });
    };
})



.controller('PlaneCtrl', function($scope, $kinvey) {

    $scope.$on('$ionicView.beforeEnter', function() {
        console.log('load view');

        console.log('inside planectrl');
        //var user = Kinvey.getActiveUser();
        //console.log(user);
        //var query = new Kinvey.Query();
        //query.equalTo('userOwner', user.email);
        //console.log(user.email);
        $kinvey.DataStore.find('planes').then(function(planes) {
            console.log(planes);
            $scope.planes = planes;
        });
    });
})



.controller('PassengerCtrl', function($scope, $kinvey) {

    $scope.doRefresh = function() {
        console.log('refresh');
        $kinvey.DataStore.find('passengers').then(function(passengers) {
            console.log(passengers);
            if (passengers[0].records == null) {
                console.log('passengers.records is null');
            } else {
                passengers = passengers[0].records;
                console.log('it is not null');
            }
            $scope.passengers = passengers;
        });
    }

    $scope.$on('$ionicView.beforeEnter', function() {
        console.log('passenger load view');
        var query = new Kinvey.Query();
        query.ascending('Seat');
        $kinvey.DataStore.find('passengers', query).then(function(passengers) {
            if (passengers[0].records == null) {
                console.log('passengers.records is null');
            } else {
                passengers = passengers[0].records;
                console.log('it is not null');
            }
            console.log(passengers);
            $scope.passengers = passengers;
        });
    });

})

.controller('MapCtrl', function($scope, $kinvey, $rootScope) {

var gmarkers = [];

    $scope.doRefresh = function() {
        //check to see if a range has been specified
        if (document.getElementById("myrange").value == "") {
            console.log('no range');
            $kinvey.DataStore.find('geo').then(function(locations) {
                console.log(locations);
                for (var i = 0; i < locations.length; i++) {
                    var mylat = parseInt(locations[i]._geoloc[0]);
                    var mylong = parseInt(locations[i]._geoloc[1]);
                    console.log(mylat + ", " + mylong);
                    console.log(locations[i].company.name);
                    var info = new google.maps.InfoWindow({
                        content: '<b>Who:</b> ' + locations[i].name + '<br><b>Notes:</b> ' + locations[i].company.name
                    });

                    
                    var mapOptions = {
                        
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    };

                    var myLatlng = new google.maps.LatLng(mylat, mylong);
                    var marker = new google.maps.Marker({
                        position: myLatlng,
                        map: $rootScope.map,
                        title: locations[i].name
                    });
                    gmarkers.push(marker);
                    google.maps.event.addListener(marker, 'click', (function(info) {
                        return function() {
                            info.open($rootScope.map, this);
                        }
                    })(info));

                }

            });
        } else {
            console.log('range specified');
            console.log( 'gmarker len = ' + gmarkers.length );
            console.log( $rootScope.current_loc );

            var myrange = document.getElementById("myrange").value;
            
                console.log('getting position');
                
                // Query for buildings close by.
                var query = new $kinvey.Query();
                query.near('_geoloc', $rootScope.current_loc, myrange);
                var promise = $kinvey.DataStore.find('geo', query);
                promise.then(function(models) {

                    console.log('num markers = ' + models.length);
                    for (i = 0; i < gmarkers.length; i++) {
                        console.log( 'clearing marker...');
                        gmarkers[i].setMap(null);
                    }


                    for (var i = 0; i < models.length; i++) {
                        var mylat = parseInt(models[i]._geoloc[0]);
                        var mylong = parseInt(models[i]._geoloc[1]);
                        console.log(mylat + ", " + mylong);
                        console.log(models[i].company.name);
                        var info = new google.maps.InfoWindow({
                            content: '<b>Who:</b> ' + models[i].name + '<br><b>Notes:</b> ' + models[i].company.name
                        });

                        var mapOptions = {
                            //center: myLatlng,
                            //zoom: 3,
                            mapTypeId: google.maps.MapTypeId.ROADMAP
                        };

                        var myLatlng = new google.maps.LatLng(mylat, mylong);
                        var marker = new google.maps.Marker({
                            position: myLatlng,
                            map: $rootScope.map,
                            title: models[i].name
                        });

                        gmarkers.push(marker);

                        google.maps.event.addListener(marker, 'click', (function(info) {
                            return function() {
                                info.open($rootScope.map, this);
                            }
                        })(info));

                    }
                }, function(err) {
                    console.log(err);
                });
            
        }

    }



    $scope.$on('$ionicView.beforeEnter', function() {

        $kinvey.DataStore.find('geo').then(function(locations) {
            console.log(locations);
            for (var i = 0; i < locations.length; i++) {
                var mylat = parseInt(locations[i]._geoloc[0]);
                var mylong = parseInt(locations[i]._geoloc[1]);
                console.log(mylat + ", " + mylong);
                var info = new google.maps.InfoWindow({
                    content: '<b>Who:</b> ' + locations[i].name + '<br><b>Notes:</b> ' + locations[i].company.name
                });

                var mapOptions = {
                
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };

                var myLatlng = new google.maps.LatLng(mylat, mylong);
                var marker = new google.maps.Marker({
                    position: myLatlng,
                    map: $rootScope.map,
                    title: locations[i].name
                });
                gmarkers.push(marker);
                google.maps.event.addListener(marker, 'click', (function(info) {
                    return function() {
                        info.open($rootScope.map, this);
                    }
                })(info));

            }

        });
    });


    $scope.initialize = function() {
        
        console.log('initializing map');

        var myLatlng = new google.maps.LatLng(39.8282109, -98.5795706);
        //$scope.mybrand = mybrand;
        var mapOptions = {
            center: myLatlng,
            zoom: 3,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        $rootScope.map = new google.maps.Map(document.getElementById("mymap"),
            mapOptions);
    }

})


.controller('BrandCtrl', function($scope, $kinvey) {

    $scope.doRefreshBrand = function() {
        console.log('refresh brand');
        $kinvey.DataStore.find('brand').then(function(mybrand) {
            console.log(mybrand);
            $scope.mybrand = mybrand;
        });
    }

    $scope.$on('$ionicView.beforeEnter', function() {
        console.log('partner load view');
        $kinvey.DataStore.find('brand').then(function(brand) {
            console.log(brand);
            $scope.mybrand = brand;
        });
    });

})



.controller('MenuCtrl', function($scope, $kinvey, $ionicSideMenuDelegate, $ionicModal) {
    console.log('inside menuctrl');
    $scope.toggleLeft = function() {
        console.log('inside toggleleft');
        $ionicSideMenuDelegate.toggleLeft();
    };

    $ionicModal.fromTemplateUrl('templates/modal.html', function(modal) {
        $scope.modal = modal;
    }, {
        animation: 'slide-in-up'
    });
})




.controller('RiskCtrl', function($scope) {

    $scope.showRisk = true;

    $scope.computeRisk = function() {
        console.log('yo, risk here');

        var myage = document.getElementById("yourage").value;
        var mygender = document.getElementById("yourgender").value;
        var myweight = document.getElementById("yourweight").value;
        var myexercise = document.getElementById("yourexercise").value;
        var mysmoker = document.getElementById("yoursmoker").checked;
        console.log("They smoke: " + mysmoker);

        var healthdata = {};
        healthdata.name = 'MattieD';
        healthdata.myage = myage;
        healthdata.myweight = myweight;
        healthdata.mysmoker = mysmoker;
        healthdata.mygender = mygender;
        healthdata.myexercise = myexercise;



        var promise = Kinvey.execute('healthcalc', healthdata, {
            success: function(response) {
                console.log('riskFactor = ' + response.riskfactor);
                console.log('advice = ' + response.advice);
                document.getElementById("myrisk").value = response.riskfactor;
                $scope.riskrating = response.riskfactor;
                $scope.myadvice = response.advice;
            }
        });
        $scope.showRisk = false;
        console.log('risk = ' + $scope.showRisk);

    }

    console.log('risk');
})



.controller('HomeCtrl', function($scope, $kinvey, $rootScope) {
    console.log('home');

    navigator.geolocation.getCurrentPosition(function(loc) {
                console.log('getting position');
                var coord = [loc.coords.latitude, loc.coords.longitude];
                console.log(coord);
                $rootScope.current_loc = coord;
        });


    $scope.$on('$ionicView.enter', function() {
        console.log('before entering home');

        $kinvey.DataStore.find('brand').then(function(brand) {
            //console.log(brand[0].headerlabel);
            //$scope.headerlabel = brand[0].headerlabel;
        });
    });

})



.controller('AccountCtrl', function($scope, $state, $kinvey) {
    $scope.userData = {
        email: "",
        password: ""
    };


    $scope.validateUser = function() {
        var promise = $kinvey.User.login({
            username: $scope.userData.email,
            password: $scope.userData.password
        });
        promise.then(
            function(response) {
                //Kinvey login finished with success
                $scope.submittedError = false;
                $state.go('menu.tabs.home');
            },
            function(error) {
                //Kinvey login finished with error
                $scope.submittedError = true;
                $scope.errorDescription = error.description;
                console.log("Error login " + error.description); //
            }
        );
    };

    $scope.signUp = function() {
        var promise = $kinvey.User.signup({
            username: $scope.userData.email,
            password: $scope.userData.password,
            email: $scope.userData.email
        });
        console.log("signup promise");
        promise.then(
            function() {
                //Kinvey signup finished with success
                $scope.submittedError = false;
                console.log("signup success");
                $state.go('menu.tabs.home');
            },
            function(error) {
                //Kinvey signup finished with error
                $scope.submittedError = true;
                $scope.errorDescription = error.description;
                console.log("signup error: " + error.description);
            }
        );
    };

    $scope.logout = function() {
        //Kinvey logout starts
        var promise = $kinvey.User.logout();
        promise.then(
            function() {
                //Kinvey logout finished with success
                console.log("user logout");
                $kinvey.setActiveUser(null);
            },
            function(error) {
                //Kinvey logout finished with error
                alert("Error logout: " + JSON.stringify(error));
            }
        );
    }

});