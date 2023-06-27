import {BaseInput} from "../base/base-input.js";

export default class TextArea extends BaseInput {
   input_tag_name = 'textarea';

   constructor(props) {
      super(props);
   }
}

export const text_area = (options) => {
   return new TextArea(options);
}