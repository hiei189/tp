backendCom = {
  getTokenGuest: function(oldToken,callback){
    let _oldToken = '';


    if (!typeof oldToken === 'undefined'){
      if(Object.keys(oldToken).length !== 0){
        _oldToken = oldToken.access_token;
      }
    }

    const guest = Base64.encode('demo_oauth_client:demo_oauth_secret');
    if(_oldToken===''){
      HTTP.call(
        'POST',
        'http://www.tulipanda.pe/store/api/rest/oauth2/token/client_credentials',
        {
          headers:{
            'Authorization':'Basic ' + guest,
            'X-Oc-Merchant-Language' : 'es',
            'X-Oc-Store-Id': '0',
          }
        },
        (err,response)=>{

          callback(err,response);
          return;
        }
      );
    }else{
      HTTP.call(
        'POST',
        'http://www.tulipanda.pe/store/api/rest/oauth2/token/client_credentials',
        {
          headers:{
            'Authorization':'Basic ' + guest,
            'X-Oc-Merchant-Language' : 'es',
            'X-Oc-Store-Id': '0',
          },
          data:{
            'old_token': _oldToken
          }
        },
        (err,response)=>{
          callback(err,response);
          return;
        }
      );
    }

  },

  getCategories: function(token,callback){
    HTTP.call(
      'GET',
      'http://www.tulipanda.pe/store/api/rest/categories/level/2',
      {
        headers:{
          'Authorization': 'Bearer '+token,
          'X-Oc-Merchant-Language' : 'es',
          'X-Oc-Store-Id': '0',
        }
      },
      (err,response)=>{
        callback(err,response);
        return;
      }
    );
  },

  getProductsByCategory: function(token,category_id,callback){
    HTTP.call(
      'GET',
      'http://www.tulipanda.pe/store/api/rest/products/category/'+category_id,
      {
        headers:{
          'Authorization': 'Bearer '+token,
          'X-Oc-Merchant-Language' : 'es',
          'X-Oc-Store-Id': '0'
        }
      },
      (err,response)=>{
        callback(err,response);
        return;
      }
    );
  },
  getProductsByCategoryLimited: function(token,category_id,limit,page,callback){
    HTTP.call(
      'GET',
      'http://www.tulipanda.pe/store/api/rest/products/category/'+category_id.toString()+'/limit/'+limit.toString()+'/page/'+page.toString(),
      {
        headers:{
          'Authorization': 'Bearer '+token,
          'X-Oc-Merchant-Language' : 'es',
          'X-Oc-Store-Id': '0'
        }
      },
      (err,response)=>{
        callback(err,response);
        return;
      }
    );
  },
  getProductById: function(token,product_id,callback){
    HTTP.call(
      'GET',
      "http://www.tulipanda.pe/store/api/rest/products/"+product_id.toString(),
      {
        headers:{
          'Authorization': 'Bearer '+token,
          'X-Oc-Merchant-Language' : 'es',
          'X-Oc-Store-Id': '0'
        }
      },
      (err,response)=>{
        callback(err,response);
      }
    );
    return;
  },
  createUser:function(token,name,lastname,email,telephone,pass,passconfirm,gender,callback){
    HTTP.call(
      'POST',
      'http://www.tulipanda.pe/store/api/rest/register',
      {
        headers:{
          'Authorization':'Bearer '+token,
        },
        data:{
          //no hay fecha de nacimiento?
        	"firstname": name,//( nombres *obligatorio)
          "lastname": lastname,//( apellidos *obligatorio)
          "dob": new Date(),
          "email": email, //( email *obligatorio)
        	"telephone": telephone,//( telefono *obligatorio)
        	"password": pass,//( password*obligatorio)
        	"confirm": passconfirm,//( password *obligatorio)
          "gender":gender,
        	"agree": "1", //( 0=no acepta, 1=si acepta, aceptar terminos *obligatorio)
        	"customer":"new",
          "city":"Lima",
          "address_1": "Casa",
          "country_id":"Peru",
          "postcode":"lima",
          "zone_id":"1",
        }
      },
      (err,response)=>{
        callback(err,response);
        return;
      }
    )


  },

  loginUser:function(token,email,password,callback){
    HTTP.call(
      'POST',
      'http://www.tulipanda.pe/store/api/rest/login',
      {
        headers:{
          'Authorization':'Bearer '+token,
        },
        data:{
          'email':email,
          'password':password
        }
      },
      (err,response)=>{
        callback(err,response);
        return;
      }
    );
  },

  socialLogin:function(email,fbToken,token,callback){
    HTTP.call(
      'POST',
      'http://www.tulipanda.pe/store/api/rest/sociallogin',
      {
        headers:{
          'Authorization':'Bearer '+token,
        },
        data:{
          'email':email,
          'access_token':fbToken,
          'provider': 'facebook'
        }
      },
      (err,response)=>{
        callback(err,response);
        return;
      }
    );
  },

  getAllCart:function(token,callback){
    HTTP.call(
      'GET',
      'http://www.tulipanda.pe/store/api/rest/cart',
      {
        headers:{
          'Authorization':'Bearer '+token,
        }
      },
      (err,response)=>{
        //console.log(response);
        callback(err,response);
        return;
      }
    );
  },
  removeItem:function(id,token,callback){
    HTTP.del(
      'http://www.tulipanda.pe/store/api/rest/cart',
      {
        headers:{
          'Authorization':'Bearer '+token,
        },
        data:{
          'product_id': id
        }
      },
      (err,response)=>{
        callback(err,response);
        return;
      }
    );
  },

  updateCart:function(id,qty,token,callback){
    HTTP.put(
      'http://www.tulipanda.pe/store/api/rest/cart',
      {
        headers:{
          'Authorization':'Bearer '+token,
        },
        data:{
          quantity:{[id]:qty}
        }
      },
      (err,response)=>{
        callback(err,response);
        return;
      }
    );
  },

  setAllCart:function(token,products,callback){
    //FORMATO en cliente {25:4,42,5,88,3}
    //fomato deseado {{product_id:25,qty:4},{},{}}
    let reformat = [];
    Object.keys(products).forEach((key,i)=>{
      reformat[i] = {product_id:key,"quantity":products[key]}
    });
    HTTP.call(
      'POST',
      'http://www.tulipanda.pe/store/api/rest/cart_bulk',
      {
        headers:{
          'Authorization':'Bearer '+token,
        },
        data: reformat
      },
      (err,response)=>{
        callback(err,response);
        return;
      }
    );
  },

  addItem:function(token,product_id,quantity,callback){
    HTTP.call(
      'POST',
      ' http://www.tulipanda.pe/store/api/rest/cart',
      {
        headers:{
          'Authorization':'Bearer '+token
        },
        data:{

            "product_id":product_id,
            "quantity": quantity

        }
      },
      (err,response)=>{
        callback(err,response);
        return;
      }
    );
  },

  recoverPassword:function(email,token,callback){
    HTTP.call(
      'POST',
      'http://www.tulipanda.pe/store/api/rest/forgotten',
      {
        headers:{
          'Authorization':'Bearer '+token
        },
        data:{
          'email':email
        }
      },
      (err,response)=>{
        callback(err,response);
        return;
      }
    );
  },

  getPlaces:function(search,token,callback){
    HTTP.call(
        'GET',
        'http://www.tulipanda.pe/store/api/rest/places/search/'+search,
        {
          headers:{
            Authorization: 'Bearer ' + token
          }
        },
        (err,response)=>{
          callback(err,response);
          return;
        });
  },

  addAddress:function(firstname,lastname,telephone,place_id,address,reference,token,callback){
    console.log(telephone);
    console.log(reference);
    HTTP.call(
      'POST',
      'http://www.tulipanda.pe/store/api/rest/shippingaddress',
      {
        headers:{
          'Authorization':'Bearer '+token,
          'X-Oc-Merchant-Language' : 'es',
          'X-Oc-Store-Id': '0'
        },
        data:{
          'firstname': firstname,
          'lastname': lastname,
          'telephone': telephone,
          'place_id': place_id,
          'address_1': address,
          'reference': reference,
          'shipping_address': 'new'
        }
      },
      (err,response)=>{
        callback(err,response);
        return;
      }
    );
  },

  getAddresses:function(token,callback){
    HTTP.call(
      'GET',
      'http://www.tulipanda.pe/store/api/rest/shippingaddress',
      {
        headers:{
          'Authorization':'Bearer '+token,
          'X-Oc-Merchant-Language' : 'es',
          'X-Oc-Store-Id': '0'
        }
      },
      (err,response)=>{
        callback(err,response);
        return;
      }
    );
  },

  saveDelivery:function(day,hour,ocassion_id,message,anonymous,delivery,token,callback){
    HTTP.call(
      'POST',
      'http://www.tulipanda.pe/store/api/rest/delivery',
      {
        headers:{
          'Authorization':'Bearer '+ token,
          'X-Oc-Merchant-Language' : 'es',
          'X-Oc-Store-Id': '0'
        },
        data:{
          day:day,
          hour: hour,
          ocassion_id:ocassion_id,
          message: message,
          anonymous: anonymous,
          delivery: delivery
        }
      },
      (err,response)=>{
        callback(err,response);
        return;
      }
    );
  }
}
