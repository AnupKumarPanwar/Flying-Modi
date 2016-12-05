// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
   
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }


    if( ionic.Platform.isAndroid() )  { 
       admobid = { // for Android
          banner: 'ca-app-pub-3971583580619783/6613192552' // Change this to your Ad Unit Id for banner...
       };

       if(AdMob) 
          AdMob.createBanner( {
             adId:admobid.banner, 
             position:AdMob.AD_POSITION.BOTTOM_CENTER, 
             autoShow:true
          } );
    }
    else
    {
      admobid = { // for Android
         banner: 'ca-app-pub-3971583580619783/6613192552' // Change this to your Ad Unit Id for banner...
      };

      if(AdMob) 
         AdMob.createBanner( {
            adId:admobid.banner, 
            position:AdMob.AD_POSITION.BOTTOM_CENTER, 
            autoShow:true
         } );
    }





    
 

  });
})
