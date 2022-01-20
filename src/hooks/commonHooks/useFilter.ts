import {Staff} from "../../shared/types";

type FilterType = {
    items: Staff []
    filterProp: string
}
export const useFilter = (props:FilterType) =>{

    const {items, filterProp} = props;

    const availableItems = filterProp === 'all' ? [...items]
        :  items.filter((item) =>
            item.treatmentNames.find(item => item.toLowerCase() === filterProp.toLowerCase()));

    return {
        availableItems,
    }
}