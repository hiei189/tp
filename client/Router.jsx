const {Route, Router,IndexRoute,browserHistory} = ReactRouter;
Meteor.startup(function() {

      Session.set('pageTitle','Tulipanda');
      Session.set('cartshopNumber','0');
      Session.set('token',{});
      Session.set('user',{});
      Session.set('places','NO_DATA');
      Session.set('gotFbResponse',{});
      Session.set('fbResponse',{});
      Session.set('isShoppingCartEmpty',true);
      Session.set('shoppingCart',{});

      data.initToken((err,response)=>{
          if(!err){
            this.token = Session.get('token');
            data.initFB((response)=>{});
            CartController.getAllItems(this.token.access_token,(err,response)=>{});
            data.getCategories((err,response)=>{});
          }
        });

      //const browserHistory = ReactRouter.history.useQueries(ReactRouter.history.createHistory)();
      const Routes = (
          <Route path="/" component={App}>
            <IndexRoute component={ProductsByCategoryPage} />
            <Route path="/categories/:categoryId" component ={ProductsByCategoryPage}/>
            <Route path="/products/:productId" component ={ProductByIdPage}/>
            <Route path="/createuser" component ={CreateUserPage}/>
            <Route path="/login" component ={LoginPage}/>
            <Route path="/user" component = {UserPage}/>
            <Route path="shoppingcart" component = {CartPage}/>
            <Route path="shoppingdetails" component = {ShoppingDetails}/>
          </Route>
        );
      ReactRouterSSR.Run(Routes);
      //ReactDOM.render(Routes,document.getElementById('react-target'));

  })

  //<Router  history={browserHistory}>
  //</Router>
