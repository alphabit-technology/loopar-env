import Div from "./div.js";
import {image, div, h3, p} from "../elements.js";
export default class TextBlock extends Div {
   constructor(props){
      super(props);
   }

   render(){
      const data = this.last_state().data || {};
      const [label="", description=" With a user-friendly, simple and responsive design, you can easily attract your prospective clients. Don't worry! our team will always be behind you if needed. "] =[data.action, data.options];

      return super.render([
         div({className: "col-12 col-md-6 order-md-1 text-center text-sm-left"}, [
            h3({className: "h3 mb-4"}, label),
            p({className: "text-muted font-size-lg mb-4"}, description)
         ])
      ])
   }
}