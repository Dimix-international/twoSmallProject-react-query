import InfiniteScroll from 'react-infinite-scroller';
import React from "react";
import {useInfiniteQuery} from "react-query";

import {Person} from "./Person";

const initialUrl = "https://swapi.dev/api/people/";
const fetchUrl = async (url: string) => {
    const response = await fetch(url);
    return response.json();
};

type ResultsType = {
    "name": string,
    "classification": string,
    "designation": string,
    "average_height": string,
    "skin_color": string,
    "hair_color": string,
    "eye_color": string,
    "average_lifespan": string,
    "homeworld": string,
    "language": string,
    "people": string [],
    "films": string [],
    "created": string,
    "edited": string,
    "url": string,
}
export type PageDataType = {
    count: number,
    next: string,
    "previous": null | number,
    "results": ResultsType []
}
export const InfinitePeople = React.memo(() => {
        //fetchNextPage -управляет InfiniteQuery. Укажем InfiniteScroll какую
        // функцию запускать для получения новых данных
        const {
            data,
            fetchNextPage,
            hasNextPage,
            isLoading,
            isFetching,
            isError,
            error
        } = useInfiniteQuery(
            'sw-people',
            ({pageParam = initialUrl}) => fetchUrl(pageParam),
            //pageParam - определит есть ли следующая страница
            // установим значение по умолч для первого запроса,
            {
                getNextPageParam: (lastPage) => lastPage.next || undefined
                //NextPage будет использовать page которую мы установили  после
                // того как получили последнюю страницу или undefined ,если lastPage - false - hasNextPage - false
                //происходит сразу запрос за следующей страницей и вернем её или null,
            }
        );

        if (isLoading) return <div>Loading...</div>
        //если использовать isFetching то при загрузке новых данных нас будет возвращать вверх станицы с
        // и будут загружены новые данные , т.к. происходит перерисовка <div>Fetching...</div>  и после перерисовка с новыми данными

        if (isError) return <div>Error {(error as any).toString()} is
            occurred!</div>

        return (
            <>
                {isFetching && <div style={{
                    position: 'fixed',
                    right: '10px',
                    top: '5px'
                }}>Loading..</div>}
                <InfiniteScroll
                    // @ts-ignore
                    loadMore={fetchNextPage}
                    hasMore={hasNextPage}
                >
                    {
                        data?.pages.map((pageData: PageDataType) => (
                            pageData.results.map(person => (
                                <Person
                                    key={person.name}
                                    name={person.name}
                                    hairColor={person.hair_color}
                                    eyeColor={person.eye_color}
                                />
                            ))
                        ))
                    }
                </InfiniteScroll>
            </>
        );
    }
)