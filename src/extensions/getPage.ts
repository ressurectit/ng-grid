import {GridFunction} from "../components/grid";
import {Paging, PAGING} from "../plugins/paging";

/**
 * Gets current page of grid
 */
export function getPage(): GridFunction<number>
{
    return grid =>
    {
        let paging = grid.getPlugin<Paging>(PAGING);

        return paging.page;
    };
}