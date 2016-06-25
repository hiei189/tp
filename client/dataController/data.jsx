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
                Session.set('gotUser',true);
                CartController.getAllItems(token,(err,response)=>{});
              }
              callback(err,response);
              return;
            });
          });
        }

    });
  },

  loginUser:function(persistent,email,password,callback){
    var token = Session.get('token');
    backendCom.loginUser(token.access_token,email,password,
      (err,response)=>{
        if(response.data.success){
          CartController.getAllItems(token.access_token,(err,response)=>{});
          if(persistent){
            Session.setPersistent('token',token); //Si se solicita recordar sesion
            Session.setPersistent('user',response.data.data);
            Session.setPersistent('gotUser',true);
            Session.set('fbUser',false);
          }else{
            Session.set('user',response.data.data);
            Session.set('gotUser',true);
            Session.set('fbUser',false);
          }
        }
        callback(response.data);
        return;
    });
  },

  logout:function(callback){
    var token = Session.get('token');
    backendCom.logout(token.access_token,(err,response)=>{
      if(err){
        throw new Meteor.Error('200','Error cerrando sesion');
      }
      callback(response.data);
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
  },

  getProductById:function(category,callback){
    var token = Session.get('token');
    backendCom.getProductById(token.access_token,category,'500x500',(err,response)=>{
      if(!err){
        Session.set('product' + category.toString(),response.data);
      }else{
        throw new Meteor.Error('200','Error obteniendo el producto');
      }
      callback(err,response);
    });
  },

  getProductsByCategory:function(category_id,callback){
    var token = Session.get('token');
    backendCom.getProductsByCategory(token.access_token,category_id, '200x200',
    (err,response)=>{
      if(!err){
        Session.set('Category'+category_id.toString(),response.data);
      }else {
        Session.set('Category'+category_id.toString(),'ERROR');
        throw new Meteor.Error('200','Error obteniendo los productos');
      }
      callback(err,response);
    });
  },

  getProductsByCategoryLimited(category_id,page,callback){
    var token = Session.get('token');
    const offset = 9;
    backendCom.getProductsByCategoryLimited(
      token.access_token,
      category_id,
      offset,page,(err,response)=>{
        if (err){
          Session.set('Category'+category_id.toString(),'ERROR');
          throw new Meteor.Error('200','Error obteniendo los productos');
        }
        Session.set('Category'+category_id.toString(),response.data);
        callback(response.data);
    });
  },

  createUser:function(model,callback){
    var token = Session.get('token');
    backendCom.createUser(token.access_token,model.firstname,model.lastname,model.email,
    model.telephone,model.password,model.repeatedPassword,model.gender,model.datebirth,
    (err,response)=>{
      if(!err){
        callback(response.data);
        if(response.data.success){
          Session.set('user',response.data.data);
          Session.set('gotUser',true);
        }
      }
    });
  },

  updateUserData:function(model,callback){
    var token = Session.get('token');
    backendCom.updateUserData(token.access_token,model.firstname,model.lastname,model.dob,
    model.email, model.telephone,model.gender,
      (err,response)=>{
        if(!err){
          callback(response.data);
          if(response.data.success){
            Session.set('user',response.data.data);
          }
        }
      }
    );
  },

  updatePassword:function(password,repeatedPassword,callback){
    var token = Session.get('token');
    if(password.length>6){
      if(password === repeatedPassword){
        backendCom.updatePassword(token.access_token,password,repeatedPassword,
          (err,response)=>{
            if(err){
              throw new Meteor.error('Error updating password');
            }
            callback(response.data);
            return;
          }
        )
      }
    }
  },
  recoverPassword:function(email,callback){
    var token = Session.get('token');
    backendCom.recoverPassword(email, token.access_token,  (err,response)=>{
      if(err){
        throw Meteor.Error('Error de conexion');
      }
      callback(response.data);
    });
  }
}
