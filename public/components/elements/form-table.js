import {a, button, div, i, input, label, small, span, table, tbody, td, th, thead, tr, tfoot, Input, elements} from "/components/elements.js";
import Div from "/components/elements/div.js";
import {http} from "/utils/http.js";
import {avatar} from '/utils/helper.js';
import {Pagination} from "/plugins/pagination.js";
import {loopar} from "/loopar.js";

export default class TableClass extends Div {
   #rows_inputs = [];
   rows = {};

   className = "card card-fluid";
   style = {height: "100%", margin: 0};
   selected_rows = 0;

   data_example = {
      columns_title: [
         {element: "input", data: {col: 'name', title: 'Name', element: 'input', required: true}},
         {element: "select", data: {col: 'description', title: 'Description', element: 'input'}},
         {element: "input", data: {col: 'disabled', title: 'Disabled', element: 'switch'}}
      ],
      rows: [
         {name: 'Raquel', description: 'Acosta', disabled: true},
         {name: 'Alfredo', description: 'Ramirez', disabled: true}
      ]
   };

   constructor(options) {
      super(options);
   }

   get rows_inputs() {
      return this.#rows_inputs;
   }

   get rows_count() {
      return this.data_table.rows.length;
   }

   get data_table() {
      return this.data.data_table || this.data_example;
   }

   render() {
      const data_table = this.data_table;
      const selected_rows = this.state.selected_rows || 0;
      const pagination = this.data.pagination || {
         page: 1,
         per_page: 10,
         total: 0,
         total_pages: 0
      };

      return super.render([
         div({className: "card-body"}, [
            div({className: "dataTables_wrapper dt-bootstrap4 no-footer", style: {height: "100%"}}, [
               div({className: 'table-responsive', style: {height: "calc(100% - 67px)"}}, [
                  table({className: 'table table-condensed table-hover'}, [
                     thead([
                        tr(data_table.columns_title.filter(col => col.data.col !== "name").map(column =>
                           th({colSpan: column.data.col === "selector" ? 2 : 0}, [
                              typeof column.data.title == "function" ? column.data.title(selected_rows) : column.data.title
                           ])
                        ))
                     ]),
                     tbody([
                        data_table.rows.map(row => {
                           return tr([
                              data_table.columns_title.map(column => {
                                 const data = column.data || {};
                                 return td(data.rows_props || {}, [
                                    //return td(data.rows_props || {}, elements(Object.assign({withoutLabel: true}, column))[column.element]());
                                    data.value ? (typeof data.value === "function" ? data.value(row) : data.value) : row[data.col]
                                 ]);
                              })
                           ])
                        })
                     ])
                  ]),
               ]),
               Pagination({data: {pagination}, app: this})
            ])
         ])
      ])
   }
}

class ListGridClass extends Div {
   #rows_inputs = [];

   selected_rows = {};
   selectors = {};

   constructor(props) {
      super(props);
   }

   find_column(cols, name) {
      return cols.find(column => column.data.col === name);
   }

   make_columns(data) {
      const colors = ['pink', 'purple', 'indigo', 'blue', 'cyan', 'teal', 'green', 'orange', 'red'];
      this.selector_name = this.app.app_id + "_selector";

      data.data_table.columns_title.forEach(column => {
         if (column.data.col === 'name') {
            column.data.rows_props = {className: "align-middle text-truncate"};
            column.data.value = (row) => {
               const color = colors[Math.floor(Math.random() * colors.length)];

               return div({className: "media align-items-center"}, [
                  a({
                     key: row.name + "_avatar",
                     test_element: "avatar",
                     href: `update?document_name=${row.name}`,
                     className: `tile bg-${color} text-white mr-2`
                  }, avatar(row.name)),
                  div({className: "media-body"}, [
                     a({key: row.name + "_description", href: `update?document_name=${row.name}`}, row.description || row.name),
                     small({className: "d-block text-muted"}, row.name)
                  ])
               ]);
            }
         }
      });

      if (!this.find_column(data.data_table.columns_title, 'actions')) {
         const actions_col =
            {
               className: "align-middle text-right",
               data: {
                  is_added: true,
                  col: 'actions',
                  title: '',
                  rows_props: {
                     className: "align-middle text-right"
                  },
                  value: (row) => {
                     return button({
                        className: "btn btn-sm btn-icon btn-outline-danger",
                        onClick: () => {
                           this.delete_row(row);
                        }
                     }, [
                        i({className: "fas fa-trash-alt"})
                     ])
                  }
               }
            }

         data.data_table.columns_title.push(actions_col);
      }

      if (!this.find_column(data.data_table.columns_title, 'selector')) {
         const selector_col =
            {
               className: "align-middle col-checker",
               data: {
                  is_added: true,
                  col: 'selector',
                  rows_props: {
                     className: "align-middle col-checker"
                  },
                  title: (rows_selected) => {
                     return div({className: "thead-dd dropdown"}, [
                        span({className: "custom-control custom-control-nolabel custom-checkbox"}, [
                           input({
                              type: "checkbox",
                              className: "custom-control-input",
                              id: this.selector_name,
                              onChange: (e) => {
                                 this.select_all_visible_rows(e.target.checked);
                              },
                              ref: (self) => this.selectors.selector_all = self
                           }),
                           label({
                              className: "custom-control-label",
                              htmlFor: this.selector_name,
                           })
                        ]),
                        div({
                           className: "thead-btn",
                           role: "button",
                           "data-toggle": "dropdown",
                           "aria-haspopup": true,
                           "aria-expanded": false
                        }, [
                           span({
                              className: "selected-row-info text-muted pl-1",
                           }, [
                              rows_selected && rows_selected > 0 ? `${rows_selected} selected ` : ''
                           ]),
                           span({className: "fa fa-caret-down"})
                        ]),
                        div({
                           className: "dropdown-menu"
                        }, [
                           div({className: "dropdown-arrow"}),
                           a({
                              className: "dropdown-item", href: "#",
                              onClick: () => {
                                 this.select_all_visible_rows(true);
                              }
                           }, [
                              "Select all"
                           ]),
                           a({
                              className: "dropdown-item", href: "#",
                              onClick: () => {
                                 this.select_all_visible_rows(false);
                              }
                           }, [
                              "Unselect all"
                           ]),
                           div({className: "dropdown-divider"}),
                           a({className: "dropdown-item", href: "#"}, [
                              "Bulk remove"
                           ])
                        ])
                     ])
                  },
                  value: (row) => {
                     return span({className: "custom-control custom-control-nolabel custom-checkbox"}, [
                        input({
                           key: row.name + "_selector",
                           type: "checkbox",
                           className: "custom-control-input",
                           id: row.name,
                           onChange: (e) => {
                              this.select_row(row, e.target.checked);
                           },
                           ref: (self) => this.selectors[row.name] = self
                        }),
                        label({
                           key: row.name + "_selector_label",
                           className: "custom-control-label",
                           htmlFor: row.name
                        })
                     ])
                  }
               }
            }

         data.data_table.columns_title.unshift(selector_col);
      }

      return data;
   }

   select_all_visible_rows(checked) {
      this.selected_rows = checked ? Object.assign({}, this.#rows_inputs) : {};

      this.table.setState({selected_rows: this.selected_rows_count});

      this.set_selectors_status();
   }

   set_rows_inputs() {
      this.#rows_inputs = this.data.data_table.rows.reduce((acc, row) => {
         acc[row.name] = row;
         return acc;
      }, {});
   }

   select_row(row, checked) {
      console.log(['select_row', row.name, checked]);
      checked ? this.selected_rows[row.name] = row : delete this.selected_rows[row.name];

      this.table.setState({selected_rows: this.selected_rows_count});

      this.set_selectors_status();
   }

   onUpdate() {
      this.set_selectors_status();
   }

   get rows_count() {
      return Object.keys(this.#rows_inputs).length;
   }

   get selected_rows_count() {
      return Object.keys(this.selected_rows).length;
   }

   set_selectors_status() {
      const rows_selected = this.selected_rows_count;
      this.selectors.selector_all.node.indeterminate = false;

      if (rows_selected > 0) {
         if (rows_selected === this.rows_count) {
            this.selectors.selector_all.node.checked = true;
         } else {
            this.selectors.selector_all.node.indeterminate = true;
         }
      } else {
         this.selectors.selector_all.node.indeterminate = false;
         this.selectors.selector_all.node.checked = false;
      }

      Object.entries(this.selectors).forEach(([name, selector]) => {
         if (selector && selector.node && name !== 'selector_all') {
            selector.node.checked = !!this.selected_rows[name];
         }
      });
   }

   delete_row(row) {
      loopar.dialog({
         type: 'confirm',
         title: "Confirm",
         message: `Are you sure you want to delete ${row.name}?`,
         ok: () => {
            http.send({
               action: 'delete',
               params: {document_name: row.name},
               success: (data) => {
                  loopar.root_app.refresh().then(() => {
                     loopar.navigate(window.location.pathname);
                  });
                  loopar.dialog({
                     type: 'success',
                     title: "Success",
                     message: `Document ${row.name} deleted`
                  });
               }
            });
         }
      });
   }

   set_data(data) {
      this.setState({data: data});
      this.table.setState({
         data: this.make_columns(data),
         selected_rows: 0,
      });
   }

   render() {
      const data = this.make_columns(this.data);
      this.set_rows_inputs();

      this.selectors = {};
      this.selected_rows = [];

      return Table({
         app: this.app,
         component: this,
         data: data,
         ref: (table) => this.table = table
      });
   }
}

export const ListGrid = (props, content) => {
   return React.createElement(ListGridClass, props, content);
}

export const Table = (props, content) => {
   return React.createElement(TableClass, props, content);
}