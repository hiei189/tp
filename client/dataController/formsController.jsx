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
        throw new Meteor.Error('Error getting available places');
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
            throw new Meteor.Error('Error de conexion');
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
            throw new Meteor.Error('Error de conexion');
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
            throw new Meteor.Error('Error de conexion');
          }
          callback(response.data);
        }
      );
    }
  },

  deliveryController:{
    addDelivery:function(model,callback){
      const token = Session.get('token');
      backendCom.addDelivery(
        model.dateDelivery,
        model.deliveryHourMenu,
        model.occasions,
        model.message,
        model.anonymous?1:0, //revisar anonymous
        token.access_token,
        (err,response)=>{
          //NO RECIBE DATA DE RESPUESTA,PERO SI GRABA.
          if(response.data.success){
            callback(response.data);
            return;
          }
          Session.set('DialogMessage',response.data.Error);
          Session.set('isAnErrorDialog',true);
          Session.set('DialogTitle','No se pudo agregar la direccion de delivery');
          Session.set('showDialog',true);
        }
      );
    }
  },

  getDeliveryHours:function(token,callback){
    backendCom.getDeliveryHours(
      token,(err,response)=>{
        if(err){
          Session.set('Error',response.data);
          throw new Meteor.Error('Error de conexión');
        }
        Session.set('deliveryHours',response.data);
        callback(response.data);
      }
    )
  },

  getOccasions:function(callback){
    const token = Session.get('token');
    backendCom.getOccasions(token.access_token,(err,response)=>{
      if(err){
        throw new Meteor.Error('Error de conexión');
      }
      callback(response.data);
    });
  },

  payment:{
    getPaypalInfo:function(callback){
      const token = Session.get('token')
      backendCom.getPaypalInfo(token.access_token,(err,response)=>{
        if(err){
          throw new Meteor.Error(200,'Error de conexion');
        }
        callback(response.data);
      });
    },
    getCulqi:function(callback){
      const token = Session.get('token');
      backendCom.getCulqi(token.access_token,(err,response)=>{
        if (err){
          throw new Meteor.Error(200,'Error obteniendo datos');
        }
        callback(response.data);
      });
    },
    setBillInfo:function(model,callback){
      const token = Session.get('token');
      backendCom.setBillInfo(model.firstname,model.lastname,model.address,model.telephone,
        model.country,model.city,
        token.access_token,(err,response)=>{
        if(err){
          throw new Meteor.Error(200,'Error enviando datos');
        }
        callback(response.data);
      });
    },
    confirmPayment:function(confirm,callback){
      const token = Session.get('token');
      backendCom.confirmPayment(confirm,token.access_token,(err,response)=>{
        if(err){
          throw new Meteor.Error(200,'Error enviando datos');
        }
        callback(response.data);
      });
    }
  }





}
