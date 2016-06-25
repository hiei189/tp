
utils = {
   mapObject:function(object, callback) {
    return Object.keys(object).map(function (key) {
      return callback(key, object[key]);
    });
  },
  createDateFromString: function (date){
    const arrayDate = date.split('-');
    const d = new Date(arrayDate[0],(parseInt(arrayDate[1])-1).toString() ,arrayDate[2]);
    return d;
  },
  createDateFromDMY(d,m,y){
    const date = new Date(y,m-1,d);
    return date;
  }
}
