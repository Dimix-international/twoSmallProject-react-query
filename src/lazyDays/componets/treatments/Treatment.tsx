import React, {ReactElement} from "react";
import type {Treatment as TreatmentType} from '../../../shared/types'
import Typography from "@mui/material/Typography";
import {CardComponent} from "../../common/CardComponent";

type TreatmentPropsType = {
    treatmentData: TreatmentType
}

export const Treatment: React.FC<TreatmentPropsType> = React.memo((props): ReactElement => {
    const {treatmentData} = props;
    const cardContents = <Typography align={'center'} variant={'body1'}>{treatmentData.description}</Typography>

    return (
        <CardComponent
            itemName={treatmentData.name}
            image={treatmentData.image}
            cardContents={cardContents}
        />
    )
})