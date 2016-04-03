  // Meteor.startup(function(){
  //   if (window.matchMedia("only screen and (min-width: 1px) and (max-width: 640px)").matches){
  //     Session.set('device-screensize','small');
  //   }
  //
  //   window.matchMedia("only screen and (min-width: 1px) and (max-width: 640px)").addListener((screensize)=>{
  //     console.log('small');
  //     Session.set('device-screensize','small');
  //     return;
  //   });
  //
  //   if (window.matchMedia("only screen and (min-width: 641px) and (max-width: 1023px)").matches){
  //     Session.set('device-screensize','medium');
  //   }
  //
  //   window.matchMedia("only screen and (min-width: 641px) and (max-width: 1023px)").addListener((screensize)=>{
  //     Session.set('device-screensize','medium');
  //     return;
  //   });
  //
  //   if (window.matchMedia("only screen and (min-width: 1024px) and (max-width: 1440px)").matches){
  //     Session.set('device-screensize','large');
  //   }
  //
  //   window.matchMedia("only screen and (min-width: 1024px) and (max-width: 1440px)").addListener((screensize)=>{
  //     Session.set('device-screensize','large');
  //     return;
  //   });
  //
  //   if (window.matchMedia("only screen and (min-width: 1441px) and (max-width: 1919px)").matches){
  //     Session.set('device-screensize','xlarge');
  //   }
  //
  //   window.matchMedia("only screen and (min-width: 1441px) and (max-width: 1919px)").addListener((screensize)=>{
  //     Session.set('device-screensize','xlarge');
  //     return;
  //   });
  //
  //   if (window.matchMedia("only screen and (min-width: 1920px)").matches){
  //     Session.set('device-screensize','xxlarge');
  //   }
  //
  //   window.matchMedia("only screen and (min-width: 1920px)").addListener((screensize)=>{
  //     Session.set('device-screensize','xxlarge');
  //     return;
  //   });
  //
  //   if (window.matchMedia("only screen and (orientation: portrait)").matches){
  //     Session.set("device-orientation", "portrait");
  //   }else{
  //     Session.set("device-orientation", "landscape");
  //   }
  //
  //   window.matchMedia("only screen and (orientation: portrait)").addListener((orientation)=>{
  //     if (orientation.matches){
  //       Session.set("device-orientation","portrait");
  //     }else{
  //       Session.set("device-orientation","landscape");
  //     }
  //     return;
  //   });
  //
  //   retina = "only screen and (-webkit-min-device-pixel-ratio: 2)," + "only screen and (min--moz-device-pixel-ratio: 2)," + "only screen and (-o-min-device-pixel-ratio: 2/1)," + "only screen and (min-device-pixel-ratio: 2)," + "only screen and (min-resolution: 192dpi)," + "only screen and (min-resolution: 2dppx)"
  //
  //   if (window.matchMedia(retina).matches){
  //     Session.set("device-retina", true);
  //   }else{
  //     Session.set("device-retina", false);
  //   }
  //
  // });
