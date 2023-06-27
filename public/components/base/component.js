import {HTML} from "/components/base/html.js";
import {element_title} from "/components/element-manage.js";
import {div} from "/components/elements.js";

export default class Component extends HTML {
   droppable = true;
   draggable = true;
   constructor(props) {
      super(props);
   }

   render(content=null) {
      return super.render([
         this.options.has_title ? element_title(this) : null,
         content
      ])
   }

   make(){
      super.make();
      if(this.options.designer){
         this.add_class("draggable designer")
      }
   }
}

export const component = (options) => {
   return new Component(options)
}