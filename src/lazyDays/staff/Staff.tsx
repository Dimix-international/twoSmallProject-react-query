import {Staff as StaffType} from "../../shared/types";
import React, {ReactElement} from "react";
import Typography from "@mui/material/Typography";
import {CardComponent} from "../common/CardComponent";

type StaffPropsType = {
    staffData: StaffType
}

export const Staff: React.FC<StaffPropsType> = React.memo((props): ReactElement => {
    const {staffData} = props;

    const cardContents = <Typography align={'center'} variant={'body1'} component={'span'}>
        {staffData.treatmentNames.join(', ')}
    </Typography>

    return (
        <CardComponent
            itemName={staffData.name}
            image={staffData.image}
            cardContents={cardContents}
            trigger={'staff'}
        />
    )
})