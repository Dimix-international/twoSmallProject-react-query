import React from "react";
import {usePrefetchTreatments} from "../hooks/react-query/useTreatments";

export const Home = React.memo(props => {
    usePrefetchTreatments(); //запрашиваем treatments когда мы на странице home

    return (
        <div>Home</div>
    )
})