import {loopar} from '/loopar.js';
import Div from "/components/elements/div.js";
import {make_elements} from "/components/element-manage.js";

export class BaseDocument extends Div {
   form_fields = {};
   structure_has_created = false;
   sub_elements = [];

   constructor(props) {
      super(props);

      this.state = {
         sidebar_open: false,
         design: false,
         preview: false,
      }
   }

   set_data(data) {
      this.setState({data: data});

      loopar.root_app.toggle_current_app(this.identifier);
      this.show();
   }

   make(){
      super.make();
      this.#set_global_name();
   }

   __CONTENT__(content) {
      const data = this.data;

      if(!this.structure_has_created && Object.keys(data).length > 0) {
         this.sub_elements = this.render_structure !== false && data ? make_elements(data.__DOCTYPE__.STRUCTURE, {app: this, component: this, node_ref: this.form_fields}) : [];
         this.structure_has_created = true;
      }

      return [...this.sub_elements, ...content];
   }

   #set_global_name() {
      const name = loopar.current_page(this.data.source_url);
      this.app_id = name;

      loopar.current_page_name = this.data.__DOCTYPE__.name;

      setTimeout(() => {
         if (name) {
            loopar[name] = this;

            if (loopar.root_app) {
               loopar.root_app.apps[name] = this;
            }
         }
      }, 0);
   }
}