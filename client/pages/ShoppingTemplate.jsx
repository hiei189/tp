const {ContentSend} = mui.SvgIcons;
const { Paper, RaisedButton, CircularProgress,FloatingActionButton} = mui;
const Colors = mui.Styles.Colors;

const styles={
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

ShoppingTemplate = React.createClass({

  contextTypes: {
    screensize: React.PropTypes.string,
    gotUser: React.PropTypes.bool,
    router:React.PropTypes.object
  },

  getInitialState: function() {
    return {
      noProducts: true
    };
  },
  componentWillMount: function() {
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

  _handleBuy:function(){
    switch (this.props.location.pathname) {
      case '/shoppingcart':
        if(this.context.gotUser){
          this.context.router.push('/shipping');
        }
        else{
          this.context.router.push('/login');
        }
        break;
      case '/shipping':
        if(this.context.gotUser){
          formsController.shippingController();
          //this.context.router.push('/delivery');
        }
        else{
          this.context.router.push('/login')  ;
        }
        break;
      case '/delivery':
          if(this.context.gotUser){
            //this.context.router.push('/delivery');
          }
          else{
            //this.context.router.push('/login');
          }
          break;
      default:

    }

  },

  componentWillUnmount: function() {
    this.trackerId_a.stop();
  },
  render: function() {
    return (
      <div>
        {this.props.children}
        {this.state.noProducts?null:<div style={styles.footer}>
          <h3 style={{marginRight:16}} >{'TOTAL: '+ this.state.total}</h3>
          <FloatingActionButton onTouchTap = {this._handleBuy}>
            <ContentSend />
          </FloatingActionButton>
        </div>}
      </div>
    );
  }

});
