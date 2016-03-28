
Page = React.createClass({
  componentWillMount: function() {
    console.log('will mount');
    Tracker.autorun((a)=>{
      this.tracker_id = a;
      console.log(Session.get('var'));
    });
  },
  componentDidMount: function() {
    console.log('did mount');
  },
  componentWillUnmount: function() {
    console.log('will unmount');
    this.tracker_id.stop();
  },
  render: function() {
    console.log('rendering');
    return (
      <div />
    );
  }

});
