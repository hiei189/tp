const {Checkbox} = mui;

var setMuiComponentAndMaybeFocus = function(c) {
 if (c === this.muiComponent) return;

 this.muiComponent = c;

 if (c && typeof c.focus === 'function') {
   this.focus = () => c.focus();
 } else if (this.hasOwnProperty('focus')) {
   delete this.focus;
 }
}

FormsyCheckbox = React.createClass({

  propTypes: {
    defaultChecked: React.PropTypes.bool,
    name: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func,
  },

  mixins: [Formsy.Mixin],

  componentDidMount() {
    this.setValue(this.muiComponent.isChecked());
  },

  handleChange(event, value) {
    this.setValue(value);
    if (this.props.onChange) this.props.onChange(event, value);
  },

  setMuiComponentAndMaybeFocus: setMuiComponentAndMaybeFocus,

  render() {
    const { defaultChecked, ...rest } = this.props;
    let value = this.getValue();
    if (typeof value === 'undefined') {
      value = (typeof defaultChecked !== 'undefined') ? defaultChecked : false;
    }
    return (
      <Checkbox
        {...rest}
        checked={value}
        onCheck={this.handleChange}
        ref={this.setMuiComponentAndMaybeFocus}
      />
    );
  },
});
