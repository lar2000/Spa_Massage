/*! Bootstrap 5 integration for DataTables' FixedColumns
 * © SpryMedia Ltd - datatables.net/license
 */
!function(t){var d,o;"function"==typeof define&&define.amd?define(["jquery","datatables.net-bs5","datatables.net-fixedcolumns"],function(e){return t(e,window,document)}):"object"==typeof exports?(d=require("jquery"),o=function(e,n){n.fn.dataTable||require("datatables.net-bs5")(e,n),n.fn.dataTable.FixedColumns||require("datatables.net-fixedcolumns")(e,n)},"undefined"==typeof window?module.exports=function(e,n){return e=e||window,n=n||d(e),o(e,n),t(n,0,e.document)}:(o(window,d),module.exports=t(d,window,window.document))):t(jQuery,window,document)}(function(e,n,t){"use strict";return e.fn.dataTable});