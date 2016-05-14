const {ContentAdd,ContentRemove,ContentClear} = mui.SvgIcons;
const {IconButton,FloatingActionButton,Snackbar,TextField,FlatButton,CircularProgress} = mui;
const Colors = mui.Styles.Colors;


const styles= {
  addremove:{
    minWidth:'0',
  },
  addremoveIcon:{
    marginLeft:'0px',
    verticalAlign:'middle',
  },
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
   position:'relative'
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
 iconRemove:{
   position:'absolute',
   bottom: '-16',
   right: '8px'
 },
 iconProgress:{
   position:'absolute',
   bottom: '-19',
   right: '3px'
 },
 icons:{

 }
};

ProductCartTile = React.createClass({
  getInitialState: function() {
    return {
      openRequest: false
    };
  },

  contextTypes: {
    router: React.PropTypes.object,
    token: React.PropTypes.object
  },

  _handleTouchTap:function(e){
    this.context.router.push('/products/'+e.currentTarget.id.toString());
  },

  handleRequestClose:function(){
    this.setState({
      openRequest: false
    });
  },
  removeItem:function(){
    this.setState({
      isAppLoading: true
    });
    CartController.removeItem(
      this.props.product.key,
      this.context.token.access_token,
      (err,response)=>{
        if(response.data.success){
          this.setState({ //CORREGIR LOS ESTADOS
            gotCartResponse: true,
            isAppLoading: false
          });
        }else{
          throw new Meteor.Error(302,'No se pudo agregar el producto');
        }
      }
    );
  },
  removeOneItem:function(){
    this.setState({
      isAppLoading: true
    });
    CartController.removeOneItem(
      this.props.product.key,
      this.props.product.quantity,
      this.context.token.access_token,
      (err,response)=>{
        if(response.data.success){
          this.setState({ //CORREGIR LOS ESTADOS
            gotCartResponse: true,
            isAppLoading:false
          });
        }
      });
  },
  addItem:function(){
    this.setState({
      isAppLoading: true
    });
    CartController.addItem(
      this.props.product.product_id,1,
      this.context.token.access_token,
      (err,response)=>{
        if(response.data.success){
          this.setState({ //CORREGIR LOS ESTADOS
            gotCartResponse: true,
            isAppLoading:false
          });
        }else{
          throw new Meteor.Error(302,'No se pudo agregar el producto');
        }
      });
  },

  render: function() {
    const picHeight = this.props.picHeight?this.props.picHeight:240;
    const zoom = this.props.zoom?'zoom':'';
    const onTouchTap = this.props.onTouchTap?this.props.onTouchTap:'';
    return (
      <div style={styles.productContainer}>
        <div style={styles.imageContainer}>
          <img
            id = {this.props.product.key+'img'}
            style={styles.image}
            src={this.props.product.thumb}
            data-action={zoom}/>
        </div>
        <div style={styles.productDataContainer} >
          <div style={styles.productTitle}
            onTouchTap={this._handleTouchTap}
            id={this.props.id}>
            <h4>{this.props.product.name}</h4>
          </div><hr/>
          <div style={styles.productDescription}>
            {'Cantidad:' }
            <div style={{marginLeft:'8',display:'inline-block'}}>
              <FlatButton
                style={styles.addremove}
                onTouchTap={this.removeOneItem}
                primary={true}>
                <ContentRemove color={Colors.pink800} style={styles.addremoveIcon}/>
              </FlatButton>
              <span style={{margin:'5'}}>
                {this.props.product.quantity}
              </span>
              <FlatButton
                style={styles.addremove}
                primary={true}
                onTouchTap={this.addItem}>
                <ContentAdd color={Colors.pink800} style={styles.addremoveIcon}/>
              </FlatButton>
            </div>
            <br/>
            {'Precio: '+ this.props.product.total}
          </div>
          <div styles={styles.icons}>
            {this.state.isAppLoading?(
              <CircularProgress
              size={0.5}
              tooltip = {"Cargando"}
              style={styles.iconProgress}
            />
              ):(
              <FloatingActionButton
                mini={true}
                style={styles.iconRemove}
                labelStyle={styles.addremoveLabel}
                tooltip={"Eliminar del carrito"}
                onTouchTap={this.removeItem}>
                <ContentClear/>
              </FloatingActionButton>
            )}
          </div>
        </div>
        <Snackbar
          open={this.state.openRequest}
          message={this.props.product.name+ ' removido del carrito'}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }

});
