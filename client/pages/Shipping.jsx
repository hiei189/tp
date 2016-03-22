const { TextField, TimePicker, SelectField, DatePicker,RaisedButton,MenuItem,CircularProgress,AutoComplete,FloatingActionButton} = mui;
const {ContentSend} = mui.SvgIcons;

const Colors = mui.Styles.Colors;

function findById(source, address_id) {
    return source.filter(function( obj ) {
        // coerce both obj.id and id to numbers
        // for val & type comparison
        return +obj.address_id === +address_id;
    })[ 0 ];
}


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
  form:{
    textAlign:'center',
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
    color:Colors.pink800
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

Shipping = React.createClass({

  mixins: [React.addons.LinkedStateMixin],

  contextTypes: {
    screensize: React.PropTypes.string,
    gotUser: React.PropTypes.bool,
    router:React.PropTypes.object
  },

  componentWillMount: function() {

    this.token = Session.get('token');
    this.setState({
      addressesLoading: true
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

    formsController.getAddresses(this.token.access_token,(err,response)=>{
      if(response.data.success){
        this.setState({
          savedAddress: response.data.data,
          noAddresses: false,
          addressesLoading:false

        });
      }else{
        this.setState({
          noAddresses: true,
          addressesLoading:false
        });
      }
    });
  },

  errorMessages: {
    wordsError: "Solo use letras (a-z)",
    isDefaultRequiredValue: 'Este campo es requerido'
  },

  handleChangeTimePicker12:function(err, time) {
    this.refs.picker12hr.setTime(time);
  },

  componentWillUnmount: function() {
    this.trackerId_a.stop();
    Session.set('shippingFormErrors',{});
  },

  getInitialState: function() {
    this.placeFinished = 'NOT FINISHED';
    this.place_id = 'X';
    return {
      firstname: '',
      lastname:'',
      telephone: '',
      shippingPlace:'',
      shippingAddress:'',
      reference:'',
      placesDataSource:['Ingresa un lugar'],
      addressesLoading: true,
      errors:{},
      total: 0,
      errorPlace:'',
      place:'',
      validForm:false
    };
  },

  _handleTouchMenuAutoComplete(e){
    this.place_id = e.currentTarget.id;
    this.placeFinished = 'FINISHED';
    formsController.shipping.place_id = this.place_id;
    this.setState({
      errorPlace: ''
    });
  },

  _handleAutoComplete:function(search){

    this.placeFinished = 'NOT FINISHED';
    this.place_id = 'X';
    formsController.shipping.place_id = this.place_id;

    this.setState({
      place: search
    });
    if(search.length>=3){
      this.setState({
        placesDataSource: [{
          text:'Escoge un lugar válido',
          value: (
            <MenuItem disabled={true}>
              <CircularProgress size={0.5} style={{textAlign:'center',width:'100%',margin:0,padding:0}}/>
            </MenuItem>
              )
          }]
      });

      formsController.getPlaces(search,this.token.access_token,(places)=>{
        if (places !== 'NO_DATA'){
          var arrayPlaces = places.map((place)=>{
            return  {
                text: place.name,
                value:
                  (<MenuItem
                    primaryText={place.name}
                    id={place.place_id}
                    onTouchTap = {this._handleTouchMenuAutoComplete}
                   />),
              }
          });
          this.setState({
            placesDataSource: arrayPlaces
          });
        }else{
          this.setState({
            placesDataSource: [{
              text:'No encontramos ese lugar',
              value: (
                <MenuItem primaryText={'No encontramos ese lugar'} disabled={true}/>
              )
              }]
          });
        }
      });
    }else{
      this.setState({
        placesDataSource: ['Ingresa un lugar']
      });
    }
  },

  getAddresses: function(){
    return this.state.savedAddress.addresses.map((address)=>{
      return (
        <MenuItem
          value = {address.address_id}
          key = {address.address_id}
          primaryText={address.address_1}/>
      );
    });
  },

  handleChangeMenuAddresses:function(event, value, index){
    this.setState({selectedAddress:value});
    formsController.shipping.address_id = value; //GUARDAR ADDRES_ID SELECCIONADO
    if (value !== 'X'){
      let address = findById(this.state.savedAddress.addresses,value);
      console.log(address);
      this.place_id=address.place_id;
      this.placeFinished = 'FINISHED';
      formsController.shipping.isSavedAddress = true;
      this.setState({
        disabledForm: true,
        firstname: address.firstname,
        lastname: address.lastname,
        telephone: address.telephone,
        place: address.place,
        shippingAddress:address.address_1,
        reference: address.reference
      });
    }else{
      this.placeFinished = 'NOT FINISHED';
      formsController.shipping.isSavedAddress = false;  //DETERMINAR SI HUBO CAMBIO
      this.place_id = 'X';
      this.setState({
        disabledForm: false,
        firstname: '',
        lastname: '',
        telephone: '',
        place: '',
        shippingAddress: '',
        reference: ''
      });
    }
  },

  validatePlace:function(event){
   if(this.place_id === 'X'){
     this.setState({
       errorPlace: 'Debe seleccionar un lugar válido'
     });
   }else{
     this.setState({
       errorPlace: ''
     });
   }
  },

  validateForm:function(){
    console.log('valid');
    if(this.place_id==='X'){
      this.setState({
        validForm: false
      });
    }else{
      this.setState({
        validForm: true
      });
    }
  },

  invalidForm:function(){
    this.setState({
      validForm: false
    });
  },

  submit:function(model,reset){
    this.validatePlace();
    model.place_id = this.place_id;
    if(model.place_id!=='X')
    {
      model.place_id = this.place_id;
      if(this.context.gotUser){
        if(model.selectedAddress !== 'X'){
          formsController.shippingController.addAddress(model,this.token.access_token,
            (response)=>{
              Session.set('shoppingShipping',response.data);
          });
        }
        else{
          Session.set('shoppingShipping',model);
        }
        this.context.router.push('/delivery');
      }
      else{
        this.context.router.push('/login');
      }
    }
  },

  render: function() {
    let { wordsError } = this.errorMessages;

    return (
      <div>
        <div style={styles.container}>
          <h2 style={styles.headers}>Datos de entrega</h2>

          <Formsy.Form
            onValidSubmit={this.submit}
            onValid={this.validateForm}
            onInvalid={this.invalidForm}
            style ={styles.form}>

            <FormsySelect
              name='selectedAddress'
              ref='selectedAddress'
              required
              onChange={this.handleChangeMenuAddresses}
              style ={styles.field}
              floatingLabelText="Elige una dirección">
              <MenuItem value={'X'} primaryText="Nueva dirección"/>
              {!this.state.addressesLoading?this.getAddresses():<div/>}
            </FormsySelect>

            <FormsyText
              name='firstname'
              ref='firstname'
              validations='isWords'
              validationError={wordsError}
              required
              floatingLabelText="Nombres"
              type="string"
              id ="firstname"
              value = {this.state.firstname}
              style ={styles.field}
              disabled = {this.state.disabledForm}
            />
            <FormsyText
              name='lastname'
              validations='isWords'
              validationError={wordsError}
              required
              floatingLabelText="Apellidos"
              type="string"
              id ="lastname"
              value = {this.state.lastname}
              style ={styles.field}
              disabled = {this.state.disabledForm}
            />
            <FormsyText
              name='telephone'
              validations='isNumeric'
              validationError={wordsError}
              required
              floatingLabelText="Teléfono"
              type="number"
              id ="telephone"
              style ={styles.field}
              value = {this.state.telephone}
              disabled = {this.state.disabledForm}
            />
            <AutoComplete floatingLabelText="Lugar"
              type="string"
              id ="shippingPlace"
              searchText = {this.state.place}
              onBlur = {this.validatePlace}
              onUpdateInput = {this._handleAutoComplete}
              openOnFocus = {true}
              filter={AutoComplete.noFilter}
              disabled = {this.state.disabledForm}
              required
              fullWidth={true}
              style ={styles.field}
              errorText = {this.state.errorPlace}
              dataSource = {this.state.placesDataSource}/>

            <FormsyText
              name='shippingAddress'
              validationError={wordsError}
              required
              floatingLabelText="Dirección de entrega"
              type="string"
              id ="shippingAddress"
              value = {this.state.shippingAddress}
              style ={styles.field}

              disabled = {this.state.disabledForm}
            />
            <FormsyText
              name='reference'
              validationError={wordsError}
              required
              floatingLabelText="Referencia"
              type="string"
              id ="reference"
              value = {this.state.reference}
              style ={styles.field}
              disabled = {this.state.disabledForm}
            />
            <div style={styles.footer}>
              <h3 style={{marginRight:16}} >{'TOTAL: '+ this.state.total}</h3>
              <FloatingActionButton
                type="submit">
                <ContentSend />
              </FloatingActionButton>
            </div>
          </Formsy.Form>
        </div>
      </div>
    );
  }

});
