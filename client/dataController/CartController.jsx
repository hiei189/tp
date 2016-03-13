
CartController = {
  addItem:function(id,quantity,token,callback){
    backendCom.addItem(token,id,quantity,(err,response)=>{
      this.firstResponse = response;
      if(!err){
        if(response.data.success){
          this.getAllItems(token,callback);
        }
      }else{
        throw new Meteor.error('Error de conexión');
      }
      callback(err,response);
      return;
    });
  },

  removeItem:function(id,token,callback){
    backendCom.removeItem(id,token,(err,response)=>{
      if(!err){
        if(response.data.success){
          this.getAllItems(token,callback);
        }
      }else{
        throw new Meteor.error('Error de conexión');
      }
      callback(err,response);
    });
  },

  removeOneItem:function(id,oldQty,token,callback){
    qty = oldQty - 1;
    backendCom.updateCart(id,qty,token,(err,response)=>{
      if(!err){
        if(response.data.success){
          this.getAllItems(token,callback);
        }
      }else{
        throw new Meteor.error('Error de conexión');
      }
      callback(err,response);
    });
  },

  getAllItems:function(token,callback){
    let items={};
    let qty = 0;
    backendCom.getAllCart(token,(err,response)=>{
      if(response.data.success){
        response.data.data.products.map((item)=>{
          qty = qty + Number(item.quantity);
        });
        Session.set('shoppingCart',response.data.data);
        Session.set('cartshopNumber',(qty).toString());
        Session.set('isShoppingCartEmpty',false);
      }else{
        Session.set('isShoppingCartEmpty',true);
        Session.set('cartshopNumber','0');
        Session.set('shoppingCart','');
      }
      callback(err,response);
      return
    });
  }
};
