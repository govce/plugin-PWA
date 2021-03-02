$(document).ready(function(){
    /* Register service worker to control making site work offline */
    if('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('./assets/pwa/files/serviceWorker.js')
            .then(function() { console.log('Service Worker Registered'); });
    }
});


