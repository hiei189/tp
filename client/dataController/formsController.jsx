formsController = {
  getAddresses:function(token,callback){
    backendCom.getAddresses(token,(err,response)=>{
      callback(err,response);
    });
  },

  getAllPlaces:function(callback){
    const token = Session.get('token');
    backendCom.getAllPlaces(token.access_token,(err,response)=>{
      if(err){
        throw new Meteor.error('Error getting available places');
      }
      callback(response.data);
    });
  },

  searchInPlaces:function(search,callback){
    const token = Session.get('token');
    backendCom.searchInPlaces(search,token.access_token,(err,response)=>{
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
    addAddress:function(model,callback){
      const token = Session.get('token');
      backendCom.addAddress(
        model.firstname,
        model.lastname,
        model.telephone,
        model.place_id,
        model.shippingAddress,
        model.reference,
        token.access_token,
        (err,response)=>{
          if(response.data.success){
            callback(response.data);
          }else{

          }
        }
      );
    },

    updateAddress:function(model,callback){
      const token = Session.get('token');
      backendCom.updateAddress(
        model.firstname,
        model.lastname,
        model.telephone,
        model.place_id,
        model.shippingAddress,
        model.reference,
        model.selectedAddress,
        token.access_token,
        (err,response)=>{
          if(err){
            throw new Meteor.error('Error de conexion');
          }
          callback(response.data);
        }
      );
    },

    removeAddress:function(model,callback){
      const token = Session.get('token');
      backendCom.removeAddress(
        model.firstname,
        model.lastname,
        model.telephone,
        model.place_id,
        model.shippingAddress,
        model.reference,
        model.selectedAddress,
        token.access_token,
        (err,response)=>{
          if(err){
            throw new Meteor.error('Error de conexion');
          }
          callback(response.data);
        }
      );
    },
    selectAddress:function(model,callback){
      const token = Session.get('token');
      backendCom.selectAddress(
        model.firstname,
        model.lastname,
        model.telephone,
        model.place_id,
        model.shippingAddress,
        model.reference,
        model.selectedAddress,
        token.access_token,
        (err,response)=>{
          if(err){
            throw new Meteor.error('Error de conexion');
          }
          callback(response.data);
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
        if(err){
          Session.set('ERROR',response.data);
          throw new Meteor.error('Error de conexión');
        }
        Session.set('deliveryHours',response.data);
        callback(response.data);
      }
    )
  },

  getOcassions:function(callback){
    const token = Session.get('token');
    backendCom.getOccasions(token.access_token,(err,response)=>{
      if(err){
        throw new Meteor.error('Error de conexión');
      }
      console.log(response);
      if(response.data.success){
        callback(response.data);
      }
    });
  }




}
