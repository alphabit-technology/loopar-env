import {loopar} from "../../loopar.js";
import {Dialog, Notify} from "../../components/elements.js";
import {prepareOptions} from "../../components/element-manage.js";
import {HTML} from "../../components/base/html.js";

export default class BaseWorkspace extends HTML {
   apps = {};
   constructor(props){
      props.state = {
         children: props.children,
         open_dialogs: 0,
      };

      props = prepareOptions(props);

      super(props);
   }

   set_app(app) {
      const children = this.state.children || [];
      children.push(app);

      this.setState({children: children});
      this.toggle_current_app(app.key);
   }

   toggle_current_app(current){
      Object.keys(this.apps).filter(app => app !== current).forEach(app => {
         this.apps[app].hide();
      });

      this.apps[current] && this.apps[current].show();
   }

   make(){
      super.make();
      loopar.root_app = this;
   }

   get dialogs(){
      const state = this.last_state();
      return Object.values(state.dialogs || {}).map(dialog => {
         dialog.ref = ref => this[dialog.message] = ref;
         return Dialog(dialog);
      });
   }

   get notifies(){
      const state = this.last_state();
      return Object.values(state.notifies || {}).map(notify => {
         notify.ref = ref => this[notify.message] = ref;
         return Notify(notify);
      });
   }

   set_dialog(dialog){
      const state = this.last_state();
      const current_dialogs = state.dialogs || {};
      current_dialogs[dialog.message] = dialog;

      this.setState({dialogs: current_dialogs, open_dialog: true});

      setTimeout(() => {
         this[dialog.message].show(dialog);
      }, 0);
   }

   set_notify({message, type = "info", timeout}){
      const state = this.last_state();
      const current_notifies = state.notifies || {};
      current_notifies[message] = {message, type, timeout};

      this.setState({notifies: current_notifies});

      setTimeout(() => {
         this[message].show({message, type, timeout});
      }, 0);
   }

   set_count_dialogs(count){
      const dialogs = (this.last_state().open_dialogs || 0) + count;

      this.setState({open_dialogs: dialogs > 0 ? dialogs : 0});
   }
}