import {BaseInput} from "/components/base/base-input.js";
import {loopar} from "/loopar.js";

export default class Markdown extends BaseInput {
   is_writeable = false;

   constructor(props = {}) {
      super(props);
   }

   render() {
      const data = this.data;

      return super.render([
         !this.options.designer ? React.createElement("div", this.innerHtml(marked.parse(data.value || ""))) : null
      ]);
   }

   make() {
      super.make();
      const data = this.data;
      this.label.remove_class('d-block');
      this.label.add_class('d-none');
      ///this.label.replace_class('d-block', 'd-none');
      this.input.add_class('d-none');

      this.css({'display': 'block'});

      if(this.options.designer) {
         this.editor = new SimpleMDE({
            element: this.input.node,
            toolbar: ["bold", "italic", "heading", "|", "quote", "unordered-list", "ordered-list", "|", "link", "image", "|", "preview"],
         });
         this.editor.value(data.value);

        this.editor.codemirror.on('change', () => {
            data.value = this.editor.value();
         });


      }else{
         Object.values(this.node.getElementsByTagName("a")).forEach(a => {
            a.addEventListener("click", (e) => {
               e.preventDefault();
               e.stopPropagation();
               loopar.navigate(a.href);
            });
         });
      }
   }

   /*val(val = null) {
      console.log(["markdow value", val])
      if (val != null) {
         this.designer && this.editor.value(val);

         this.trigger('change');
      } else {
         return this.data.value;
      }
   }*/
}

export const markdown = (options) => {
   return new Markdown(options);
}