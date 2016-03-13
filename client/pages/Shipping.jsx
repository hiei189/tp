const { TextField, TimePicker, SelectField, DatePicker,RaisedButton,MenuItem} = mui;
const {ContentSave} = mui.SvgIcons;
const Colors = mui.Styles.Colors;

const styles = {
  container: {
    display: 'flex',
    flexDirection:'column',
    margin: 'auto',
    justifyContent:'space-around',
    fontFamily:'Roboto,sans-serif'
  },
  field: {
    margin: 'auto',
    width:'60%',
    minWidth:'256'
  },
  form:{
    textAlign:'center'
  },
  headers:{
    margin:'auto',
    width:'60%',
    textAlign:'center',
    color:Colors.pink800
  }
}

Shipping = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  componentWillMount: function() {
    this.error = {};
    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setFullYear(this.minDate.getFullYear());
    this.maxDate.setFullYear(this.maxDate.getFullYear()+1);
    this.setState({
      dateShipping: this.maxDate
    });
    Tracker.autorun((c)=>{
      this.trackerId_c = c;
      if(Session.get('isShoppingCartEmpty')){
        this.setState({
          noProducts: true
        });
      }else{
        this.shoppingCart = Session.get('shoppingCart'); //Leyendo carrito de compras
        this.setState({
          total: this.shoppingCart.totals[0].text,
          gotProducts: false,
          noProducts: false
        });
        let arrayProducts = [];
        this.shoppingCart.products.map((product)=>{
          arrayProducts = arrayProducts.concat(product);
        });
        this.setState({products: arrayProducts,gotProducts:true});
      }
    });

    this.token = Session.get('token');

    backendCom.getAddresses(this.token.access_token,(err,response)=>{console.log(response)});

    backendCom.getOcassions(this.token.access_token,(err,response)=>{
      console.log(err);
      console.log(response);
    })


  },
  handleChangeTimePicker12:function(err, time) {
    this.refs.picker12hr.setTime(time);
  },

  componentWillUnmount: function() {
    this.trackerId_c.stop();
  },
  getInitialState: function() {
    return {
      firstname: '',
      lastname:'',
      telephone: '',
      shippingPlace:'',
      shippingAddress:'',
      reference:'',
      dateShipping:'',
      hourShipping:'',
      occasions:'',
      message:'',
      items: [],
      gotItems:false,
      total:'',
      noProducts:true,
      gotProducts:false
    };
  },

  saveShippingAddress:function(){
    backendCom.addAddress(
      this.state.firstname,
      this.state.lastname,
      this.state.telephone,
      '2',this.state.shippingPlace,
      this.state.reference,
      this.state.shippingAddress,
      this.token.access_token,   ////////////QUE DIFERENCIA HAY ENTRE SHIPPING ADDRESSSS!
      (err,response)=>{
      console.log(response);
      }
    );
  },

  render: function() {
    return (
      <div>
        <div style={styles.container}>
          <h2 style={styles.headers}>Datos de entrega</h2>
          <form style={styles.form}>
            <SelectField style={styles.field}
              floatingLabelText="Elige una dirección">
            </SelectField><br/>
            <TextField
              floatingLabelText="Nombres"
              type="string"
              id ="name"
              valueLink={this.linkState('firstname')}
              style ={styles.field}
              errorText={this.error.name}
            /><br/>
            <TextField
              floatingLabelText="Apellidos"
              type="string"
              id ="name"
              valueLink={this.linkState('lastname')}
              style ={styles.field}
              errorText={this.error.name}
            /><br/>
            <TextField
              floatingLabelText="Teléfono"
              type="number"
              id ="telephone"
              valueLink={this.linkState('telephone')}
              style ={styles.field}
              errorText={this.error.telephone}
            /><br/>
            <TextField
              floatingLabelText="Lugar de entrega"
              type="string"
              id ="shippingPlace"
              valueLink={this.linkState('shippingPlace')}
              style ={styles.field}
              errorText={this.error.shippingPlace}
            /><br/>
            <TextField
              floatingLabelText="Dirección de entrega"
              type="string"
              id ="shippingAddress"
              valueLink={this.linkState('shippingAddress')}
              style ={styles.field}
              errorText={this.error.shippingAddress}
            /><br/>
            <TextField
              floatingLabelText="Referencia"
              type="string"
              id ="reference"
              valueLink={this.linkState('reference')}
              style ={styles.field}
              multiline={true}
              errorText={this.error.reference}
            /><br/>
            <RaisedButton
              icon={<ContentSave />}
              primary={true}
              label={'Guardar'}
              onTouchTap={this.saveShippingAddress}/><br/>
          </form><br/>


          <h2 style={styles.headers}>Datos de delivery</h2>
          <form style={styles.form}>
            <DatePicker
              floatingLabelText="Fecha de entrega"
              textFieldStyle = {{width:'100%'}}
              minDate = {this.minDate}
              maxDate = {this.maxDate}
              defaultDate={this.maxDate}
              valueLink={this.linkState('dateShipping')}
              style = {styles.field}
              errorText={this.error.dateShipping}
            /><br/>
            <TimePicker
              floatingLabelText="Hora de entrega"
              textFieldStyle = {{width:'100%'}}
              style = {styles.field}
              format="24hr"
              ref="picker24hr"
              onChange={this.handleChangeTimePicker12}
              errorText={this.error.hourShipping}
            /><br/>
            <TextField
              floatingLabelText="Motivo"
              type="string"
              id ="occasions"
              valueLink={this.linkState('occasions')}
              style ={styles.field}
              errorText={this.error.occasions}
            /><br/>
            <TextField
              floatingLabelText="Mensaje"
              type="string"
              id ="message"
              multiline={true}
              valueLink={this.linkState('message')}
              style ={styles.field}
              rows = {2}
              errorText={this.error.message}
            /><br/>
            <TextField
              floatingLabelText="Costo de envío"
              type="string"
              id ="priceShipping"
              multiline={true}
              valueLink={this.linkState('priceShipping')}
              style ={styles.field}
              errorText={this.error.priceShipping}
            /><br/>
            <RaisedButton
              primary={true}
              label={'Costo'}
              onTouchTap={this.calculatePriceShipping}/><br/>
            <RaisedButton
              icon={<ContentSave />}
              primary={true}
              label={'Guardar'}
              onTouchTap={this.next}/><br/>
          </form><br/>
        </div>
      </div>
    );
  }

});
