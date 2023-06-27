
import BaseDesk from "./base/base-desk.js";

export default class Form extends BaseDesk {
   sidebar_open = false;
   has_header = true;
   has_sidebar = true;

   constructor(props) {
      super(props);
   }

   toggle_sidebar(show = null) {
      const open = this.sidebar_open = show !== null ? show : !this.sidebar_open;

      this.sidebar[(open ? "remove" : "add") + "_class"]("d-none");
   }
}