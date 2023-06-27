import BaseDocument from "./base/base-document.js";

export default class View extends BaseDocument {
   constructor(props) {
      super(props);
   }

   render(content=[]) {
      return super.render([
         ...super.__CONTENT__(content)
      ]);
   }
}