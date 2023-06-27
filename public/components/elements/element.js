import {HTML} from "/components/base/html.js";
import {element_title} from "/components/element-manage.js";

export default class Div extends HTML {
   tag_name = "div";
   droppable = true;
   draggable = true;
   constructor(props) {
      super(props);
   }

   render(content=null) {
      return super.render([
         this.options.has_title ? element_title(this) : null,
         content || this.last_state().children || this.props.children || []
      ]);
   }
}

export const div = (options) => {
   return new Div(options)
}