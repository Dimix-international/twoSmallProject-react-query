import React, {ReactNode} from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea} from '@mui/material';
import {Image} from "../../shared/types";
import Stack from "@mui/material/Stack";

import Massage from '../../images/massage.jpg';
import Facial from '../../images/facial.jpg';
import Scrub from '../../images/scrub.jpg';

type CardPropsType = {
    itemName: string;
    image: Image;
    cardContents: ReactNode
}

export const CardComponent: React.FC<CardPropsType> = React.memo((props) => {
    const {image, cardContents, itemName} = props;

    const finallyImage = ():string => {
        switch (image.fileName) {
            case 'massage.jpg': return Massage
            case 'facial.jpg': return Facial
            case 'scrub.jpg':return Scrub
            default: return Massage
        }
    }

    return (
        <Card sx={{maxWidth: '345px'}}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="230"
                    image={`${finallyImage()}`}
                    alt="green iguana"
                    sx={{
                        maxWidth: '100%'
                    }}
                />
                <CardContent>
                    <Stack>
                        <Typography gutterBottom variant={'h5'} align={'center'}
                                    component="div">
                            {itemName}
                        </Typography>
                        {cardContents}
                    </Stack>
                </CardContent>
            </CardActionArea>
        </Card>
    )
})