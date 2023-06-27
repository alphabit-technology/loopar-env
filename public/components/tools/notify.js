import {div,span,a,button,strong} from "../components/elements.js";

export default class Dialog extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         type: props.type || 'success',
         title: props.title,
         message: props.message,
         visible: true,
         timeout:  props.timeout || 4000,
      };
   }

   render() {
      const {visible, message, type} = this.state;

      /*return visible ? div({className: `toast toast-${type} ${visible ? "show" : ""}`, role: "alert", "aria-live": "assertive", "aria-atomic": "true", style: {display: visible ? "block" : "none"}},[
         a({className: "toast-close-button", role: "button", href: "#", onClick: () => {this.hide()}}, [
            span({className: "toast-close-icon"}, "x")
         ]),
         div({className: "toast-message"}, message),
      ]) : null;*/

      return visible ? div({className: `alert alert-${type} alert-dismissible fade show`, style: {display: visible ? "block" : "none", backgroundColor: "var(--light)"}},[
         button({type: "button", className: "close", onClick: () => this.hide()}, "×"),
         strong(message)
      ]) : null;

      /*`<div class="alert alert-success alert-dismissible fade show">
           <button type="button" class="close" data-dismiss="alert">×</button>
           <strong>Well done!</strong> You successfully read <a href="#" class="alert-link">this important alert message</a>.
      </div>`*/
   }

   show(props) {
      this.setState({...props, visible: true});

      setTimeout(() => this.hide(), this.state.timeout || 4000);
   }

   hide() {
      this.state.visible && this.setState({visible: false});
   }
}