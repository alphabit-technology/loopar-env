import Component from "../base/component.js";
import {div} from "/components/elements.js";

export default class Col extends Component {
   className = "col";
   block_component= true;
   constructor(props) {
      super(props);
   }

   render(content = null) {
      return super.render([
            this.last_state().children || this.props.children || content,
            ...this.elements
         ]
      );
   }

   make(){
      super.make();
      const data = this.data || {};
      const {size="md", col=6} = data;
      this.props.designer && this.add_class("element draggable");
      this.add_class(`col-${col*2} col-${size}-${col}`);
   }
}

export const col = (options) => {
   return new Col(options);
}