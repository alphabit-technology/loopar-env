import {ListGrid} from "/components/elements/form-table.js";
import BaseDesk from "./base/base-desk.js";

export default class ListContext extends BaseDesk {
   has_header = true;
   context = 'index';
   render_structure = false;

   constructor(options) {
      super(options);
   }

   set_data(data) {
      super.set_data(data);
      this.grid.setState({data: {meta: data}});
   }

   render() {
      const data = this.data;

      return super.render([
         ListGrid({data: {meta: data}, ref: (self) => this.grid = self})
      ]);
   }
}