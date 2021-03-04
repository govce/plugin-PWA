<?php

namespace PWA;

use MapasCulturais\App;
use MapasCulturais\i;

/**
 * Plugin PWA
 * config examples
 * 'PWA' => [
 *             'namespace' => 'PWA',
 *             'config' => ['onesignal_key' => '99999999999-9999999999-999999999']
 *  ],
 */
class Plugin extends \MapasCulturais\Plugin
{
    function __construct(array $config = [])
    {
        parent::__construct($config);
    }

    public function _init()
    {
        $app = App::i();
        $plugin = $this;
        
        $this->copyFileToWebRootFolder('assets/manifest.json');
        $this->copyFileToWebRootFolder('assets/serviceWorker.js');
        $this->copyFileToWebRootFolder('assets/js/OneSignalSDKWorker.js');
        $this->copyFileToWebRootFolder('assets/js/OneSignalSDKUpdaterWorker.js');

        if (!file_exists(BASE_PATH . 'assets/pwa/img')) {
            $app->view->assetManager->publishFolder('pwa/img', 'pwa/img');
        }
       
        // add hooks
         $app->hook('template(<<*>>.<<*>>.head):begin', function () use ($app) {
            $this->part('pwa/manifest');
        });

         // add hooks
         $app->hook('template(<<*>>.<<*>>.main-footer):end', function () use ($app,$plugin) {
            $this->part('pwa/a2hs');
            $this->part('pwa/onesignal',['config' => $plugin->config]);
        });
        
    }

    public function register()
    {
        $app = App::i();            
    }

    public function copyFileToWebRootFolder($file, $fileName = null) {
        $fileName = ($file == null)? basename(PLUGINS_PATH.$file) : $fileName;
        $fileWebRootPath = BASE_PATH . $fileName;
        $filePluginPath = PLUGINS_PATH ."PWA/$file";

        if (!file_exists($fileWebRootPath)) {
            copy($filePluginPath, $fileWebRootPath);
        }
    }
}
?>
