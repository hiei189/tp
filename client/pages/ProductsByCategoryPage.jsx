const { Paper, Dialog, Checkbox,Divider,RaisedButton,Tabs,Tab,CircularProgress} = mui;
const Colors = mui.Styles.Colors;
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
      products:[],
      productsLoaded:0
    };
  },

  componentWillMount: function() {
    console.log('component will mount');
    this.categories = Session.get('categories');
    if(typeof this.props.params.categoryId == 'undefined'){
      this.props.params.categoryId = '25';
      this.selectedCategory = this.props.params.categoryId;
      Session.set('selectedItem','25');
    };
    this.token = this.context.token;
    this.getCategories(this.props);

    this.selectedCategory = this.props.params.categoryId;

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
      this.selectedCategory = nextProps.params.categoryId;
      this.nextPage = 1;
      this.setState({
        products: []
      });
      this.getCategories(nextProps);

    }
  },

  getCategories:function(nextProps){
    switch (this.context.screensize) {
      case 'large':
      case 'xlarge':
      case 'xxlarge':
        this.selectedCategoryObject = this.categories.find((category,idx,arr)=>{
          return category.category_id === nextProps.params.categoryId
        });
        console.log(this.selectedCategoryObject);
        Session.set('Category'+nextProps.params.categoryId,'LOADING');
        if(this.selectedCategoryObject.categories){
          Session.set('Category'+nextProps.params.categoryId,'LOADING');
          this.setState({
            gotProducts: false,
            productsLoaded: 0
          });
          this.selectedCategoryObject.categories.map((category)=>{
            backendCom.getProductsByCategory(this.token.access_token,category.category_id,
            (err,response)=>{
              if(!err){
                console.log(response.data);
                Session.set('Category'+category.category_id,response.data);
                this.setState({
                  gotProducts: true,
                  productsLoaded: this.state.productsLoaded + 1
                });
              }else {
                Session.set('Category'+category.category_id,'ERROR');
              }
            });
          });
        }else{
          Session.set('Category'+nextProps.params.categoryId,'LOADING');
          this.setState({
            gotProducts: false,
            productsLoaded: 0
          });
          backendCom.getProductsByCategory(this.token.access_token,nextProps.params.categoryId,
          (err,response)=>{
            if(!err){
              console.log(response.data);
              Session.set('Category'+nextProps.params.categoryId,response.data);
              this.setState({
                gotProducts: true,
                productsLoaded: this.state.productsLoaded + 1
              });
            }else{
              Session.set('Category'+nextProps.params.categoryId,'ERROR');
            }
          });
        }
        break;
    }
  },
  fetchNextPage:function(nextPage){
    console.log('fetchNextPage');
    backendCom.getProductsByCategoryLimited(
      this.token.access_token,
      this.selectedCategory,
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

  resetInfinite:function(){
    console.log('activeTab');
    this.nextPage = 1;
    //this.fetchNextPage(this.nextPage);
  },

  getDesktopTabs:function(){

    if(this.selectedCategoryObject.categories){
        let ProductsArray = this.selectedCategoryObject.categories.map((category)=>{
          return(
            <Tab key={category.category_id} label={category.name}>
              <ProductsComponent categoryId = {category.category_id} />
            </Tab>
          );
        });
        return <Tabs tabItemContainerStyle={{color:Colors.pink500}}>{ProductsArray}</Tabs>
    }else{
        return <ProductsComponent categoryId = {this.selectedCategoryObject.category_id} />
    }


  },

  render: function() {

    const {screensize} = this.context
    const {params} = this.props;

    if (this.state.gotDataProducts && !this.state.productNotFound){
      switch (screensize) {
        case 'small':
        case 'medium':
          return (
              <div style={styles.root} className={'ProductsByCategoryPage'} >
                <div style={styles.container}>
                  {this.renderTiles()}
                </div>
              </div>
          );
          break;
        case 'large':
        case 'xlarge':
        case 'xxlarge':
          return(
              this.getDesktopTabs()
          );
          break;
        default:
      }
    }else if(!this.state.gotDataProducts){
      return (<div></div>)
    }else if(this.state.gotDataProducts && this.state.productNotFound){
      return(
        <div>Categoría no encontrada!</div>
      )
    }
  }
});


var ProductsComponent = React.createClass({
  contextTypes:{
    screensize: React.PropTypes.string,
    token:React.PropTypes.object,
    router: React.PropTypes.object
  }
  ,
  getInitialState: function() {
    return {
      gotProducts: false,
      products: {}
    };
  },
  componentWillMount: function() {

  },

  componentWillUnmount: function() {

  },

  renderTiles:function(products){
    return products.data.map((product)=>{
      return(
        <ProductTilesArray
          router={this.context.router}
          key={product.id}
          product={product} />
      )
    })
  },
  render: function() {
    let products =  Session.get('Category'+this.props.categoryId);
    if(products !== null && typeof products === 'object'){
      if(products.success){
        return (
          <div style={styles.root} className={'ProductsByCategoryPage'} >
            <div style={styles.container}>
              {this.renderTiles(products)}
            </div>
          </div>
        );
      }else{
        return <div>
          Aún no hay componentes en esta categoría!
        </div>
      }
    }else if(products === 'ERROR'){
      return <div>
        Hubo un error obteniendo la información.
      </div>
    }else if(products === 'LOADING'){
      return <div style={{textAlign:'center',margintTop:'50%'}}>
        <CircularProgress/>
      </div>
    }else{
      return <div style={{textAlign:'center',margintTop:'50%'}}>
      </div>
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
