import {BaseInput} from "../base/base-input.js";

export default class Date extends BaseInput {
   constructor(props) {
      super(props);
   }

   make() {
      super.make();

      this.dtsel = new dtsel.DTS(this.input.node, {
         direction: 'BOTTOM',
         showTime: false,
         showDate: true
      });
   }

   val(val) {
      if(val){
         val = dayjs(val).format().slice(0, 10);
         this.dtsel.inputElem.value = val;
      }else{
         return this.dtsel.inputElem.value;
      }
   }
}