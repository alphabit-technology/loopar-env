import {image, div, h2, p} from "../elements.js";
import BaseTextBlock from "../base/base-text-block.js";

export default class Banner extends BaseTextBlock {
   className = "position-relative pb-5 bg-light";
   defaultDescription = "This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.";
   style = {
      height: "80vh"
   };
   constructor(props){
      super(props);
   }

   render(){
      const {label, description, action} = this.data;
      const children = this.state.children;

      return super.render([
         div({className: "sticker"}, [
            div({className: "sticker-item sticker-soften", style: {width: "100%"}}, [
               image({src: action, alt: "Sticker", className: "img-fluid", width: "100%"})
            ])
         ]),
         div({className: "container position-relative", style: {top: "30%"}}, [
            h2({className: "display-4 text-center", designer: true}, label),
            p({className: "lead text-center"}, [description, children]),
         ])
      ])
   }
}