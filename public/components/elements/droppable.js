import {HTML} from "/components/base/html.js";
import {make_elements} from "/components/element-manage.js";
export default class Droppable extends HTML {
   tag_name = "div";
   structure_has_created = false;
   sub_elements = [];
   constructor() {
      super();
   }

   /*connectedCallback() {
      super.connectedCallback();
      this.addEventListener("dragover", this.dragover);
      this.addEventListener("drop", this.drop);
   }*/

   render() {
      const data = this.last_state().data;
      if(!this.structure_has_created) {
         this.sub_elements = data ? make_elements(data, {parentClass: this, parent: this}) : [];
         this.structure_has_created = true;
      }

      return React.createElement("div", {
         className: "droppable",
         onDragOver: (event) => {
            event.preventDefault();
         },
         onDrop: (event) => {
            event.preventDefault();
            this.dispatchEvent(new CustomEvent("drop", {detail: event.dataTransfer.getData("text/plain")}));
         }
      }, this.sub_elements);

      /*return `
         <div class="droppable" ondragover="event.preventDefault()" ondrop="event.preventDefault(); this.dispatchEvent(new CustomEvent('drop', {detail: event.dataTransfer.getData('text/plain')}))">
            ${data}
         </div>
      `;*/
   }
}