const {SelectField} = mui;
var _setMuiComponentAndMaybeFocus = function(c) {
 if (c === this._muiComponent) return;

 this._muiComponent = c;

 if (c && typeof c.focus === 'function') {
   this.focus = () => c.focus();
 } else if (this.hasOwnProperty('focus')) {
   delete this.focus;
 }
}
FormsySelect = React.createClass({
  mixins: [ Formsy.Mixin],

  propTypes: {
    name: React.PropTypes.string.isRequired
  },

  getInitialState: function () {
    return {
      hasChanged: false,
    };
  },

  handleChange: function (event, index, value) {
    this.setValue(value);
    this.setState({hasChanged: true});
    if (this.props.onChange) this.props.onChange(event, value, index);
  },

  _setMuiComponentAndMaybeFocus: _setMuiComponentAndMaybeFocus,

  render: function () {
    var value = this.state.hasChanged ? this.getValue() : this.props.value;

    return (
      <SelectField
        {...this.props}
        ref={this._setMuiComponentAndMaybeFocus}
        onChange={this.handleChange}
        errorText={this.getErrorMessage()}
        value={value}
      >
        {this.props.children}
      </SelectField>
    );
  }
});
