const { Paper, Dialog, Checkbox,Divider,RaisedButton} = mui;

var styles = {
  root: {
    display: 'flex',
    padding:8,
  },
  container:{
    display:'flex',
    flexWrap:'wrap',
    justifyContent:'flex-start',
    alignContent:'flex-start',
    width : '100%'
  }
};


ProductsByCategoryPage = React.createClass({
  mixins : [InfiniteScrollMixin],

  contextTypes: {
    screensize: React.PropTypes.string,
    token:React.PropTypes.object,
    router: React.PropTypes.object
  },

  getInitialState: function() {
    return {
      gotDataProducts: false,
      products:[]
    };
  },

  componentWillMount: function() {
    if(typeof this.props.params.categoryId == 'undefined'){
      this.props.params.categoryId = '25';
    };
    this.token = this.context.token;
  },
  componentDidMount: function() {
    //this.attachScrollListener();
    //this.attachScrollListener();
    //this.nextPage = 0;
    //this.fetchNextPage(0);
  },

  validateData:function(err,response){
    if(!err){
      if(response.data.success){
        //this.attachScrollListener();
        this.setState({
          products:this.state.products.concat(response.data.data),
          gotDataProducts:true,
          productNotFound:false
        });
      }else{
      }
    }else{
      throw new Meteor.Error('200','Lost Connection to the server');
    }
  },
  componentWillReceiveProps: function(nextProps) {
    if (this.props.params.categoryId!==nextProps.params.categoryId){
      this.nextPage = 1;
      this.setState({
        products: []
      });
    }
  },
  fetchNextPage:function(nextPage){
    backendCom.getProductsByCategoryLimited(
      this.token.access_token,
      this.props.params.categoryId,
      9,nextPage,(err,response)=>{
        this.validateData(err,response);
    });
  },

  renderTiles:function(){
    return this.state.products.map((product)=>{
      return(
        <ProductTilesArray
          router={this.context.router}
          key={product.id}
          product={product} />
      )
    })
  },

  render: function() {
    if (this.state.gotDataProducts && !this.state.productNotFound){
      return (
          <div style={styles.root} className={'ProductsByCategoryPage'} >
            <div style={styles.container}>
              {this.renderTiles()}
            </div>
          </div>
      );
    }else if(!this.state.gotDataProducts){
      return (<div></div>)
    }else if(this.state.gotDataProducts && this.state.productNotFound){
      return(
        <div>Producto no encontrado!</div>
      )
    }
  }
});

var ProductTilesArray = React.createClass({
  contextTypes: {
    screensize: React.PropTypes.string
  },

  _handleTouchTap:function(e){
    this.props.router.push('/products/'+e.currentTarget.id);
  },
  render: function() {
    return(
      <Paper className={'productTile'} zDepth={2} rounded={true}>
        <ProductTile
          id={this.props.product.id}
          onTouchTap={this._handleTouchTap}
          product={this.props.product}
          zoom = {false}
          picHeight={180}>
        </ProductTile>
      </Paper>
    );
  }
});
