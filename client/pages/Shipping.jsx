const { TextField, TimePicker, SelectField, DatePicker,RaisedButton,MenuItem,AutoComplete,CircularProgress} = mui;
const {ContentSave} = mui.SvgIcons;

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

    this.token = Session.get('token');
    this.setState({
      addressesLoading: true
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

  handleChangeTimePicker12:function(err, time) {
    this.refs.picker12hr.setTime(time);
  },

  componentWillUnmount: function() {

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
      addressesLoading: true
    };
  },

  _handleTouchMenuAutoComplete(e){
    this.place_id = e.currentTarget.id;
    this.placeFinished = 'FINISHED';
  },
  _handleAutoComplete:function(search){
    this.placeFinished = 'NOT FINISHED';
    this.place_id = 'X';
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

  saveShippingAddress:function(){
    console.log(this.place_id);
    backendCom.addAddress(
      this.state.firstname,
      this.state.lastname,
      this.state.telephone,
      this.place_id,
      this.state.shippingAddress,
      this.state.reference,
      this.token.access_token,
      (err,response)=>{
      console.log(response);
      }
    );
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

  handleChangeMenuAddresses:function(event, index, value){
    this.setState({selectedAddress:value});

    if (value !== 'X'){
      let address = findById(this.state.savedAddress.addresses,value);
      console.log(address);
      this.place_id =address.place_id;
      this.placeFinished = 'FINISHED';
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

  render: function() {
    return (
      <div>
        <div style={styles.container}>
          <h2 style={styles.headers}>Datos de entrega</h2>
          <form style={styles.form}>
            <SelectField
              style={styles.field}
              value = {this.state.selectedAddress}
              onChange={this.handleChangeMenuAddresses}
              floatingLabelText="Elige una dirección">
              <MenuItem value={'X'} primaryText="Nueva dirección" />
              {!this.state.addressesLoading?this.getAddresses():<div/>}
            </SelectField><br/>
            <TextField
              floatingLabelText="Nombres"
              type="string"
              id ="name"
              valueLink={this.linkState('firstname')}
              disabled = {this.state.disabledForm}
              style ={styles.field}
              errorText={this.error.name}
            /><br/>
            <TextField
              floatingLabelText="Apellidos"
              type="string"
              id ="name"
              valueLink={this.linkState('lastname')}
              disabled = {this.state.disabledForm}
              style ={styles.field}
              errorText={this.error.name}
            /><br/>
            <TextField
              floatingLabelText="Teléfono"
              type="number"
              id ="telephone"
              valueLink={this.linkState('telephone')}
              disabled = {this.state.disabledForm}
              style ={styles.field}
              errorText={this.error.telephone}
            /><br/>
            <AutoComplete floatingLabelText="Lugar"
              type="string"
              id ="shippingPlace"
              onUpdateInput = {this._handleAutoComplete}
              openOnFocus = {true}
              filter={AutoComplete.noFilter}
              disabled = {this.state.disabledForm}
              style ={styles.field}
              searchText = {this.state.place}
              dataSource = {this.state.placesDataSource}/><br/>
            <TextField
              floatingLabelText="Dirección de entrega"
              type="string"
              id ="shippingAddress"
              valueLink={this.linkState('shippingAddress')}
              disabled = {this.state.disabledForm}
              style ={styles.field}
              errorText={this.error.shippingAddress}
            /><br/>
            <TextField
              floatingLabelText="Referencia"
              type="string"
              id ="reference"
              valueLink={this.linkState('reference')}
              disabled = {this.state.disabledForm}
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



        </div>
      </div>
    );
  }

});
