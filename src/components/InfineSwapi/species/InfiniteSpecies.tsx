import InfiniteScroll from "react-infinite-scroller";
import React from "react";
import {useInfiniteQuery} from "react-query";
import {PageDataType} from "../people/InfinitePeople";
import {Species} from "./Species";


const initialUrl = "https://swapi.dev/api/species/";
const fetchUrl = async (url: string) => {
    const response = await fetch(url);
    return response.json();
};

export const InfiniteSpecies = () => {

    const {
        data,
        isFetching,
        isError,
        error,
        isLoading,
        hasNextPage,
        fetchNextPage
    } = useInfiniteQuery(
        'sw-species',
        ({pageParam = initialUrl}) => fetchUrl(pageParam),
        {
            getNextPageParam: (lastPage) => lastPage.next || undefined
        }
    )
    console.log(data)

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error {(error as any).toString()} is
        occurred!</div>

    return (
        <>
            {
                isFetching && <div style={{
                    position: 'fixed',
                    right: '10px',
                    top: '5px'
                }}>Loading...</div>
            }
            <InfiniteScroll
                // @ts-ignore
                loadMore={fetchNextPage}
                hasMore={hasNextPage}
            >
                {
                    data?.pages.map((page: PageDataType) => (
                        page.results.map(species => (
                            <Species
                                key={species.name}
                                name={species.name}
                                language={species.language}
                                averageLifespan={species.average_lifespan}
                            />
                        ))
                    ))
                }
            </InfiniteScroll>
        </>
    );
}