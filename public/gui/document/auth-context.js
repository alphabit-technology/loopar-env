import BaseDocument from "./base/base-document.js";

export default class Auth extends BaseDocument {
   has_form = true;
   constructor(props) {
      super(props);
   }

   render(content=[]) {
      return super.render([
         ...super.__CONTENT__(content)
      ]);
   }
}