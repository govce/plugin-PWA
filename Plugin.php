<?php

namespace PWA;

use MapasCulturais\App;
use MapasCulturais\i;


class Plugin extends \MapasCulturais\Plugin
{
    function __construct(array $config = [])
    {
        parent::__construct($config);
    }

    public function _init()
    {
        $app = App::i();

        if (!file_exists(BASE_PATH . 'manifest.json')) {
            copy(BASE_PATH .'protected/application/plugins/PWA/assets/manifest.json', BASE_PATH . 'manifest.json' );
        }

        if (!file_exists(BASE_PATH . 'serviceWorker.js')) {
            copy(BASE_PATH .'protected/application/plugins/PWA/assets/js/serviceWorker.js', BASE_PATH . 'serviceWorker.js' );
        }

        $app->view->assetManager->publishFolder('pwa/img', 'pwa/img');

        $app->view->enqueueScript('app', 'pwa', 'js/a2h.js');
       
        // add hooks
         $app->hook('template(<<*>>.<<*>>.head):begin', function () use ($app) {
            $this->part('pwa/manifest');
        });

         // add hooks
         $app->hook('template(<<*>>.<<*>>.main-footer):end', function () use ($app) {
            $this->part('pwa/a2hs');
        });
        
    }

    public function register()
    {
        $app = App::i();
            
    }
}
?>
