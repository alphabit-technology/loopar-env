import FileInput from "./file-input.js";
import {h1, div, figure, image, p, h6, span, a, small} from "/components/elements.js";

export default class ImageInput extends FileInput {
   input_type = 'file';

   constructor(props) {
      super(props);

      this.state = {
         ...this.state,
         multiple: props.meta.data.multiple || false,
         accept: props.meta.data.accept || 'image/*',
      }
   }

   render() {
      return super.render();
   }
}