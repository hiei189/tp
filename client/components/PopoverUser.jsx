const { Popover,Avatar,Divider,Menu,MenuItem } = mui;
const { SocialPerson } = mui.SvgIcons;


const styles={
  container:{
    display:'flex',
    flexDirection:'column',
  },
  avatar:{
    margin:'20px auto 15px auto',
    display:'block',
  },
  avatarContainer:{
    width:'100%'
  },
  row:{
    width:'100%'
  },
  nameContainer:{
    textAlign:'center',
    width:'100%',
    marginBottom:'20px'
  }
}

PopoverUser = React.createClass({

  contextTypes:{
    gotUser: React.PropTypes.bool,
    fbUser: React.PropTypes.bool,
    user:React.PropTypes.object,
    router: React.PropTypes.object
  },

  componentWillMount: function() {

  },

  componentWillUpdate: function(nextProps, nextState) {

  },

  goUserPage:function(){
    const {router} = this.context;
    const {onRequestClose} = this.props;

    router.push('/user');
    onRequestClose();
  },

  logOut:function(){
    const {beforeLogout,onRequestClose} = this.props;
    beforeLogout();
    onRequestClose();
  },

  render: function() {
    const { anchorEl,open,onRequestClose }  = this.props;
    const { gotUser,user,fbUser } = this.context;
    return (
      <Popover
        open={open}
        animated={true}
        canAutoPosition={true}
        onRequestClose = {onRequestClose}
        anchorEl={anchorEl} anchorOrigin={{"horizontal":"middle","vertical":"bottom"}}
        targetOrigin={{"horizontal":"middle","vertical":"top"}}>
        <div style={styles.container}>
          <div styles={styles.avatarContainer}>
            <Avatar icon={<SocialPerson />} style={styles.avatar}/>
          </div>
          <div style={styles.nameContainer}>
            {gotUser?user.firstname.split(' ')[0] + ' ' +  user.lastname.split(' ')[0]:'Invitado'}
          </div>
          <div>
            <Divider />
            <Menu width={188}>
              <MenuItem primaryText={'Datos de usuario'} onTouchTap={this.goUserPage}/>
              <MenuItem primaryText={'Cerrar sesión'} onTouchTap={this.logOut}/>
            </Menu>
          </div>
        </div>
      </Popover>
    );
  }
});
