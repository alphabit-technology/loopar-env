import {Element, hr,  h2, br, div} from "../components/elements.js";
import {Capitalize} from "/utils/helper.js";
import DivClass from "/components/elements/div.js";
import {loopar} from "/loopar.js";
import {element_manage} from "/components/element-manage.js";


export class ElementEditorClass extends DivClass {
   form_fields = [];

   constructor(props) {
      super(props);

      this.state = {
         connected_element: null
      }
   }

   get dataElements () {
      return {
         //tag: {element: INPUT},
         label: {element: INPUT},
         name: {element: INPUT},
         description: {element: TEXTAREA},
         format: {
            element: SELECT,
            data: {
               options: [
                  {option: 'data', value: 'Data'},
                  {option: 'text', value: 'Text'},
                  {option: 'email', value: 'Email'},
                  {option: 'decimal', value: 'Decimal'},
                  {option: 'percent', value: 'Percent'},
                  {option: 'currency', value: 'Currency'},
                  {option: 'int', value: 'Int'},
                  {option: 'long_int', value: 'Long Int'},
                  {option: 'password', value: 'Password'},
                  {option: 'read_only', value: 'Read Only'}
               ],
               selected: 'data'
            }
         },
         size: {
            element: SELECT,
            data: {
               options: [
                  {option: 'sm', value: 'Small'},
                  {option: 'md', value: 'Medium'},
                  {option: 'lg', value: 'Large'}
               ],
               selected: 'md'
            }
         },
         col: {
            element: SELECT,
            data: {
               options: [
                  {option: '1', value: '1'},
                  {option: '2', value: '2'},
                  {option: '3', value: '3'},
                  {option: '4', value: '4'},
                  {option: '5', value: '5'},
                  {option: '6', value: '6'},
                  {option: '7', value: '7'},
                  {option: '8', value: '8'},
                  {option: '9', value: '9'},
                  {option: '10', value: '10'},
                  {option: '11', value: '11'},
                  {option: '12', value: '12'}
               ],
               selected: 'md'
            }
         },
         type: {
            element: SELECT,
            data: {
               options: [
                  {option: 'default', value: 'Default'},
                  {option: 'primary', value: 'Primary'},
                  {option: 'success', value: 'Success'},
                  {option: 'info', value: 'Info'},
                  {option: 'link', value: 'link'},
               ],
               selected: 'default'
            }
         },
         action: {element: INPUT},
         options: {element: TEXTAREA},
         style: {element: TEXTAREA},
         class: {element: TEXTAREA},
         not_validate_type: {element: SWITCH},
         required: {element: SWITCH},
         unique: {element: SWITCH},
         set_only_time: {element: SWITCH},
         draggable: {element: SWITCH},
         droppable: {element: SWITCH},
         sortable: {element: SWITCH},
         hidden: {element: SWITCH},
         disabled: {element: SWITCH},
         readonly: {element: SWITCH},
         in_list_view: {element: SWITCH},
         searchable: {element: SWITCH},
         collapsed: {element: SWITCH}
      }
   }

   render() {
      const connected_element = this.connectedElement || null;
      if(!connected_element) return null;
      this.form_fields = [];
      const data = connected_element.meta.data || {};
      const DI = this.optionsDisabled(connected_element.element);

      return super.render([
         div({className: 'form-group'}, [
            br(),
            h2({className: "card-title"}, Capitalize(connected_element.element) + " Editor")
         ]),
         ...Object.entries(this.dataElements).map(([field, props]) => {
               const hide = DI.length > 0 && DI.includes(field) && DI[0] !== 'all' || (DI[0] === 'all' && !DI.includes(field));
               return hide ? null : Element(props.element, {
                  ref: self => this.form_fields[field] = self,
                  meta: {
                     data: Object.assign({}, props.data || {}, {name: field, value: data[field] || '', test_field: 'test'}),
                  },
                  onChange: () => {
                     console.log('change')
                     this.saveData();
                  }
               });
         }).filter(e => e !== null),
         hr()
      ]);
   }

   onUpdate(){
      Object.entries(this.form_fields).forEach(([field_name, field]) => {
         field && field.removeClass("form-group").addClass("my-1");
      });
   }

   getData(){
      return Object.entries(this.form_fields).reduce((acc, [key, value]) => {
         acc[key] = value && value.val()
         return acc;
      }, {});
   }

   editElement(element) {
      this.setState({connected_element: element});
   }

   get connectedElement() {
      return this.state.connected_element;
   }

   saveData() {
      const data = this.getData();
      if(loopar.Designer.updateElement(this.connectedElement.meta.data.name, data)) {
         this.state.connected_element.meta.data = data;
      }
   }

   optionsDisabled(element) {
      const input_type_format = ['droppable', 'collapsed', 'type', 'action', 'options'];
      const inputs_type_element = ['droppable', 'collapsed', 'format', 'type', 'action', 'size', 'options'];
      const html = ['required', 'in_list_view', 'collapsed', 'label', 'format', 'datatype', 'options', 'type', 'size', 'action', 'no_validate_type', 'unique'];
      const button = html.concat(input_type_format).filter(item => !['label', 'size', 'type', 'action'].includes(item));
      const markdown = ['all', 'style', 'class'];

      return {
         [INPUT]: input_type_format,
         [TEXTAREA]: inputs_type_element,
         [PASSWORD]: inputs_type_element.filter(item => !['size'].includes(item)),
         [DATE]: inputs_type_element,
         [DATE_TIME]: inputs_type_element,
         [TIME]: inputs_type_element,
         [CHECKBOX]: inputs_type_element,
         [SWITCH]: inputs_type_element,
         [SELECT]: inputs_type_element.filter(field => !['options'].includes(field)),
         [TABLE]: inputs_type_element,
         [COL]: html.filter(field => !['size'].includes(field)),
         [ROW]: html,
         [CARD]: html.filter(field => !['collapsed', 'label'].includes(field)),
         [BUTTON]: button,
         [MARKDOWN]: markdown,
      }[element.split('.')[0]] || [];
   }
}

export const ElementEditor = (props, content) => {
   return React.createElement(ElementEditorClass, props, content);
}