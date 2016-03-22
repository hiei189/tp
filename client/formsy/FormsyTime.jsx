const {TimePicker} = mui;

var _setMuiComponentAndMaybeFocus = function(c) {
  if (c === this._muiComponent) return;

  this._muiComponent = c;

  if (c && typeof c.focus === 'function') {
   this.focus = () => c.focus();
  } else if (this.hasOwnProperty('focus')) {
   delete this.focus;
  }
}

FormsyTime = React.createClass({
  mixins: [ Formsy.Mixin ],

  propTypes: {
    name: React.PropTypes.string.isRequired
  },

  handleValueChange: function (event, value) {
    this.setValue(value);
    if (this.props.onChange) this.props.onChange(event, value);
  },

  _setMuiComponentAndMaybeFocus: _setMuiComponentAndMaybeFocus,

  render: function () {
    return (
      <TimePicker
        {...this.props}
        ref={this._setMuiComponentAndMaybeFocus}
        onChange={this.handleValueChange}
      />
    );
  }
});
