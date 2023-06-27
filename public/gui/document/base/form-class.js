import {object_manage} from "/utils/object-manage.js";

//import {modal_dialog} from '/utils/modal-dialog.js';
import {http} from '/utils/http.js';
import {loopar} from '/loopar.js';
import {BaseDocument} from "./base-document.js";

//export class BaseForm extends BaseApp {
export class BaseForm extends BaseDocument {
   tag_name = "form";
   has_sidebar = true;
   document_is_set = false;

   constructor(props) {
      super(props);
   }

   save() {
      this.send(this.data.action);
   }

   send(action = this.action) {
      return new Promise((resolve, reject) => {
         http.send({
            action: action,
            params: this.params,
            body: this.form_values,
            success: r => {
               if(r && r.content && r.content.success){
                  loopar.root_app.refresh().then(() => {
                     loopar.navigate("update?document_name=" + r.content.document_name);
                  });
                  //loopar.navigate("update?document_name=" + r.content.document_name);
                  loopar.notify(r.content.message);
               } this.content = r.content;
               resolve(r);
            },
            error: r => {
               reject(r);
            }
         });
      });
   }

   make_form_actions() {
      this.form.on('submit', (obj, event) => {
         event.preventDefault();

         this.save();
      });
   }

   load_document() {
      const state = this.last_state();
      if(!this.document_is_set) this.document = clone(state.data.__DOCUMENT__);
   }

   onUpdate() {
      this.load_document();
   }

   set document(data) {
      this.document_is_set = true;
      Object.entries(data).forEach(([field_name, value]) => {
         const field = this.get_field(field_name);

         if(field) {
            field.is_writeable && field.val(value);

            if(field.element === MARKDOWN_INPUT) {
               field.setState({data: {editing_mode: true}});
            }
         }
      });
   }

   get params() {
      return {
         document_name: this.data.__DOCUMENT_NAME__,
      }
   }

   get document() {
      return Object.entries(this.form_fields).reduce((obj, [key, value]) => {
         obj[key] = value.val();
         return obj;
      }, {});

      /*const values = this.#values();

      if (this.#designer_container && this.__doc_structure) {
         values[this.__doc_structure.data.name] = JSON.stringify(this.#designer_container.field_data());
      }

      return {
         document: this.document,
         document_name: this.#document_name,
         values: values
      };*/
   }

   get is_designer() {
      return !!this.#designer_container;
   }

   get #designer_container() {
      return this.doc_designer;
   }

   /*get __doc_structure() {
      return this.container && this.container.fields ? (this.container.fields['doc_structure'] || this.container.fields['form_structure'] || null) : null;
   }

   value_is_valid(value) {
      return typeof value != null && typeof value != "undefined" && value.toString().length > 0;
   }*/

   validate() {
      const errors = [];

      const _validate = (fields) => {
         object_manage.in_object(fields, field => {
            if (object_manage.is_obj(field)) {
               if (field.typeof === "JSHtml") {
                  const valid = field.validate();

                  if (!valid.valid) {
                     errors.push(valid.message);
                  }
               } else {
                  _validate(field);
               }
            }
         });
      }

      _validate(this.container.fields);

      /*if (errors.length > 0) {
         modal_dialog({
            title: 'Validation error',
            message: errors.join('<br/>')
         });

         throw errors.join('<br>');
      }*/
   }

   get_field(name) {
      return this.form_fields[name] || null;
   }

   get form_values() {
      return Object.entries(this.form_fields).reduce((obj, [key, value]) => {
         obj[key] = value.val();
         return obj;
      }, {});
   }

   set_value(name, value) {
      const field = this.get_field(name);
      if (field) {
         field.val(value);
      }
   }
}