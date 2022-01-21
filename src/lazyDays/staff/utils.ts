import {Staff} from "../../shared/types";

export const filterByTreatment = (staff:Staff[], treatmentName:string):Staff[] =>{
        return staff.filter(person => person.treatmentNames
        .map(t => t.toLowerCase())
        .includes(treatmentName.toLowerCase())
    )
   /* return staff.filter((item) =>
            item.treatmentNames.find(item => item.toLowerCase() === treatmentName.toLowerCase()))*/
}