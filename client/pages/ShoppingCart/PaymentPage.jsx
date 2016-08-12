const Colors = mui.Styles.Colors;
const {TextField, TimePicker, FlatButton, DropDownMenu, SelectField, DatePicker,RaisedButton,MenuItem,AutoComplete,CircularProgress,FloatingActionButton, RadioButton, RadioButtonGroup} = mui;

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
  fieldCreditcard: {
    margin: 'auto',
    width:'100%',
    minWidth:'212',
    backgroundImage:'url(/payment/tarjetas.png)',
    backgroundSize:'130px',
    backgroundRepeat: 'no-repeat',
    backgroundPosition:'right'
  },
  fullFieldWithIcons:{
    margin: 'auto',
    width:'100%',
  },
  fieldWithIcons: {
    margin: 'auto',
    width:'calc(100% - 96px)',
  },
  fieldPrice: {
    margin: 'auto',
    width:'calc(100% - 88px)',
  },
  form:{
    margin: 'auto',
    width:'100%',
    display:'flex',
    flexDirection:'column'
  },
  goBackButton:{

  },
  bottomButtons:{
    display:'flex',
    flexDirection:'row',
    marginTop:'20px',
    justifyContent:'space-around'
  },
  bottomButtonsOneIcon:{
    display:'flex',
    flexDirection:'row',
    marginTop:'20px',
    justifyContent:'flex-start'
  },
  dateContainer:{
    display:'flex',
    justifyContent:'space-between',
    flexWrap:'wrap',
    width:'100%',
    minWidth:'212'
  },
  headers:{
    margin:'auto',
    width:'60%',
    textAlign:'center',
    color:Colors.pink500
  },
  containerPaymentOptions:{
    color:Colors.pink500,
    display: 'flex',
    flexDirection: 'column'
  },
  paymentOption:{
    display: 'flex',
    margin: '30px 0px',
    flexDirection: 'column',
    cursor:'pointer'
  },
  optionImg:{
    margin:'auto'
  },
  optionNote:{
    textAlign:'center'
  },
  paperTitle:{
    color: Colors.pink500,
    textAlign:'center'
  },
  labelSelectField:{
    textOverflow:'ellipsis',
    whiteSpace:'nowrap',
    overflowY: 'hidden',
    overflowX: 'auto',
  },
  inputDateField:{
    textAlign:'center'
  },
  dateField:{
    width:'40%'
  },
}

PaymentPage = React.createClass({
  contextTypes:{

  },



  getInitialState: function() {
    return {
      number:'' ,
      selectedCountry: 'PE',
      methodCard: false,
      method:'NO_METHOD',
      gotPaypalData:false,
      paypalInputs:{},
      paypalAction:'',
      year:'',
      month:'',
    };
  },

  handleCountryMenu: function(event, selectedCountry, index) {
    this.setState({selectedCountry})
  },

  handlePaypal:function(){
    formsController.payment.getPaypalInfo((res)=>{
      if(res.success){
        if(this.isMounted()){
          this.setState({
            paypalInputs:res.paypal,
            gotPaypalData:true,
            paypalAction: res.action
          });
        }
      }
    });
  },

  selectMethodAgain:function(){
    this.setState({
      methodCard:false,
    });
  },

  handleCard:function(){
    this.setState({
      methodCard:true
    });
  },

  render: function() {

    const { methodCard,gotPaypalData,paypalInputs,paypalAction, year, month } = this.state;
    return (
      <div style={{marginBottom:'20px'}}>
        {gotPaypalData?
          <Paypal inputs = {paypalInputs} action = {paypalAction}/>:null}
        {methodCard?
          <CreditCard
            goBack = {this.selectMethodAgain}
            onValidSubmit={this.submit}
            onValid={this.onValid}
            ref = {'paymentForm'}
            validateCreditCard = {this.props.validateCreditCard}
            onInvalid={this.onInvalid}/>:
              <div>
                <div>
                  <h2 style={styles.paperTitle}>Metodos de Pago</h2>
                </div>
                <div style={styles.containerPaymentOptions}>
                  <PaymentOption
                    handle = {this.handleCard}
                    img = {'/payment/tarjetas.png'}
                    note = {'Tarjetas permitidas'}
                  />
                  {/*<PaymentOption
                    handle = {this.handlePaypal}
                    img = {'/payment/paypal.png'}
                    note = {'PayPal acepta tarjetas de todo el mundo'}
                  />*/}
                </div>
              </div>
        }
      </div>

    );
  }

});

const PaymentOption = ({handle,img,note}) => {
  return (
    <div style={styles.paymentOption} onTouchTap={handle}>
      <img style={styles.optionImg} src={img}/>
      <span style={styles.optionNote}>{note}</span>
    </div>
  )
}

var Paypal = React.createClass({
  componentDidMount: function() {
    this.refs.paypalForm.submit();
  },

  loadPaypalInputs:function(){
    let i = 0;
    return utils.mapObject(this.props.inputs,(key,value)=>{
        i++;
        return <input key={i} type="hidden" name={key} value={value}/>
      });
  },

  render: function() {
    return (
      <form ref={'paypalForm'} action={this.props.action} method="post" id="form_paypal">
        {this.loadPaypalInputs()}
      </form>
    );
  }

});


var BillInfo = React.createClass({
  getInitialState: function() {
    return {
      firstname:null,
      lastname:null,
      selectedCountry:null,
      telephone:null,
      city:null,
      address:null,
      gotCodigoComercio:false,
      codigo_comercio:null,
      email:null,
      MenuCountries:<MenuItem value='LOADING' primaryText='Cargando países ...' />
    };
  },

  componentWillMount: function() {
    let Countries = {};
    data.getCountries((res)=>{
      if(res.success){
        if(this.isMounted()){
          Countries = res.data.map((country)=>{
            return <MenuItem
              key={country.country_id} value = {country.country_id} primaryText = {country.name} />
          });
          this.setState({MenuCountries:Countries});
        }}
    });

    formsController.payment.getCulqi((res)=>{
      if(res.success){
        if(this.isMounted()){
          this.setState({
            gotCodigoComercio: true,
            codigo_comercio: res.data.codigo_comercio,
            firstname:res.data.firstname,
            lastname: res.data.lastname,
            telephone:res.data.telephone,
            selectedCountry:res.data.country_id,
            city:res.data.city,
            address:res.data.address_1,
            email:res.data.email
          });
        }
      }
    });
  },

  errorMessages: {
    isNumeric:'Solo puedes ingresar números',
    isDefaultRequiredValue: 'Este campo es requerido',
    wordsError: "Solo use letras (a-z)",
    isMonthError:"No es un mes valido",
    isCreditCardYearError:"No es año valido",
    isExisty:'',
    isExistyMenu:'Debe seleccionar un país'
  },

  validateForm:function(){
    const {onValid} = this.props;
    const { gotCodigoComercio,codigo_comercio } = this.state;
    const model = this.refs.billInfo.getModel();
    model.codigo_comercio = codigo_comercio;
    onValid(model,true && gotCodigoComercio);
    if(!gotCodigoComercio){
      throw new Meteor.Error('Error conectando con el servidor');
    }
  },

  onInvalid:function(){
    this.props.onValid('xx',false);
  },

  render: function() {
    const {isNumeric,wordsError,isMonthError,isYearError,isCreditCardYearError,isExisty,isExistyMenu} = this.errorMessages;
    return (
      <Formsy.Form
        ref = {'billInfo'}
        onValid={this.validateForm}
        onInvalid={this.onInvalid}
        style ={styles.form}>

        <div>
          <h2 style={styles.paperTitle}>Datos de facturación</h2>
        </div>

        <FormsyText
          required
          floatingLabelText="Nombres"
          hintText = "Nombres de facturación"
          validations="isSpecialWords,isExisty"
          validationErrors={{wordsError,isExisty}}
          type="string"
          id ="firstname"
          name = "firstname"
          ref='firstname'
          value={this.state.firstname}
          style ={styles.field}
        />

        <FormsyText
          required
          floatingLabelText="Apellidos"
          hintText = "Apellidos de facturación"
          validations="isSpecialWords,isExisty"
          validationErrors = {wordsError}
          type="string"
          id ="lastname"
          name = "lastname"
          ref='lastname'
          value={this.state.lastname}
          style ={styles.field}
        />

        <FormsyText
          required
          floatingLabelText="Teléfono"
          validations="isNumeric,isExisty"
          type="number"
          id ="telephone"
          name ="telephone"
          ref='telephone'
          validationErrors={isNumeric}
          value={this.state.telephone}
          style ={styles.field}
        />

        <FormsyText
          required
          floatingLabelText="Email"
          validations="isEmail,isExisty"
          validationErrors = {wordsError}
          type="string"
          id ="email"
          name = "email"
          ref='email'
          value={this.state.email}
          style ={styles.field}
        />

        <FormsyText
          required
          name='address'
          ref='address'
          validationErrors={wordsError}
          validations="isExisty"
          floatingLabelText="Dirección de facturación"
          type="string"
          id ="address"
          multiLine={true}
          rows = {2}
          value = {this.state.address}
          style ={styles.field}
        />

        <FormsySelect
          name='country'
          ref='country'
          id='country'
          required
          fullWidth={true}
          onChange={this.handleCountryMenu}
          style ={styles.field}
          floatingLabelText="País"
          validations="isExisty"
          value={this.state.selectedCountry}>
          {this.state.MenuCountries}
        </FormsySelect>

        <FormsyText
          required
          floatingLabelText="Ciudad"
          hintText = "Ciudad/Provincia de facturación"
          validations="isSpecialWords,isExisty"
          validationErrors={wordsError}
          type="string"
          id ="city"
          ref='city'
          name = "city"
          value={this.state.city}
          style ={styles.field}
        />
      </Formsy.Form>
        );
  }
});

var CreditCardInfo = React.createClass({
  errorMessages: {
    isNumeric:'Solo puedes ingresar números',
    isDefaultRequiredValue: 'Este campo es requerido',
    wordsError: "Solo use letras (a-z)",
    isMonthError:"No es un mes valido",
    isExisty:'',
    isCreditCardYearError:"No es año valido",
  },
  getDefaultProps: function() {
    return {
      firstname:'',
      lastname:''
    };
  },

  componentWillMount: function() {
    CulqiJS.informacion_venta = this.props.informacion_venta;
    CulqiJS.codigo_comercio = this.props.codigo_comercio;
  },

  getInitialState: function() {
    return {
      selectedCreditcard:'',
      month:'',
      year:'',
      creditCardNumber:'',
      credicardLoading:false,
      noCreditcards:true,
      code:'',
      showIcons:true,
    };
  },

  onValid:function(){
    const model = this.refs.creditCardInfo.getModel();
    const { billInfo } = this.props;
    //AGREGAMOS INFORMACION DE FACTURACION AL MODELO
    model.firstname = billInfo.firstname;
    model.lastname = billInfo.lastname;
    model.email = billInfo.email;
    model.address_id = billInfo.address;
    model.country_id = billInfo.country;
    this.props.validateForm(model,true);
  },
  onInvalid:function(){
    this.props.validateForm('xx',false);

  },

  render: function() {

      const { isNumeric,wordsError,isMonthError,isYearError,isCreditCardYearError,isExisty } = this.errorMessages;
      const { showIcons,selectedCreditcard,month,year } = this.state;
      return (
        <Formsy.Form
          onValidSubmit={this.props.submit}
          onValid={this.onValid}
          ref = {'creditCardInfo'}
          onInvalid={this.onInvalid}
          style ={styles.form}>
          <div>
            <h2 style={styles.paperTitle}>Ingrese su tarjeta</h2>
          </div>
          <FormsyText
            required
            floatingLabelText="Nombres"
            disabled={true}
            hintText = "Nombres de facturación"
            validations="isSpecialWords,isExisty"
            validationErrors={{wordsError,isExisty}}
            type="string"
            id ="firstname"
            name = "firstname"
            ref='firstname'
            value={this.props.firstname}
            style ={styles.field}
          />

          <FormsyText
            required
            disabled={true}
            floatingLabelText="Apellidos"
            hintText = "Apellidos de facturación"
            validations="isSpecialWords,isExisty"
            validationErrors = {wordsError}
            type="string"
            id ="lastname"
            name = "lastname"
            ref='lastname'
            value={this.props.lastname}
            style ={styles.field}
          />

          {/*<FormsySelect
            name='selectedCreditcard'
            required
            labelStyle={styles.labelSelectField}
            onChange={this.handleCreditcardChange}
            style ={showIcons?styles.fieldWithIcons:styles.fullFieldWithIcons}
            fullWidth={true}
            floatingLabelText="Elige una tarjeta"
            value={selectedCreditcard}>
            <MenuItem value={'NUEVA TARJETA'} primaryText="Nueva tarjeta"/>
            {!this.state.credicardLoading && !this.state.noCreditcards?this.getCreditcards():<div/>}
          </FormsySelect>*/}
          <FormsyText
            required
            floatingLabelText="Número"
            hintText = "Ingresa los 16 números"
            type="number"
            validations={{'isNumeric':true,isLength:16}}
            validationErrors={{
              isLength:"Deben ser 16 dígitos",
              isNumeric:isNumeric
            }}
            id ="number"
            name = "number"
            value={this.state.creditCardNumber}
            style ={styles.fieldCreditcard}
          />


          <div className={'datebirthContainer'}>
            <span className={'datebirth'}>
              Fecha de vencimiento
            </span>
          </div>
          <div style={styles.dateContainer}>

            <FormsyText
              required
              floatingLabelText="Mes"
              validations={{'isMonth':true,'isNumeric':true}}
              validationErrors={{
                isMonth: isMonthError
              }}
              maxLength={2}
              textFieldStyle = {{width:'100%'}}
              name = "month"
              style ={styles.dateField}
              value = {month}
              inputStyle = {styles.inputDateField}
            />

            <FormsyText
              required
              floatingLabelText="Año"
              validations={{'isCreditCardYear':true,'isNumeric':true}}
              validationErrors={{
                isCreditCardYear: isCreditCardYearError
              }}
              maxLength={4}
              textFieldStyle = {{width:'100%'}}
              name = "year"
              value = {year}
              style ={styles.dateField}
              inputStyle = {styles.inputDateField}
            />
          </div>


          <FormsyText
            required
            floatingLabelText="Codigo de seguridad (CVV)"
            type="password"
            id ="cvc"
            validations={{'isNumeric':true,maxLength:4,minLength:3}}
            validationErrors={{isLength:'Deben ser 3 dígitos',isNumeric:isNumeric}}
            hintText = "Tres dígitos detrás de la tarjeta"
            name = "cvc"
            value={this.state.code}
            style ={styles.field}
          />
        </Formsy.Form>
    );
  }
});




var CreditCard = React.createClass({
  errorMessages: {
    isNumeric:'Solo puedes ingresar números',
    isDefaultRequiredValue: 'Este campo es requerido',
    wordsError: "Solo use letras (a-z)",
    isMonthError:"No es un mes valido",
    isCreditCardYearError:"No es año valido",
  },
  componentWillMount: function() {
    const script = document.createElement("script");
    script.src = "https://integ-pago.culqi.com/api/v2/culqi.js";
    script.type = 'text/javascript';
    script.id = 'culqi';
    document.body.appendChild(script);
    //backendCom.getSavedCreditcards(Session.get('token').access_token,()=>{});
  },
  componentWillUnmount: function() {
    const idScript = document.getElementById('culqi');
    idScript.parentNode.removeChild(idScript);
  },
  getInitialState: function() {
    return {
      currentView: '1',
      gotInformacionVenta:false,
      gotCodigoComercio:false,
      firstname:'',
      lastname:''
    };
  },

  goBack:function(){
    if(this.state.currentView==='1'){
      this.props.goBack();
      return;
    }else{
      this.setState({
        currentView:'1'
      });
    }
  },

  confirmBillInfo:function(){
    formsController.payment.setBillInfo(this.billInfo,(res)=>{
      if(res.success){
        if(this.isMounted()){
          this.informacionVenta = res.data.informacionVenta;
          this.setState({
            gotInformacionVenta: true,
            currentView:'2',
            firstname:res.data.firstname,
            lastname:res.data.lastname
          });
        }
      }
    });
  },

  handleCreditcardChange:function(event,selectedCreditcard,index){
    this.setState({selectedCreditcard});
  },
  getCreditcards:function(){

  },
  validateBillInfo:function(model,isValid){
    this.billInfo = model;
    this.codigoComercio = model.codigo_comercio;
    if(isValid){
      this.setState({
        validConfirmButton:true,
        gotCodigoComercio: true
      });
      return;
    }
    this.setState({
      validConfirmButton:false,
      gotCodigoComercio: false
    });

  },
  render: function() {
    const {isNumeric,wordsError,isMonthError,isYearError,isCreditCardYearError} = this.errorMessages;
    const { currentView,validConfirmButton,firstname,lastname } = this.state;
    return (
      <div>
        {currentView==='1'?
          <BillInfo onValid={this.validateBillInfo}/>:
            <CreditCardInfo
              firstname = {firstname}
              lastname = {lastname}
              validateForm = {this.props.validateCreditCard}
              codigo_comercio={this.codigoComercio}
              billInfo = {this.billInfo}
              informacion_venta = {this.informacionVenta} />
        }
        <div style={currentView==='2'?styles.bottomButtonsOneIcon:styles.bottomButtons}>
          <FlatButton style={styles.goBackButton} primary={true} label="ATRAS" onTouchTap={this.goBack}/>
          {currentView==='1'?<RaisedButton style={styles.goForwardButton} disabled={!validConfirmButton} primary={true} label="CONFIRMAR" onTouchTap={this.confirmBillInfo}/>:null}
        </div>
      </div>


    );
  }

});
