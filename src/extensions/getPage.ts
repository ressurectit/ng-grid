import {GridFunction} from "../components/grid";
import {Paging} from "../plugins/paging";
import {PAGING} from "../plugins/paging/types";

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