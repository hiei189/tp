const {Tabs,Tab,Paper,FloatingActionButton} = mui;
const {MapsLocalShipping,ActionHistory,ActionPayment} =mui.SvgIcons;
const {ContentSend} = mui.SvgIcons;
const Colors = mui.Styles.Colors;

const styles={
  paperContainer:{
    width:'90%',
    minWidth:288,
    maxWidth:612,
    margin:'auto',
    padding:'0 3%',
    marginTop:20,
    display:'flex',
    flexDirection:'column',
    justifyContent:'space-around',

  },
  paperNote:{
    color: Colors.pink500,
    textAlign:'center',
    marginBottom:'20px'
  },
  icons:{
    margin:'auto',
    width:28,
    color:'white',
    height:28,
    fill: Colors.pink500
  },
  paperTitle:{
    color: Colors.pink500,
    textAlign:'center'
  },

}

ShoppingDetails = React.createClass({
  contextTypes:{
    gotUser: React.PropTypes.bool,
  },

  getInitialState: function() {
    return {
      currentTab: 0,
      validCurrentForm: false,
      total: 0,
      noProducts: true,
      validShippingForm:false,
      disabledButton:true,
      loadingButton: false
    };
  },

  componentWillMount: function() {
    this.shipping = {};
    this.delivery = {};
    this.payment = {};
    this.creditcard = {};
    this.token = Session.get('token');
    Tracker.autorun((a)=>{
      this.trackerId_a = a;
      let isShoppingCartEmpty = Session.get('isShoppingCartEmpty');
      Tracker.nonreactive(()=>{
        if(isShoppingCartEmpty){
          this.setState({
            noProducts: true
          });
        }else{
          this.shoppingCart = Session.get('shoppingCart');
          this.setState({
            total: this.shoppingCart.totals[0].text,
            noProducts: false
          });
          //Session.set('totalPrice', this.shoppingCart.totals[0].text);
        }
      });
    });

    Tracker.autorun((b)=>{
      this.trackerId_b = b;
      let total = Session.get('totalPrice');
      Tracker.nonreactive(()=>{
        if(total){
          this.setState({
            total: 'S/'+ total.toString() + '.00'
          });
        }

      });
    });

  },
  componentWillUnmount: function() {
      this.trackerId_b.stop();
      this.trackerId_a.stop();
  },
  handleTabChange:function(value,a,b){
    //BORRAR ESTO EN PRODUCCION
    if (value === 0 || value === 1 || value === 2){
      this.setState({
        currentTab: this.state.currentTab
      });
    }
  },

  handleValidShipping:function(idShipping,model){
    this.setState({
      validCurrentForm: true,
      validShippingForm: true,
      disabledButton:false
    });
    this.shipping.model = model;
    this.shipping.id = idShipping;
  },

  handleInvalidShipping:function(){
    this.setState({
      validCurrentForm: false,
      validShippingForm: false,
      disabledButton: true
    });
  },

  handleInvalidDelivery:function(){
    this.setState({
      disabledButton: true,
      validDelivery:false,
      validCurrentForm:false
    });
  },

  handleValidDelivery:function(model){
    this.setState({
      disabledButton: false,
      validDelivery:true,
      validCurrentForm:true
    });
    this.delivery.model = model;
  },

  handleInvalidPayment:function(){
    this.setState({
      disabledButton: true,
      validPayment:false,
      validCurrentForm:false
    });
  },

  handleValidPayment:function(){

  },

  handleSubmit:function(){
    const  {gotUser} = this.context;
    const {validCurrentForm,validDelivery} = this.state;
    if (gotUser){
      if(validCurrentForm){
        switch (this.state.currentTab) {
          case 0:
              let {model} = this.shipping;
              // if(model.place_id!=='X')
              // {
                //model.place_id = this.place_id;
                if(model.selectedAddress === 'NUEVA DIRECCION'){
                  this.setState({
                    loadingButton: true
                  });
                  formsController.shippingController.addAddress(model,
                    (newSavedAddress)=>{
                      model.selectedAddress = newSavedAddress.data.address_id;
                      formsController.shippingController.selectAddress(model,
                        (res)=>{
                          if(this.isMounted()){
                            this.setState({
                              loadingButton:false,
                              currentTab:1,
                              disabledButton:true,
                            });
                          }
                        }
                      )
                  });
                }
                else{
                  formsController.shippingController.selectAddress(model,
                    (res)=>{
                      if(this.isMounted()){
                        this.setState({
                          loadingButton:false,
                          currentTab:1,
                          disabledButton:true,
                        });
                      }
                    }
                  )
                }
              // }
              break;
          case 1:
            model = this.delivery.model;
            this.setState({
              loadingButton: true
            });
            formsController.deliveryController.addDelivery(model,
              (res)=>{
                if(this.isMounted()){
                  this.setState({
                    loadingButton:false,
                    currentTab:2,
                    disabledButton:true,
                  });
                }
              });
            break;
          case 2:
            model = this.creditcard.model;
            CulqiJS.pagarVenta({
              numero:model.number,
              exp_m:model.month,
              exp_a:model.year,
              cvc:model.cvc,
              nombre:model.firstname,
              apellido:model.lastname,
              correo:model.email
            })
            break;
          default:
        }
      }
    }else{
      this.context.router.push('/user');
    }
  },

  validateCreditCard:function(model,isValid){
    if(isValid){
      this.creditcard.model = model;
      this.setState({
        disabledButton:false,
        validCreditCard:true,
        validCurrentForm:true
      });
      return;
    }
    this.setState({
      disabledButton:true,
      validCreditCard:false,
      validCurrentForm:false
    });
  },

  render: function() {
    const {gotUser} = this.context;

    if(gotUser){
      return (
        <div>
          <Tabs value={this.state.currentTab} onChange={this.handleTabChange}>
            <Tab value = {0}
              icon={<div><MapsLocalShipping style={styles.icons}/></div>}>
              <ShoppingDetailsTabTemplate
                title={'Dirección de entrega'}
                note={'Ingrese aqui los datos de quien recepcionara tu pedido'}
                onInvalid = {this.handleInvalidShipping}
                Component = {ShippingPage}
                onValid = {this.handleValidShipping}/>
            </Tab>
            <Tab value = {1}
              icon={<div><ActionHistory style={styles.icons}/></div>}>
              <ShoppingDetailsTabTemplate
                title={'Datos de entrega'}
                onInvalid = {this.handleInvalidDelivery}
                Component = {DeliveryPage}
                onValid = {this.handleValidDelivery}/>
            </Tab>
            <Tab value = {2}
              icon={<div><ActionPayment style={styles.icons}/></div>}>
              <ShoppingDetailsTabTemplate
                onInvalid = {this.handleInvalidPayment}
                Component = {PaymentPage}
                validateCreditCard = {this.validateCreditCard}
                onValid = {this.handleValidPayment}/>
            </Tab>
          </Tabs>
          <Footer loading={this.state.loadingButton} onSend = {this.handleSubmit} total = {this.state.total} disabled={this.state.disabledButton}/>
        </div>
      );
    }
    return(
      <div>
        {'Debes estar logueado para comprar algo!'}
      </div>
    );
  }
});


const ShoppingDetailsTabTemplate = ({title,note,onInvalid,onValid,Component,...props},context)=>{
  const { smallScreen } = context;
  return(
    <Paper style={styles.paperContainer}  zDepth = {smallScreen?0:1}>
      {title?<div>
        <h2 style={styles.paperTitle}>{title}</h2>
      </div>:null}
      {note?<span style={styles.paperNote}>{note}</span>:null}
      <Component onInvalid = {onInvalid} onValid = {onValid} {...props} />
    </Paper>
  );
}

ShoppingDetailsTabTemplate.contextTypes = {
  smallScreen: React.PropTypes.bool
}
