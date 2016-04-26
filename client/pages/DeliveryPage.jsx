const Colors = mui.Styles.Colors;
const {TextField, TimePicker, DropDownMenu, SelectField, DatePicker,RaisedButton,MenuItem,AutoComplete,CircularProgress,FloatingActionButton} = mui;
const {ContentSend} = mui.SvgIcons;
const {NavigationRefresh} = mui.SvgIcons;

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
    width:'100%',
  },
  fieldPrice: {
    margin: 'auto',
    width:'calc(100% - 88px)',
  },
  form:{
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    width:'60%',
    minWidth:'256',
    margin:'auto'
  },
  headers:{
    margin:'auto',
    width:'60%',
    textAlign:'center',
    color:Colors.pink500
  },
  footer:{
    position:'fixed',
    display:'flex',
    justifyContent:'flex-end',
    left:0,
    bottom:0,
    height:60,
    width:'100%',
    backgroundColor: Colors.grey100,
    minWidth: '100%',
    alignItems:'center'
  }
}

DeliveryPage = React.createClass({

  mixins: [React.addons.LinkedStateMixin],
  getDefaultProps: function() {
    return {
      footer:true
    };
  },
  getInitialState: function() {
    this.placeFinished = 'NOT FINISHED';
    this.place_id = 'X';
    return {
      dateDelivery:'',
      hourDelivery:'',
      occasions:'',
      priceDelivery:'',
      message:'',
      total:'',
      addressesLoading: true,
      deliveryHours: 'NO_DATA'
    };
  },

  componentWillMount: function() {
    this.error={};
    this.minDate = new Date();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear()+1);
    this.setState({
      dateShipping: this.maxDate
    });
    this.token = Session.get('token');
    backendCom.getOccasions(this.token.access_token,(err,response)=>{
      console.log(response);
    });

    formsController.getDeliveryHours(this.token.access_token,(response)=>{
      this.setState({
        deliveryHours: Session.get('deliveryHours')
      });
      console.log(Session.get('deliveryHours'));
    });

    Tracker.autorun((a)=>{
      this.trackerId_a = a;

      if(Session.get('isShoppingCartEmpty')){
        this.setState({
          noProducts: true
        });
      }else{
        this.shoppingCart = Session.get('shoppingCart');
        this.setState({
          total: this.shoppingCart.totals[0].text,
          noProducts: false
        });
      }
    });

  },

  componentWillUnmount:function(){
    this.trackerId_a.stop();
  },

  errorMessages: {
    wordsError: "Solo use letras (a-z)",
    isDefaultRequiredValue: 'Este campo es requerido'
  },

  getDeliveryHours:function(){
    if(this.state.deliveryHours === 'NO_DATA'){
      return
      (<MenuItem>
        <CircularProgress />
      </MenuItem>);
    }
    else{
      return this.state.deliveryHours.map((hour)=>{
        return(
          <MenuItem
            key={hour.delivery_hour_id}
            value = {hour.name}
            primaryText={hour.name}/>
        );
      });
    }
  },

  handleDeliveryMenu: function(event, index, deliveryMenu) {
    this.setState({deliveryMenu})
  },

  render: function() {

    let { wordsError } = this.errorMessages;

    return (
      <div>
        <h2 style={styles.headers}>Datos de delivery</h2>

        <Formsy.Form
          onValidSubmit={this.submit}
          onValid={this.validateForm}
          onInvalid={this.invalidForm}
          style ={styles.form}>
          <FormsyDate
            required
            floatingLabelText="Fecha de entrega"
            textFieldStyle = {{width:'100%'}}
            minDate = {this.minDate}
            maxDate = {this.maxDate}
            name = 'dateDelivery'
            defaultDate={this.maxDate}
            value={this.state.dateDelivery}
            style = {styles.field}
          />
          <FormsySelect
            name = {'deliveryHourMenu'}
            ref = {'deliveryHourMenu'}
            required
            style={styles.field}
            floatingLabelText="Elige una hora de entrega"
            onChange={this.handleDeliveryMenu}>
            {this.getDeliveryHours()}
          </FormsySelect>

          <FormsyTime
            required
            floatingLabelText="Hora de entrega"
            textFieldStyle = {{width:'100%'}}
            style = {styles.field}
            format="24hr"
            name = "hourDelivery"
            ref="picker24hr"
            value={this.state.hourDelivery}
            onChange={this.handleChangeTimePicker12}
          />
          <FormsyText
            required
            floatingLabelText="Motivo"
            type="string"
            id ="occasions"
            name = "ocassions"
            value={this.state.ocassions}
            style ={styles.field}
          />

          <FormsyText
            required
            floatingLabelText="Mensaje"
            type="string"
            id ="message"
            name = "message"
            multiLine={true}
            rows={3}
            value={this.state.message}
            style ={styles.field}
          />

          <div style={{width:'100%'}}>
            <FormsyText
              required
              floatingLabelText="Costo de envío"
              type="string"
              id ="priceDelivery"
              name = "priceDelivery"
              value={this.state.priceDelivery}
              style ={styles.fieldPrice}
            />
            <RaisedButton
              primary={true}
              onTouchTap={this.calculatePriceShipping}>
              <NavigationRefresh style={{fill:'white'}}/>
            </RaisedButton>
          </div>


          {this.props.footer?<div style={styles.footer}>
            <h3 style={{marginRight:16}} >{'TOTAL: '+ this.state.total}</h3>
            <FloatingActionButton
              type="submit">
              <ContentSend />
            </FloatingActionButton>
          </div>:false}

        </Formsy.Form>
        <div style={styles.field}>
          {'Nota: el costo de envío se hace en el intervalo de una hora después de la hora seleccionada'}
        </div>

      </div>
    );
  }

});
