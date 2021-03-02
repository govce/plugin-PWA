$(document).ready(function(){
    /* Register service worker to control making site work offline */
    if('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('./assets/pwa/files/serviceWorker.js')
            .then(function() { console.log('Service Worker Registered'); });
    }

    let A2HClass = function (options) {
        let vars = {
            a2hBox: 'a2h-box',
            cookieName: 'a2h',
            cookieValue: 'ignore',
            platformIos: 'platform-ios',
            platformAndroid: 'platform-android',
        };
    
        let root = this;
        let deferredPrompt = false;
    
        // construct
        this.construct = function (options) {
            $.extend(vars, options);
    
            vars.a2hBox = document.getElementById('a2h-box');
    
            initialize();
        };
    
        // initialize - check if we must register
        let initialize = function () {
    
            // if element not added to dom
            if (typeof (vars.a2hBox) == 'undefined' || vars.a2hBox == null) {
                return;
            }
    
            // user cancelled app install - do not ask again until cookie expires
            if (getCookie(vars.cookieName) === vars.cookieValue) {
                // vars.a2hBox.style.display = 'none';
                vars.a2hBox.parentNode.removeChild(vars.a2hBox);
                return;
            }
    
            // if in standalone - do not register
            if (!navigator.standalone) {
                registerServiceWorker();
            }
    
            // debug / local environment
            // activateAndShowInstallBanner();
        }
    
        // register service worker
        let registerServiceWorker = function () {
            if ('serviceWorker' in navigator) {
                window.addEventListener('load', function () {
                    navigator.serviceWorker.register('/serviceworker.js').then(function (registration) {
                        // registration successful
                        activateAndShowInstallBanner();
                    }, function (err) {
                        // registration failed :(
                    });
                });
            }
        }
    
        // activate
        let activateAndShowInstallBanner = function () {
    
            // if not mobile - do not show banner
            if (!isMobileDevice()) {
                return;
            }
    
            if (!!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)) {
                vars.a2hBox.style.display = 'block';
                document.querySelector('.platform-android').style.display = "none";
            } else {
                document.querySelector('.platform-ios').style.display = "none";
            }
    
            // listen for the before installprompt - when pwa can be installed to this device
            window.addEventListener('beforeinstallprompt', function (e) {
                // Prevent Chrome 67 and earlier from automatically showing the prompt
                e.preventDefault();
                deferredPrompt = e;
                vars.a2hBox.style.display = 'block';
    
                document.getElementById('btn-accept').addEventListener('click', acceptHomeScreen);
            });
    
            document.getElementById('btn-reject').addEventListener('click', rejectHomeScreen);
        }
    
        // on accept home click
        let acceptHomeScreen = function () {
            vars.a2hBox.style.display = 'none';
    
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then(choiceResult, function () {
                vars.a2hBox.style.display = 'none';
                if (choiceResult.outcome === 'accepted') {
                    UTILS.doAjax("/api/a2h/installed");
                } else {
                    rejectHomeScreen();
                }
                deferredPrompt = null;
            });
        }
    
        let rejectHomeScreen = function () {
            vars.a2hBox.style.display = 'none';
    
            UTILS.doAjax("/api/a2h/cancelled");
            setCookie(vars.cookieName, vars.cookieValue, 30);
        }
    
        let isMobileDevice = function () {
            return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
                || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4));
        }
    
        let setCookie = function (name, value, exdays) {
            let d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            let expires = "expires=" + d.toUTCString();
            document.cookie = name + "=" + value + ";" + expires + ";path=/";
        }
    
        let getCookie = function (cname) {
            let name = cname + "=";
            let ca = document.cookie.split(';');
            for (let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        }
    
        this.construct(options);
    };


});

