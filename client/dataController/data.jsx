data = {
  initFB:function(callback){

    window.fbAsyncInit = function() {
      FB.init({
        appId      : '575789869242959',
        cookie     : true,
        xfbml      : true,
        version    : 'v2.5'
      });

      FB.getLoginStatus((response)=> {
        Session.set('fbResponse',response);
        Session.set('gotFbResponse',true);
        callback(response);
        return;
      });
    };
    this.loadFB();
  },
  loadFB:function(){
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  },

  initToken:function(callback){
    var token = Session.get('token');
    let isTokenPersistent = Object.keys(token).length != 0; //si hay token entonces habia sesion

    backendCom.getTokenGuest(token.access_token,(err,response)=>{
      if(response.data){
        if(isTokenPersistent){Session.setPersistent('token',response.data);}
        else {Session.set('token',response.data);}
      }
      callback(err,response);
      return;
    });
  },

  socialLogin:function(token,callback){
    FB.login((response)=>{
      FB.api("/me",{fields: 'email'},
         (response)=>{
          if (response && !response.error) {
            this.socialReLogin(token,(err,response)=>{
              callback(err,response);
              return;
            });
          }
      });
    },{scope: 'email'});
  },

  socialReLogin:function(token,callback){
    FB.api("/me",{fields: 'email'},
      (response)=>{
        if (response && !response.error) {
          var email = response.email;

          FB.getLoginStatus((response)=>{
            var fbToken = response.authResponse.accessToken
            backendCom.socialLogin(email,fbToken,token,(err,response)=>{
              if(response.data.success){
                Session.set('user',response.data.data);
                Session.set('fbUser',true);
                CartController.getAllItems(token,(err,response)=>{});
              }
              callback(err,response);
              return;
            });
          });
        }

    });
  },

  loginUser:function(persistent,email,password,token,callback){
    backendCom.loginUser(token,email,password,
      (err,response)=>{
        if(response.data.success){
          CartController.getAllItems(token,(err,response)=>{});
          if(persistent){
            Session.setPersistent('token',token); //Si se solicita recordar sesion
            Session.setPersistent('user',response.data.data);
          }else{
            Session.set('user',response.data.data);
          }
          callback(err,response);
          return;
        }
    });
  },

  getCategories:function(callback){
    var token = Session.get('token');
    backendCom.getCategories(token.access_token,(err,response)=>{
      if(!err){
        if(response.data.success){
          Session.set('categories',response.data.data);
        }
      }
      callback(err,response);
    });
  }
}
