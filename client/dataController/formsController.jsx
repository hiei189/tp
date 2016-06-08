formsController = {
  getAddresses:function(token,callback){
    backendCom.getAddresses(token,(err,response)=>{
      console.log(response);
      callback(err,response);
    });
  },

  searchInPlaces:function(search,token,callback){
    backendCom.searchInPlaces(search,token,(err,response)=>{
      console.log(response);
      if(!err){
        if(response.content!=="[]"){
          callback(response.data);
        }else{
          callback('NO_DATA');
        }
      }
    });
  },

  shipping: {

  },

  shippingController:{
    addAddress:function(model,token,callback){
      backendCom.addAddress(
        model.firstname,
        model.lastname,
        model.telephone,
        model.place_id,
        model.shippingAddress,
        model.reference,
        token,
        (err,response)=>{
          if(response.data.success){
            callback(response.data);
          }else{

          }
        }
      );
    }
  },

  delivery:{
    errors:{

    }
  },

  deliveryController:{
    addDelivery:function(model,token,callback){
      backendCom.addDelivery(
        model.dateDelivery,
        model.deliveryHourMenu,
        model.ocassions,
        model.message,
        '0', //revisar anonymous
        token,
        (err,response)=>{
          console.log(err);
          console.log(response);
          //NO RECIBE DATA DE RESPUESTA,PERO SI GRABA.
          if(response.data.success){
            callback(response.data);
          }
        }
      );
    }
  },

  getDeliveryHours:function(token,callback){
    backendCom.getDeliveryHours(
      token,(err,response)=>{
        if (!err){
          Session.set('deliveryHours',response.data);
          callback(response.data);
        }
      }
    )
  }




}
