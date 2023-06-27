import {div,h5,button,span,i} from "../components/elements.js";
import {loopar} from "/loopar.js";

export default class Dialog extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         type: props.type || 'alert',
         title: props.title,
         message: props.message,
         content: props.content,
         buttons: props.buttons,
         visible: true,
         ok: props.ok,
         cancel: props.cancel,
         on_close: props.on_close
      };
   }

   get buttons(){
      const buttons = this.state.buttons || [];
      if(buttons.length === 0) {
         buttons.push({
            text: 'OK',
            onClick: () => {
               this.state.ok && this.state.ok();
               this.hide();
            },
            dismiss: true
         });

         this.state.type === "confirm" &&
         buttons.push({
            text: 'Cancel',
            onClick: () => {
               this.state.cancel && this.state.cancel();
               this.hide();
            },
            dismiss: true
         });
      }

      return buttons;
   }

   render() {
      const {visible, title, message, content, type} = this.state;
      let icon = 'fa-info-circle';
      if(type === 'alert')
         icon = 'fa-exclamation-circle';
      else if(type === 'confirm')
         icon = 'fa-question-circle';
      else if(type === 'error')
         icon = 'fa-exclamation-triangle';
      else if(type === 'success')
         icon = 'fa-check-circle';

      const text_colors = {
         info: 'text-blue',
         alert: 'text-dark',
         confirm: 'text-dark',
         error: 'text-red',
         success: 'text-green'
      };

      return div({ className: `modal modal-dialog-scrollable modal-${type} fade ${visible ? 'show' : ''} has-shown`, style: {display: visible ? 'block' : 'none'}},
         div({className: 'modal-dialog', role: 'document'},
            div({className: 'modal-content'},[
               div({ className: 'modal-header modal-body-scrolled'},[
                  h5({className: 'modal-title'}, [
                     i({className: `fa ${icon} ${text_colors[type]} mr-2`}),
                     title
                  ]),
                  button({
                        type: 'button', className: 'close',
                        onClick: () => this.hide()
                     },
                     span({'aria-hidden': 'true'}, '×')
                  )
               ]),
               React.createElement('div', {className: 'modal-body', dangerouslySetInnerHTML: {__html: `<h6 style="text-align:left;">${message || content}</h6>`}}),
               div({className: 'modal-footer'}, this.buttons.map(b => {
                  return button({
                     type: 'button', className: `btn btn-${b.type || 'primary'}`,
                     onClick: () => {
                        b.dismiss && this.hide();
                        b.onClick();
                     }
                  }, b.text);
               }))
            ])
         )
      )
   }

   show(props) {
      this.setState({...props, visible: true});
      loopar.root_app.setCountDialogs(1);
   }

   hide() {
      this.setState({visible: false});
      this.state.on_close && this.state.on_close();
      loopar.root_app.setCountDialogs(-1);
   }
}