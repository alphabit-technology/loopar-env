import {main} from "/components/elements.js";
import BaseInterface from "./base-interface.js";

export default class AuthInterface extends BaseInterface {
   constructor(props){
      super(props);
   }

   render(){
      return [
         this.dialogs,
         //main([
         ...this.last_state().children
         //])
      ];
   }
}