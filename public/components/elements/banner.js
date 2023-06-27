import Component from "../base/component.js";

import {image, div} from "../elements.js";
import Div from "./div.js";
export default class Image extends Div {
   //className = "col-12 col-md-6 aos-init aos-animate";
   constructor(props){
      props["data-aos"] = "fade-right";
      props["data-aos-delay"] = "100";
      super(props);
   }

   render(){
      const data = this.last_state().data || {};
      const [src="", alt=""] =[data.action, data.options];

      return super.render([
         //div({className: "col-12 col-md-6 aos-init aos-animate", "data-aos": "fade-right", "data-aos-delay": "100"}, [
            image({src, alt, className: "img-fluid mb-4 mb-md-0"})
         ///])
      ])
   }
}