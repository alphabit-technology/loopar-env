import {DefaultCheckbox} from "/components/base/default-checkbox.js";
import {BaseInput} from "../base/base-input.js";

export class Input extends BaseInput {
   constructor(props) {
      super(props);
   }
}

export class Password extends BaseInput {
   input_type = 'password';

   constructor(props) {
      super(props);
   }
}

export class TextArea extends BaseInput {
   input_tag_name = 'textarea';

   constructor(props) {
      super(props);
   }
}

export class Checkbox extends DefaultCheckbox {
   constructor(props) {
      super(props);
   }
}

export class Switch extends DefaultCheckbox {
   constructor(props) {
      super(props);
   }
}

export class Date extends BaseInput {
   constructor(props) {
      super(props);
   }

   make() {
      super.make();

      new dtsel.DTS(this.input.node, {
         direction: 'BOTTOM',
         showTime: false,
         showDate: true
      });
   }
}

export class DateTime extends BaseInput {
   constructor(props) {
      super(props);
   }
   make() {
      super.make();

      new dtsel.DTS(this.input.node, {
         direction: 'BOTTOM',
         showTime: true,
         showDate: true
      });
   }
}

export class Time extends BaseInput {
   constructor(props) {
      super(props);
   }

   make() {
      super.make();

      new dtsel.DTS(this.input.node, {
         direction: 'BOTTOM',
         showTime: true,
         showDate: false
      });
   }
}

export const input = (options) => {
   return new Input(options);
}

export const checkbox = (options) => {
   return new Checkbox(options);
}

/*export const _switch = (options) => {
   return new Switch(options);
}*/

export const password = (options) => {
   return new Password(options);
}

export const text_area = (options) => {
   return new TextArea(options);
}

export const date = (options) => {
   return new Date(options);
}

export const date_time = (options) => {
   return new DateTime(options);
}

export const time = (options) => {
   return new Time(options);
}