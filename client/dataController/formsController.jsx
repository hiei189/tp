formsController = {
  getAddresses:function(token,callback){
    backendCom.getAddresses(token,(err,response)=>{
      console.log(response);
      callback(err,response);
    });
  },

  getPlaces:function(search,token,callback){
    backendCom.getPlaces(search,token,(err,response)=>{
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

  deliveryController:function(){
    backendCom.saveDelivery(
      this.delivery.dateShipping,
      this.delivery.hourShipping
    );

  }




}
