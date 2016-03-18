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
}

}
