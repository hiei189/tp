const Colors = mui.Styles.Colors;
const {TextField, TimePicker, DropDownMenu, SelectField, DatePicker,RaisedButton,MenuItem,CircularProgress,FloatingActionButton} = mui;
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
    minWidth:'212',
  },
  fieldPrice: {
    margin: 'auto',
    width:'calc(100% - 88px)',
  },
  form:{
    margin: 'auto',
    width:'100%'
  },
  headers:{
    margin:'auto',
    width:'60%',
    textAlign:'center',
    color:Colors.pink500
  }
}

DeliveryPage = React.createClass({

  getInitialState: function() {
    this.placeFinished = 'NOT FINISHED';
    this.place_id = 'X';
    return {
      dateDelivery:'',
      hourDelivery:'',
      occasions:'NO_DATA',
      priceDelivery:'',
      message:'',
      addressesLoading: true,
      deliveryHours: 'NO_DATA',
      birth:'',
      fechatest:'',
      typeDate:'string'
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

    //ESTO DEVUELVE NULL
    formsController.getOccasions((res)=>{
      if (this.isMounted()){
        this.setState({
          occasions: res
        });
      }
    });

    formsController.getDeliveryHours(this.token.access_token,(response)=>{
      if(this.isMounted()){
        this.setState({
          deliveryHours: Session.get('deliveryHours')
        });
      }
    });
  },

  componentWillUnmount:function(){

  },

  errorMessages: {
    wordsError: "Solo use letras (a-z)",
    isDefaultRequiredValue: 'Este campo es requerido'
  },

  getOccasions:function(){
    if (this.state.occasions === 'NO_DATA'){
      return (<MenuItem>
        <CircularProgress />
      </MenuItem>)
    }
    return this.state.occasions.map((occasion)=>{
      return (<MenuItem
      key={occasion.occasion_id}
      value={occasion.occasion_id}
      primaryText={occasion.name}/>)
    });

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
            value = {hour.delivery_hour_id}
            primaryText={hour.name}/>
        );
      });
    }
  },
  validateForm:function(){
    model = this.refs.deliveryForm.getModel();
    this.props.onValid(model);
  },

  invalidForm:function(){
    this.props.onInvalid();
  },

  onFocusDate:function(){
    if(this.state.typeDate !== 'date') {this.setState({typeDate: 'date'})}
  },

  onBlurDate:function() {
    if(this.state.typeDate !== 'string') {this.setState({typeDate: 'string'})}
  },
  calculatePriceShipping:function(){
    const model = this.refs.deliveryForm.getModel();

    formsController.deliveryController.addDelivery(model,
      (res)=>{
        if(this.isMounted()){
          this.setState({
            priceDelivery: res.data.price.toString()
          });
        }
      });
  },
  render: function() {

    let { wordsError } = this.errorMessages;

    return (
      <div style={{marginBottom:'50px'}}>
        <Formsy.Form
          onValidSubmit={this.submit}
          onValid={this.validateForm}
          ref = {'deliveryForm'}
          onInvalid={this.invalidForm}
          style ={styles.form}>

          <FormsyDate
            required
            floatingLabelText="Fecha de entrega"
            textFieldStyle = {styles.field}
            onFocus={this.onFocusDate}
            onBlur={this.onBlurDate}
            minDate = {this.minDate}
            maxDate = {this.maxDate}
            name = "dateDelivery"
          />

          {/*<FormsyDate
            required
            floatingLabelText="Fecha de entrega"
            textFieldStyle = {{width:'100%'}}
            minDate = {this.minDate}
            maxDate = {this.maxDate}
            name = 'dateDelivery'
            defaultDate={this.maxDate}
            value={this.state.birth}
            style = {styles.field}
          />*/}
          <FormsySelect
            name = {'deliveryHourMenu'}
            ref = {'deliveryHourMenu'}
            required
            style={styles.field}
            floatingLabelText="Hora de entrega">
            {this.getDeliveryHours()}
          </FormsySelect>

          <FormsySelect
            required
            floatingLabelText="Motivo"
            type="string"
            id ="occasions"
            name = "occasions"
            style ={styles.field}>
            {this.getOccasions()}
            </FormsySelect>

          <FormsyText
            required
            floatingLabelText="Mensaje"
            type="string"
            id ="message"
            name = "message"
            multiLine={true}
            rows={3}
            style ={styles.field}
          />

          <div style={{width:'100%'}}>
            <FormsyText
              required
              disabled = {true}
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

        </Formsy.Form>
        <div style={styles.field}>
          {'Nota: el costo de envío se hace en el intervalo de una hora después de la hora seleccionada'}
        </div>

      </div>
    );
  }

});
