const { AppBar, IconButton, IconMenu, LeftNav,Badge,Divider,CircularProgress,List,Dialog,ListItem} = mui;
const {ActionShoppingCart,ActionAccountCircle} = mui.SvgIcons;
const {ThemeManager} = mui.Styles;
const Colors = mui.Styles.Colors;
const {SelectableContainerEnhance} = mui;

//import { Grid,Row, Col } from 'react-flexbox-grid/lib/index';

let SelectableList = SelectableContainerEnhance(List);
SelectableList = wrapList(SelectableList);

const {Link} = ReactRouter;

var styles = {
  logoLoading:{
    position:'absolute',
    width:'50%',
    margin:'auto',
    top:'50%',
    bottom:'50%',
    right:'50%',
    left:'50%',
    marginLeft:'-25%',
    marginTop:'-145px',
    textAlign:'center'
  },
  MenuCategories:{
    marginRight: 32,
    float: 'left',
    position: 'relative',
    zIndex: 0,
  }
}

App = React.createClass({
  contextTypes:{
    router: React.PropTypes.object
  },
  childContextTypes : {
    muiTheme: React.PropTypes.object,
    screensize: React.PropTypes.string,
    user:React.PropTypes.object,
    gotUser: React.PropTypes.bool,
    token: React.PropTypes.object
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(theme),
      screensize: Session.get('device-screensize'),
      user: this.state.user,
      gotUser: this.state.gotUser,
      token: Session.get('token')
    };
  },

  getInitialState() {

    return {
      openMenu: true,
      gotToken:false,
      gotCategories:false,
      leftNavDocked:false,
      cartshopNumber:'0',
      user:{},
      gotUser: false,
      fbUser:false,
      categories:{},
      gotFbResponse: false
    };
  },

  componentWillMount: function() {

    Tracker.autorun((d)=>{
      this.trackerId = d;
      let user = Session.get('user');
      if(Object.keys(user).length!==0){
        this.setState({
          gotUser: true,
          user: user
        });
      }else{
        this.setState({
          gotUser: false
        });
      }
    });

    Tracker.autorun((e)=>{
      this.trackerId_e = e;
      this.setState({
        cartshopNumber:Session.get('cartshopNumber') //read qty of items in cartshop
      });
    });

    Tracker.autorun((c)=>{

      this.trackerId_c = c;

      this.screensize = Session.get('device-screensize'); //read screen changes
      switch(this.screensize){
        case "large":
        case "xlarge":
        case "xxlarge":
          this.setState({
            leftNavDocked: true,
            showMenuIconButton:false,
            openMenu:true,
            leftNavZIndex: 1000,
            childrenContainer:{
              paddingTop:96,
              paddingBottom:64,
              marginLeft:256,

            }
          });
          break;
        case "small":
        case "medium":
          this.setState({
            openMenu:false,
            leftNavDocked: false,
            showMenuIconButton:true,
            leftNavZIndex: 1300,
            childrenContainer:{
              paddingTop:96,
              paddingBottom:64
            }
          });
          break;
        default:
          this.setState({
            leftNavDocked: false,
            showMenuIconButton:true,
            openMenu:false
          });
      }
    });

    Tracker.autorun((b)=>{
      this.trackerId_b = b;
      this.setState({
        pageTitle: Session.get('pageTitle')
      });
    });


    Tracker.autorun((f)=>{
      this.trackerId_f = f;
      this.setState({
        fbUser: Session.get('fbUser')
      });
    });

    Tracker.autorun((g)=>{
      this.trackerId_g = g;
      this.setState({
        categories: Session.get('categories')
      });
      console.log(this.state.categories);
      if(Object.keys(this.state.categories).length!== 0){
        this.setState({
          gotCategories: true
        });
      }
    });

    Tracker.autorun((h)=>{
      this.trackerId_h = h;
      this.token = Session.get('token');
      if(Object.keys(this.token).length!== 0){
        this.setState({
          gotToken: true
        });
      }
    });

  },
  componentWillUnmount: function() {
    this.trackerId_c.stop();
    this.trackerId_d.stop();
    this.trackerId_e.stop();
    this.trackerId_b.stop();
    this.trackerId_f.stop();
    this.trackerId_h.stop();
  },

  componentDidMount: function() {
    //get guest Token

      data.initToken((err,response)=>{
        if(!err){
          this.token = Session.get('token');
          this.setState({
            gotToken: true
          });
          CartController.getAllItems(this.token.access_token,(err,response)=>{});
          data.initFB((response)=>{
            if(response.status === 'connected'){ //si hay email tenemos
              data.socialReLogin(this.token.access_token,(err,response)=>{
                this.setState({
                  gotFbResponse: true
                });
              });
            }else {
              this.setState({
                gotFbResponse: true
              });
            }
          });
          data.getCategories((err,response)=>{});
        }
      });
  },

  openMenu(){
    this.setState({
      openMenu: !this.state.openMenu
    });
  },

  loadingPage(){
    return(
      <div style={styles.logoLoading}>
        <img src={"/images/LogoAlta.png"} style={{width:'100%'}}/>
        <CircularProgress style={{marginLeft:'-25px',marginTop:'80px'}}/>
      </div>
    );
  },
  goToLogin(){
    if(!this.state.gotUser){
      this.context.router.push('/login')
    }
  },
  showCartPage(){
    this.context.router.push('/shoppingcart');
  },
  getShoppingcart(){
    var tooltipUser = (this.state.gotUser?this.state.user.firstname + ' ' + this.state.user.lastname:'Inicia sesión');
    return(
      <div>
        <IconButton
          tooltip={tooltipUser}
          onTouchTap = {this.goToLogin}>
          <ActionAccountCircle color={Colors.white}/>
        </IconButton>
        <IconButton
          tooltip="Carrito de compras"
          onTouchTap={this.showCartPage}>
          <ActionShoppingCart color={Colors.white}/>
        </IconButton>
        <Badge
          badg
          badgeContent={this.state.cartshopNumber}
          secondary={false}
          badgeStyle={{top: 0, right: 25,backgroundColor:Colors.pink800,color:Colors.white}}>
        </Badge>
      </div>
    );
  },
  closeLeftNav(){
    this.setState({
      openMenu: false
    });
  },
  _handleCloseSession(){

    this.setState({
      gotToken: false,
      user:{},
      gotUser:false,
      fbUser:false
    });

    FB.logout(function(response) {
    console.log(response);
    });

    Session.setPersistent('user',{});
    Session.setPersistent('token',{});
    Session.setPersistent('shoppingCart',{});
    Session.setPersistent('cartshopNumber',0);
    Session.setPersistent('isShoppingCartEmpty',true);

    data.initToken((err,response)=>{
        if(!err){
            console.log(response);
            this.setState({
              gotToken: true
            });
        }
    });
  },

  render() {
    var appLoaded = this.state.gotToken && this.state.gotCategories && this.state.gotFbResponse;
    return (
      <div>
        {!appLoaded?(this.loadingPage()):(
          <div>
          <AppBar
            title={this.state.pageTitle}
            style={{position:'fixed'}}
            iconElementRight = {this.getShoppingcart()}
            showMenuIconButton = {this.state.showMenuIconButton}
            onLeftIconButtonTouchTap ={this.openMenu}
            zDepth={2}/>
          <LeftNav
            ref= {"leftNav"}
            docked={this.state.leftNavDocked}
            open={this.state.openMenu}
            onRequestChange={open => this.setState({openMenu:open})}
            style={{zIndex:this.state.leftNavZIndex}}
            disableSwipeToOpen={false}
            overlayClassName={'overlayLeftNav'}
            width={256}>
            {!this.state.leftNavDocked?<AppBar
              title="Tulipanda"
              zDepth = {2}
              style={{position:'fixed'}}
              showMenuIconButton = {false}
              onLeftIconButtonTouchTap ={this.openMenu}/>:undefined}
            <GetLeftList
              close = {this.closeLeftNav}
              handleCloseSession = {this._handleCloseSession}
              categories={this.state.categories}
              gotUser = {this.state.gotUser}
              router={this.context.router}/>
          </LeftNav>

          <div style={this.state.childrenContainer}>
            {this.props.children}
          </div>
        </div>
        )}
      </div>
    );
  }
  });

const GetLeftList = React.createClass({
  contextTypes: {
    screensize: React.PropTypes.string,
    router: React.PropTypes.object
  },

  close:function(){
    switch(this.context.screensize){
      case 'small':
      case 'medium':
      this.props.close();
      break;
    };
  },

  _handleTouchTap:function(name,event){

    //console.log(i);
    this.close();
    //const test = event;
    Session.set('pageTitle',name);
    //console.log(event.currentTarget.value.toString());
    this.context.router.push('/categories/'+event.currentTarget.id.toString());
  },

  _handleUserListTouch:function(event){
    this.close();
    Session.set('pageTitle','Crear usuario');
    switch(event.currentTarget.id.toString()){
      case 'createUser':
        this.context.router.push('/createUser');
        break;
    }
  },

  renderNested:function(category){
    return category.categories.map((category)=>{
      return (
          <ListItem
            key={category.category_id}
            id={category.category_id}
            onTouchTap = {this._handleTouchTap.bind(this,category.name)}
            primaryText = {category.name}
            name = {category.name}
            value={category.category_id}/>
        );
    });
  },

  getCategories:function(){

    return this.props.categories.map((category)=>{
      if(category.categories){
        return(
          React.Children.toArray([
            <ListItem
              key={category.category_id}
              id={category.category_id}
              leftIcon = {<Icons.ROSE />}
              onTouchTap = {this._handleTouchTap.bind(this,category.name)}
              primaryText = {category.name}
              nestedItems={this.renderNested(category)}
              value={category.category_id}/>
          ])
        );

      }else{
        return (
          React.Children.toArray([
            <ListItem
              id={category.category_id}
              key={category.category_id}
              onTouchTap = {this._handleTouchTap.bind(this,category.name)}
              primaryText = {category.name}
              value={category.category_id}
            />
          ])
        );
      }
    });
  },
  _handleShoppingCart:function(){
    this.close();
    this.context.router.push('/shoppingcart');
  },

  _handleCloseSession:function(){
    this.close();
    this.props.handleCloseSession();
  },
  _handleGoToLogin:function(){
    this.close();
    this.context.router.push('/login');
  },
  render: function() {
    return (
      <SelectableList
        width={256}
        style={{marginTop:64}}>
        {this.getCategories()}
        <Divider/>
        <ListItem value={'shoppinCart'} onTouchTap={this._handleShoppingCart} primaryText = {'Carrito de compras'} />
        {!this.props.gotUser?(
          React.Children.toArray([
            <ListItem value={'createUser'} id={'createUser'} onTouchTap={this._handleUserListTouch} primaryText = {'Crear usuario'}/>,
          <ListItem value={'login'} id={'login'} onTouchTap={this._handleGoToLogin} primaryText = {'Iniciar sesión'}/>,
          ])
          ):(
          React.Children.toArray([
          <ListItem value={'user1'} onTouchTap={this._handleUpdateData} primaryText = {'Mis datos'} />,
          <ListItem value={'user2'} onTouchTap={this._handleShippingAddresses} primaryText = {'Direcciones de entrega'} />,
          <ListItem value={'user3'} onTouchTap={this._handleHistorial} primaryText = {'Historial de pedidos'} />,
          <ListItem value={'user4'} onTouchTap={this._handlePayment} primaryText = {'Métodos de pago'} />,
          <ListItem value={'user5'} onTouchTap={this._handleCloseSession} primaryText = {'Cerrar sesión'} />,
          ])
        )}
      </SelectableList>
    );
  }
});

function wrapList(ComposedComponent) {
  const StateWrapper = React.createClass({
    getInitialState() {
      return {selectedIndex: '25'};
    },

    _handleUpdateSelectedIndex(e, index) {
      this.setState({
        selectedIndex: index,
      });
    },

    render() {
      return (
        <ComposedComponent
          {...this.props}
          {...this.state}
          valueLink={{value: this.state.selectedIndex, requestChange: this._handleUpdateSelectedIndex}}
        />
      );
    },
  });
  return StateWrapper;
}
