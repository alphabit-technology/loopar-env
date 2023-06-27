import {a, h6, i, span} from "../elements.js";
import Div from "./div.js";
import {div} from "../elements.js";

export default class Card extends Div {
   droppable = false;
   block_component = true;

   constructor(props) {
      super(props);
   }

   render(content = null) {
      this.make_components();

      return super.render([
         this.header,
         div({
            component: this,
            //parent: this,
            sub_element: true,
            className: "sub-element card-body collapse show" + (this.props.bodyClassName ? " " + this.props.bodyClassName : ""),
            ref: el =>  this.container = el
         }, [
            content || this.last_state().children,
            ...this.elements
         ])
      ]);
   }

   make_components() {
      this.header = div({className: 'card-header'},
         h6(
            a({
               className: "btn btn-reset",
               onClick: () => {
                  this.toggle_hide();
               }
            }, [
               span({
                     ref: el => this.title = el,
                     className: 'mr-2'
                  },
                  this.data.label
               ),
               span({className: 'collapse-icon mr-2'},
                  i({
                     ref: el => this.collapse_icon = el,
                     className: 'fas fa-chevron-up',
                     onClick: () => {
                        this.toggle_hide();
                     }
                  })
               )
            ])
         )
      );
   }

   make() {
      super.make()
      if(this.options.designer){
         this.add_class("designer");
         this.add_class("draggable");

         this.container.add_class("sub-element droppable");

         this.container.droppable_actions();
      }

      this.add_class("card card-fluid");
   }

   toggle_hide(hide = null) {
      this.is_hide = hide !== null ? hide : !this.is_hide;
      if (this.is_hide) {
         this.container.hide();
         this.collapse_icon.replace_class("fa-chevron-up", "fa-chevron-down");
      } else {
         this.container.show();
         this.collapse_icon.replace_class("fa-chevron-down", "fa-chevron-up");

      }
   }
}

export const card = (options) => {
   return new Card(options);
}