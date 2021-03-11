<?php 
    use MapasCulturais\App;
    $app = App::i();
?>
<link rel="manifest" href="<?=$app->getBaseUrl();?>manifest.json" />

<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="Add to Home">

<link rel="shortcut icon" type="image/x-icon" href="<?php $this->asset('pwa/img/icon-512x512.png') ?>" />
<link rel="shortcut icon" sizes="16x16" href="<?php $this->asset('pwa/img/icon-16x16.png') ?>">
<link rel="shortcut icon" sizes="192x192" href="<?php $this->asset('pwa/img/icon-192x192.png')?>">
