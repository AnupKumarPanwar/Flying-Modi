// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
 
        // if(window.plugins && window.plugins.AdMob) {
        //     var admob_key = device.platform == "Android" ? "ca-app-pub-3971583580619783/6613192552" : "ca-app-pub-3971583580619783/6613192552";
        //     var admob = window.plugins.AdMob;
        //     admob.createBannerView( 
        //         {
        //             'publisherId': admob_key,
        //             'adSize': admob.AD_SIZE.BANNER,
        //             'bannerAtTop': false
        //         }, 
        //         function() {
        //             admob.requestAd(
        //                 { 'isTesting': false }, 
        //                 function() {
        //                     admob.showAd(true);
        //                 }, 
        //                 function() { console.log('failed to request ad'); }
        //             );
        //         }, 
        //         function() { console.log('failed to create banner view'); }
        //     );
        // }
    });
})
