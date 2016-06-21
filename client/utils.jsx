
utils = {
  createDateFromString: function (date){
    const arrayDate = date.split('-');
    const d = new Date(arrayDate[0],(parseInt(arrayDate[1])-1).toString() ,arrayDate[2]);
    return d;
  },
  createDateFromDMY(d,m,y){
    return date = new Date(y,m-1,d-1);
  }
}
