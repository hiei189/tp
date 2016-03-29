const { AppBar, IconButton, IconMenu, LeftNav,Badge,Divider,CircularProgress,List,Dialog,ListItem,SvgIcon,Avatar} = mui;
const {ActionShoppingCart,ActionAccountCircle} = mui.SvgIcons;
const {getMuiTheme} = mui.Styles;
const Colors = mui.Styles.Colors;
const {SelectableContainerEnhance} = mui;
//import { Grid,Row, Col } from 'react-flexbox-grid/lib/index';

let SelectableList = SelectableContainerEnhance(List);
SelectableList = wrapList(SelectableList);

const {Link} = ReactRouter;

var styles = {
  selectedCategory:{
    color:Colors.pink500,
    backgroundColor:''
  },
  selectedAvatar:{
    fill:Colors.pink500
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
      muiTheme: getMuiTheme(theme),
      screensize: Session.get('device-screensize'),
      user: this.state.user,
      gotUser: this.state.gotUser,
      token: Session.get('token')
    };
  },

  getInitialState() {

    return {
      openMenu: false,
      gotToken:false,
      gotCategories:false,
      leftNavDocked:true,
      cartshopNumber:'0',
      user:{},
      gotUser: false,
      fbUser:false,
      categories:{},
      gotFbResponse: false,
      marginLeft:{
        marginLeft:0
      },
      childrenContainer:{
        paddingTop:64,
        paddingBottom:96,
      },
      moveValue:'0px',
    };
  },

  componentWillMount: function() {
    this.navbarWidth = '112px';

    Tracker.autorun((d)=>{
      this.trackerId = d;
      let user = Session.get('user');
      Tracker.nonreactive(()=>{
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

    });

    Tracker.autorun((e)=>{
      this.trackerId_e = e;
      let cartshopNumber = Session.get('cartshopNumber');
      Tracker.nonreactive(()=>{
        this.setState({
          cartshopNumber: cartshopNumber//read qty of items in cartshop
        });
      });
    });

    Tracker.autorun((c)=>{
      this.trackerId_c = c;
      this.screensize = Session.get('device-screensize'); //read screen changes
      Tracker.nonreactive(()=>{
        switch(this.screensize){
          case "large":
          case "xlarge":
          case "xxlarge":
            this.setState({
              leftNavDocked: true,
            });
              this.setState({
                moveValue: this.navbarWidth,
                openMenu:true
              });
            break;
          case "small":
          case "medium":
            this.setState({
              openMenu:false,
              leftNavDocked: false,
              showMenuIconButton:true,
              moveValue:'0px',
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

    });

    Tracker.autorun((b)=>{
      this.trackerId_b = b;
      let pageTitle = Session.get('pageTitle');
      Tracker.nonreactive(()=>{
        this.setState({
          pageTitle: pageTitle
        });
      });
    });


    Tracker.autorun((f)=>{
      this.trackerId_f = f;
      let fbUser = Session.get('fbUser');
      Tracker.nonreactive(()=>{
        this.setState({
          fbUser: fbUser
        });
      });

    });

    Tracker.autorun((g)=>{
      this.trackerId_g = g;
      let categories = Session.get('categories');
      Tracker.nonreactive(()=>{
        if(categories){
          this.setState({
            categories: categories
          });
          if(Object.keys(categories).length!== 0){
            this.setState({
              gotCategories: true
            });
          }
        }

      });
    });

    Tracker.autorun((h)=>{
      this.trackerId_h = h;
      this.token = Session.get('token');
      Tracker.nonreactive(()=>{
        if(Object.keys(this.token).length!== 0){
          this.setState({
            gotToken: true
          });
        }
      });
    });

    Tracker.autorun((i)=>{
      this.trackerId_i = i;
      this.fbResponse = Session.get('fbResponse');
      Tracker.nonreactive(()=>{
        if(Object.keys(this.fbResponse).length !== 0){
          switch (this.fbResponse.status) {
            case 'connected':
              data.socialReLogin(this.token.access_token,(err,response)=>{});
              break;
          }
          this.setState({
            gotFbResponse: true
          });
        }
      });
    })

  },
  componentWillUnmount: function() {
    this.trackerId_c.stop();
    this.trackerId_d.stop();
    this.trackerId_e.stop();
    this.trackerId_b.stop();
    this.trackerId_f.stop();
    this.trackerId_h.stop();
    this.trackerId_i.stop();
  },

  componentDidMount: function() {

  },

  openMenu(){
    let openMenu = this.state.openMenu
    this.setState({
      openMenu: !openMenu
    });

    if(!openMenu && this.state.leftNavDocked){
      this.setState({
          moveValue:this.navbarWidth
      });
    }else{
      this.setState({
          moveValue:'0px'
      });
    }
  },

  loadingPage(){
    return(
      <div id={'divLogoLoading'}>
        <img id={'imgLogoLoading'} src={"/images/LogoAlta.png"}/>
        <CircularProgress id={'progressLogoLoading'}/>
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
      openMenu: false,
      moveValue:0
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
    let smallScreen = this.screensize==='small'||this.screensize==='medium';
    let leftNavWidth = smallScreen?272:112;
    //leftnavstyle     containerStyle={Object.assign({},{zIndex:this.state.leftNavZIndex,paddingTop:this.state.paddingTopNavBar})  }
    return (
      <div>
        {!appLoaded?(this.loadingPage()):(
          <div>
          <AppBar
            title={this.state.pageTitle}
            style={{position:'fixed'}}
            iconElementRight = {this.getShoppingcart()}
            showMenuIconButton = {!this.state.leftNavDocked}
            onLeftIconButtonTouchTap ={this.openMenu}
            zDepth={0}/>
          <LeftNav
            containerClassName = {'leftNav'}
            ref= {"leftNav"}
            docked={this.state.leftNavDocked}
            open={this.state.openMenu}
            onRequestChange={open => this.setState({openMenu:open})}
            disableSwipeToOpen={false}
            zDepth={1}
            overlayClassName={'overlayLeftNav'}
            width={leftNavWidth}>
            <GetLeftList
              close = {this.closeLeftNav}
              handleCloseSession = {this._handleCloseSession}
              categories={this.state.categories}
              gotUser = {this.state.gotUser}
              router={this.context.router}/>
          </LeftNav>

          <div id={'childrenContainer'} style={{paddingLeft:this.state.moveValue}}>
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
    muiTheme: React.PropTypes.object,
    screensize: React.PropTypes.string,
    router: React.PropTypes.object,
    user: React.PropTypes.object,
    gotUser:React.PropTypes.bool
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
    const clickedItem = event.currentTarget;
    Session.set('pageTitle',name);
    Session.set('selectedItem',clickedItem);
    this.context.router.push('/categories/'+clickedItem.id.toString());
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
  getCategoriesDesktop:function(){
    return this.props.categories.map((category)=>{
      let icon = category.icon.toUpperCase();
      let IconComponent = Icons[icon];
      return(
        React.Children.toArray([
          <Li
            key={category.category_id}
            category = {category}
            onTouchTap = {this._handleTouchTap}/>
        ])
      );
      });

  },

  getCategoriesMobile:function(){
    //innerDivStyle={{paddingTop:'24px',paddingBottom:'24px'}}
    return this.props.categories.map((category)=>{
      const styleAvatar = Session.get('selectedItem')==category.category_id?styles.selectedAvatar:null;
      let icon = category.icon.toUpperCase();
      let IconComponent = Icons[icon];
        if(category.categories){
          return(
            React.Children.toArray([
              <ListItem
                key={category.category_id}
                id={category.category_id}
                leftIcon = {<IconComponent style={styleAvatar}/>}
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
                leftIcon = {<IconComponent style={styleAvatar}/>}
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
  _handleUpdateData:function(){
    this.close();
    this.context.router.push('/user');
  },
  _handleCloseSession:function(){
    this.close();
    this.props.handleCloseSession();
  },
  _handleGoToLogin:function(){
    this.close();
    this.context.router.push('/login');
  },
  _handleUserListTouch:function(){
    this.close();
    this.context.router.push('/user');
  },
  render: function() {
    let smallScreen = this.context.screensize==='small'||this.context.screensize==='medium';
    let width = smallScreen?272:128;
    return (
      <SelectableList
        id = {'leftNavListContainer'}>
        <div id ={'LogoNavContainer'}>
          <Icons.LOGO_PANDA_DER id={'LogoNavIcon'} />
          <h3 id={'LogoNavTitle'}>
            {'Tulipanda'}
          </h3>
        </div>
        <Divider/>
        {smallScreen?(
          this.getCategoriesMobile()):
            (<ul className={'desktopList'}>
            {this.getCategoriesDesktop()}
          </ul>)
        }
        {smallScreen?<ListItem value={'user'}
          id={'divUserListItem'}
          onTouchTap={this._handleUserListTouch}
          leftIcon = {<ActionAccountCircle/>}
          primaryText = {'Usuario'}/>:null}
      </SelectableList>
    );
  }
});

var Li = React.createClass({

  _handleTouchTap:function(e){
    const {category} = this.props;
    this.props.onTouchTap(category.name,e);
  },
  getInitialState: function() {
    return {
      hovered: false
    };
  },
  mouseOver:function(){
    this.setState({
      hovered: true
    });
  },
  mouseOut:function(){
    this.setState({
      hovered: false
    });
  },

  render: function() {
    const {category,selected} = this.props;
    let icon = category.icon.toUpperCase();
    let IconComponent = Icons[icon];
    const classNameIconListItem = this.state.hovered || selected?'desktopIconListItem hoveredListItem':'desktopIconListItem';
    const classNameTitleListItem = this.state.hovered || selected?'desktopTitleListItem hoveredListItem':'desktopTitleListItem';
    return (
      <li
        onMouseOver={this.mouseOver}
        onMouseOut={this.mouseOut}>
        <a
          className={'desktopListItem'}
          id={category.category_id}
          value ={category.category_id}
          onTouchTap = {this._handleTouchTap}>
          <IconComponent className={classNameIconListItem}/>
          <span className={classNameTitleListItem}>{category.name.toUpperCase()}</span>
        </a>
      </li>
    );
  }

});




function wrapList(ComposedComponent) {
  const StateWrapper = React.createClass({
    getInitialState:function() {
      Session.set('selectedItem','25');
      return {selectedIndex: '25'};
    },

    componentWillMount: function() {
      Tracker.autorun((a)=>{
        this.trackerId_a = a;
        var selectedItem = Session.get('selectedItem');
        Tracker.nonreactive(()=>{
          this.setState({
            selectedIndex: selectedItem
          });
        });
      });
    },

    componentWillUnmount: function() {
      this.trackerId_a.stop();
    },

    _handleUpdateSelectedIndex:function(e, index) {
      
    },

    render:function() {
      return (
        <ComposedComponent
          selectedIndex = {this.state.selectedIndex}
          selectedItemStyle = {styles.selectedCategory}
          {...this.props}
          {...this.state}
          valueLink={{value: this.state.selectedIndex, requestChange: this._handleUpdateSelectedIndex}}
        />
      );
    },
  });
  return StateWrapper;
}
