// /**
//  * Serialize ordering
//  * @param ordering - Ordering to be serialized
//  */
// export function serializeSimpleOrdering(ordering: SimpleOrdering): string
// {
//     if(!ordering)
//     {
//         return null;
//     }

//     return encodeURIComponent(`${ordering.orderBy},${ordering.orderByDirection}`);
// }

// /**
//  * Deserialize ordering
//  * @param ordering - Ordering as string to be deserialized
//  */
// export function deserializeSimpleOrdering(ordering: string): SimpleOrdering
// {
//     if(!ordering)
//     {
//         return null;
//     }

//     const [orderBy, orderByDirection] = decodeURIComponent(ordering).split(',');

//     return {
//         orderBy: orderBy,
//         orderByDirection: +orderByDirection
//     };
// }