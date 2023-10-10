// import {BasicGridColumn} from '../../../../../components/metadata';
// import {TableGridColumnTemplateContext} from '../../../../../components/metadata/types';
// import {RowSelector} from '../../../../rowSelector';

// /**
//  * Context for basic table column selectable template
//  */
// export class BasicTableColumnSelectableContext<TData = any> extends TableGridColumnTemplateContext<TData>
// {
//     //######################### public properties #########################

//     /**
//      * Gets indication whether column is selected
//      */
//     public get isSelected(): boolean
//     {
//         return this.rowSelector.isSelected(this.$implicit);
//     }

//     //######################### constructor #########################

//     /**
//      * Creates instance of BasicTableColumnContext
//      * @param $implicit - Data of current row
//      * @param column - Object of column metadata itself
//      * @param index - Index of rendered row in current page
//      * @param startingIndex - Starting index of currently displayed items
//      */
//     constructor(public override $implicit: TData,
//                 public override column: BasicGridColumn<TData>,
//                 public override index: number,
//                 public override startingIndex: number,
//                 public rowSelector: RowSelector<any, any, TData>)
//     {
//         super($implicit, column, index, startingIndex);
//     }
// }