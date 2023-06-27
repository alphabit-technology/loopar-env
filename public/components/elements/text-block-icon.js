import Component from "./component.js";
import {image, div, h3, p} from "../elements.js";
export default class TextBlock extends Component {
   defaultDescription = "This a user-friendly, simple and responsive Text Block.";
   constructor(props){
      super(props);
   }

   render(){
      const data = this.last_state().data || {};
      const [label="Text Block", description=this.defaultDescription] =[data.label, data.description];

      return super.render([
         div({className: "col-12 col-md-6 order-md-1 text-center text-sm-left"}, [
            h3({className: "h3 mb-4"}, label),
            p({className: "text-muted font-size-lg mb-4"}, description)
         ])
      ]);
   }
}