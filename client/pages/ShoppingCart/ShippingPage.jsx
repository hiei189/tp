const { TextField,IconButton, Snackbar, TimePicker, SelectField, DatePicker,RaisedButton,MenuItem,CircularProgress,AutoComplete,FloatingActionButton} = mui;
const { ContentSend,ImageEdit,ActionDelete, ActionCheckCircle } = mui.SvgIcons;

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
    minWidth:'212',
  },
  fieldWithIcons: {
    margin: 'auto',
    width:'calc(100% - 96px)',
  },
  labelSelectField:{
    textOverflow:'ellipsis',
    whiteSpace:'nowrap',
    overflowY: 'hidden',
    overflowX: 'auto',
  },
  fullFieldWithIcons:{
    margin: 'auto',
    width:'100%',
  },
  form:{
    margin: 'auto',
    width:'100%',
    marginBottom:'50px'
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
  },
  paperTitle:{
    color: Colors.pink500
  }
}

ShippingPage = React.createClass({

  getDefaultProps: function() {
    return {
      footer:true
    };
  },

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

    formsController.getAddresses(this.token.access_token,(err,response)=>{
      if(this.isMounted()){
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
      }
    });

    formsController.getAllPlaces((res)=>{
      if(this.isMounted()){
        this.setState({
          allPlaces: res,
          gotAllPlaces:true
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
      placesDataSource: [{
        text: 'Escoge un lugar válido',
        value: <MenuItem primaryText={'Ingresa un lugar. Puedes elegir entre La Esperanza, Victor Larco Herrera, El Porvenir/Alto Trujillo, Trujillo, El Porvenir, Huanchaco, Florencia de Mora, Laredo, Moche, Salaverry'} disabled={true}/>}],
      addressesLoading: true,
      errors:{},
      total: 0,
      errorPlace:'',
      place:'',
      validForm:false,
      selectedAddress: 'NUEVA DIRECCION',
      gotAllPlaces: false,
      placeIdMenu:'',
      showIcons:false,
      showCheck:false,
      openSnackbarRemove:false,
      openSnackbarEdit: false
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

  // _handleAutoComplete:function(search){
  //
  //   this.placeFinished = 'NOT FINISHED';
  //   this.place_id = 'X';
  //   formsController.shipping.place_id = this.place_id;
  //
  //   this.setState({
  //     place: search
  //   });
  //   if(search.length>=3){
  //     this.setState({
  //       placesDataSource: [{
  //         text:'Escoge un lugar válido',
  //         value: (
  //           <MenuItem disabled={true}>
  //             <CircularProgress size={0.5} style={{textAlign:'center',width:'100%',margin:0,padding:0}}/>
  //           </MenuItem>
  //             )
  //         }]
  //     });
  //
  //     formsController.searchInPlaces(search,(places)=>{
  //       if (places !== 'NO_DATA'){
  //         var arrayPlaces = places.map((place)=>{
  //           return  {
  //               text: place.name,
  //               value:
  //                 (<MenuItem
  //                   primaryText={place.name}
  //                   id={place.place_id}
  //                   onTouchTap = {this._handleTouchMenuAutoComplete}
  //                  />),
  //             }
  //         });
  //         this.setState({
  //           placesDataSource: arrayPlaces
  //         });
  //       }else{
  //         this.setState({
  //           placesDataSource: [{
  //             text:'No encontramos ese lugar',
  //             value: (
  //               <MenuItem primaryText={'No encontramos ese lugar'} disabled={true}/>
  //             )
  //             }]
  //         });
  //       }
  //     });
  //   }else{
  //     this.setState({
  //       placesDataSource: [{
  //         text: 'Escoge un lugar válido',
  //         value: <MenuItem primaryText={'Ingresa un lugar. Puedes elegir entre La Esperanza, Victor Larco Herrera, El Porvenir/Alto Trujillo, Trujillo, El Porvenir, Huanchaco, Florencia de Mora, Laredo, Moche, Salaverry'} disabled={true}/>}]
  //     });
  //   }
  // },

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

  handleChangeMenuAddresses:function(event, selectedAddress, index){
    const { savedAddress } = this.state;
    this.setState({selectedAddress});
    this.shipping = selectedAddress;
    formsController.shipping.address_id = selectedAddress; //GUARDAR ADDRESS_ID SELECCIONADO
    if (selectedAddress !== 'NUEVA DIRECCION'){
      let address = findById(this.state.savedAddress.addresses,selectedAddress);
      this.place_id=address.place_id;
      this.placeFinished = 'FINISHED';
      formsController.shipping.isSavedAddress = true;
      this.setState({
        disabledForm: true,
        showCheck: false,
        showIcons:true
      });
      this.fillForm(savedAddress,selectedAddress);
    }else{
      this.placeFinished = 'NOT FINISHED';
      formsController.shipping.isSavedAddress = false;  //DETERMINAR SI HUBO CAMBIO
      this.place_id = 'X';
      this.emptyForm();
      this.setState({
        disabledForm:false,
        showIcons:false
      });
    }
    //this.validatePlace(); DESCOMENTAR CON AutoComplete
  },

  fillForm:function(savedAddress,selectedAddress){
    const address = findById(savedAddress.addresses,selectedAddress);
    this.setState({
      firstname: address.firstname,
      lastname: address.lastname,
      telephone: address.telephone,
      place: address.place,
      shippingAddress:address.address_1,
      reference: address.reference,
      placeIdMenu:address.place_id,
    });
  },

  emptyForm:function(){
    this.setState({
      firstname: '',
      lastname: '',
      telephone: '',
      place: '',
      shippingAddress: '',
      reference: '',
      placeIdMenu:''
    });
  },

  //DESCOMENTAR CON AutoComplete
  // validatePlace:function(event){
  //  if(this.place_id === 'X'){
  //    this.setState({
  //      errorPlace: 'Debe seleccionar un lugar válido'
  //    });
  //  }else{
  //    this.setState({
  //      errorPlace: ''
  //    });
  //  }
  // },

  validateForm:function(){
    const {onValid} = this.props;
    const model = this.refs.shippingForm.getModel();
    this.setState({
        validForm: true
    });
    onValid(this.shipping,model);
    //CON AUTO COMPLETE DESCOMENTAR
    // const {onValid} = this.props;
    // if(this.place_id==='X'){
    //   this.setState({
    //     validForm: false
    //   });
    // }else{
    //   model = this.refs.shippingForm.getModel();
    //   console.log(model);
    //   model.place_id = this.place_id;
    //   onValid(this.shipping,model);
    //   this.setState({
    //     validForm: true
    //   });
    // }
  },

  invalidForm:function(){
    this.props.onInvalid();
    this.setState({
      validForm: false
    });
  },

  getAllPlaces:function(){
    return this.state.allPlaces.map((place)=>{
      return <MenuItem key={place.place_id} value={place.place_id} primaryText={place.name}/>
    });
  },

  makeEditCurrentAddress:function(){
    this.setState({
      disabledForm:false,
      showCheck:true
    });
  },

  saveEditCurrentAddress:function(){
    const { validForm } = this.state;
    if(validForm){
      const model = this.refs.shippingForm.getModel();
      formsController.shippingController.updateAddress(model,
        (res)=>{
          if(res.success){
            if(this.isMounted()){
              this.setState({
                disabledForm:true,
                showCheck:false,
                openSnackbarEdit:true
              });
            }
          }
        });
    }
  },

  removeCurrentAddress:function(selectedAddress,savedAddress){
    //const { selectedAddress } = this.state;
    //const { addresses } = savedAddress;
    //const { savedAddress } = this.state;
    const model = this.refs.shippingForm.getModel();
    model.address_id = selectedAddress;
    this.eraseAddressFromPage(selectedAddress,savedAddress);
    this.timerToEraseAddress = setTimeout(()=>{ formsController.shippingController.removeAddress(model,(res)=>{}) }, 4000);
  },

  eraseAddressFromPage:function(selectedAddress,savedAddress){
    const { addresses } = savedAddress;
    this.addressesBeforeErase = savedAddress;
    this.selectedAddressBeforeErase = selectedAddress;

    const newAdresses = addresses.filter((obj) =>{
      return obj.address_id !== selectedAddress;
    });
    this.setState({
      'savedAddress': {...savedAddress,addresses:newAdresses},
      'selectedAddress': 'NUEVA DIRECCION',
      'openSnackbarRemove':true
    });
    this.emptyForm();
    this.setState({
      showIcons:false,
      disabledForm:false
    });
  },

  onRequestSnackbarRemoveClose:function(){
    this.setState({
      openSnackbarRemove: false
    });
  },

  undoRemoveAddress:function(){
    clearTimeout(this.timerToEraseAddress);
    this.fillForm(this.addressesBeforeErase,this.selectedAddressBeforeErase);
    this.setState({
      showCheck:false,
      disabledForm:true,
      showIcons:true,
      savedAddress: this.addressesBeforeErase,
      selectedAddress:this.selectedAddressBeforeErase,
      openSnackbarEdit: false
    });
  },

  onRequestSnackbarEditedClose:function(){
    this.setState({
      openSnackbarEdit: false
    });
  },

  render: function() {
    let { wordsError } = this.errorMessages;
    const { gotAllPlaces,showCheck,showIcons, selectedAddress,openSnackbarRemove,addresses,savedAddress,openSnackbarEdit } = this.state;
    return (
      <div>
        <Snackbar open={openSnackbarEdit} message={'Direccion editada'} onRequestClose={this.onRequestSnackbarEditedClose} autoHideDuration={2000}/>
        <Snackbar open={openSnackbarRemove} message={'Direccion eliminada'} onRequestClose={this.onRequestSnackbarRemoveClose} autoHideDuration={4000} action={'DESHACER'} onActionTouchTap={this.undoRemoveAddress}/>
        <Formsy.Form
          ref={'shippingForm'}
          onValid={this.validateForm}
          onInvalid={this.invalidForm}
          style ={styles.form}>
          <div style={{display:'flex'}}>
            <FormsySelect
              name='selectedAddress'
              ref='selectedAddress'
              required
              labelStyle={styles.labelSelectField}
              onChange={this.handleChangeMenuAddresses}
              style ={showIcons?styles.fieldWithIcons:styles.fullFieldWithIcons}
              fullWidth={true}
              floatingLabelText="Elige una dirección"
              value={this.state.selectedAddress}>
              <MenuItem value={'NUEVA DIRECCION'} primaryText="Nueva dirección"/>
              {!this.state.addressesLoading && !this.state.noAddresses?this.getAddresses():<div/>}
            </FormsySelect>
            {showIcons?
              <div style={{minWidth:'96px',alignSelf:'center'}}>
                {showCheck?
                  <IconButton tooltip={'Editar dirección'} onTouchTap={this.saveEditCurrentAddress}>
                    <ActionCheckCircle />
                  </IconButton> :
                    <IconButton tooltip={'Editar dirección'}  onTouchTap={this.makeEditCurrentAddress}>
                      <ImageEdit />
                    </IconButton>}
                <IconButton tooltip={'Borrar dirección'}  onTouchTap={(e) => this.removeCurrentAddress(selectedAddress,savedAddress, e)}>
                  <ActionDelete  />
                </IconButton>
              </div>:null}
          </div>
          <FormsyText
            name='firstname'
            ref='firstname'
            validations='isSpecialWords'
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
            validations='isSpecialWords'
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

          <FormsySelect
            name='place_id'
            ref = 'place_id'
            required
            floatingLabelText="Lugar"
            id ="place_id"
            style ={styles.field}
            onChange = {this.handlePlaceMenu}
            value = {this.state.placeIdMenu}
            disabled = {this.state.disabledForm}
          >
            {gotAllPlaces?this.getAllPlaces():<CircularProgress size={0.5}/>}
          </FormsySelect>

          {/*<AutoComplete floatingLabelText="Lugar"
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
          dataSource = {this.state.placesDataSource}/>*/}

          <FormsyText
            name='shippingAddress'
            validationError={wordsError}
            required
            floatingLabelText="Dirección de entrega"
            type="string"
            id ="shippingAddress"
            multiLine={true}
            rows = {2}
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
            multiLine={true}
            rows={2}
            value = {this.state.reference}
            style ={styles.field}
            disabled = {this.state.disabledForm}
          />
        </Formsy.Form>
      </div>

    );
  }
});
