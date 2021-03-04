<?php if (isset($config['onesignal-key'])) : ?>
<script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" async=""></script>
<script>
  window.OneSignal = window.OneSignal || [];
  OneSignal.push(function() {
    OneSignal.init({
      appId: "<?=$config['onesignal-key']?>",
    });
  });
</script>
<?php endif; ?>