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

        
        $app->view->assetManager->publishFolder('pwa/img', 'pwa/img');
        $app->view->assetManager->publishAsset('pwa/files/manifest.json', 'pwa/files/manifest.json');
        $app->view->assetManager->publishAsset('js/serviceWorker.js', 'pwa/files/serviceWorker.js');

        $app->view->enqueueScript('app', 'pwa', 'js/a2h.js');


        //$app->view->enqueueScript('app', 'pwa', 'js/a2hs.js');
        //$app->view->enqueueScript('app', 'pwa', 'js/addtohomescreen.js');
        //$app->view->enqueueStyle('app', 'pwa', 'js/addtohomescreen.js');

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
