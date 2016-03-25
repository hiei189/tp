const {ActionAddShoppingCart} = mui.SvgIcons;
const Colors = mui.Styles.Colors;
const {IconButton,FloatingActionButton,Snackbar,CircularProgress,FlatButton} = mui;

const styles= {
 image:{
   width:'100%',
   maxHeight:190
 },
 imageContainer:{
   flex:'40',
   height:190,
   display:'flex',
   alignItems:'center'
 },
 productDataContainer:{
   flex:'60',
   height:190,
   position:'relative',

 },
 productContainer:{
   width:'100%',
   flexDirection:'row',
   'display': 'flex',
 },
 productTitle:{
   paddingLeft:'5%',
   marginBottom:'-8px'
 },
 productDescription:{
   paddingLeft:'5%',
   overflow:'auto',
   height:80
 },
 iconAddShopping:{
   position:'absolute',
   bottom: '-16',
   right: '8px'
 },
 iconProgress:{
   position:'absolute',
   bottom: '-19',
   right: '3px'
 },
 priceText:{
   color:Colors.pink800
 }
};

ProductTile = React.createClass({

  getInitialState: function() {
    return {
      openTooltipRequest: false,
      gotCartResponse: true
    };
  },

  contextTypes: {
    router: React.PropTypes.object,
    token: React.PropTypes.object,
  },

  componentDidMount: function() {
  },

  componentWillMount: function() {
  },

  _handleTouchTap:function(e){
    this.context.router.push('/products/'+e.currentTarget.id);
  },

  handleAddtoCart:function(e){

    this.setState({
      gotCartResponse: false
    });

    CartController.addItem(
      this.props.product.id,1,
      this.context.token.access_token,(err,response)=>{
        if(response.data.success){
          this.setState({
            openTooltipRequest: true,
            gotCartResponse: true
          });
        }else{
          throw new Meteor.error(200,'No se pudo agregar el producto');
        }
    });
  },

  handleTooltipRequestClose:function(){
    this.setState({
      openTooltipRequest: false
    });
  },
  render: function() {
    const picHeight = this.props.picHeight?this.props.picHeight:240;
    const zoom = this.props.zoom?'zoom':'';
    const onTouchTap = this.props.onTouchTap?this.props.onTouchTap:'';
    return (
      <div className={'productContainer'} >
        <div className={'productImgContainer'}>
          <img
            id = {this.props.product.id}
            className={'productImg'}
            style={styles.image}
            src={this.props.product.image}
            data-action={zoom}
            onTouchTap={onTouchTap}
          />
        </div>
        <div className={'productDataContainer'}  >
          <div className={'productTitle'}
            onTouchTap={this._handleTouchTap}
            id={this.props.product.id}>
            <h4>{this.props.product.name}</h4>
          </div><hr/>
          <div className={'productDescription'}>
            {this.props.product.description}
          </div>
          <div className={'productPriceText'} style={styles.priceText}>
            {'S/. '+this.props.product.price}
          </div>
          <div className={'productIcons'} >
            {this.state.gotCartResponse?(
              <FloatingActionButton
              mini={true}
              style={styles.iconAddShopping}
              tooltip={"Agregar al carrito"}
              onTouchTap={this.handleAddtoCart}>
              <ActionAddShoppingCart/>
            </FloatingActionButton>
              ):(
              <CircularProgress
                size={0.5}
                tooltip = {"Cargando"}
                style={styles.iconProgress}
              />
            )}
          </div>
        </div>
        <Snackbar
          open={this.state.openTooltipRequest}
          message={this.props.product.name+ ' agregado al carrito'}
          autoHideDuration={2000}
          onRequestClose={this.handleTooltipRequestClose}
        />
      </div>
    );
  }
});
