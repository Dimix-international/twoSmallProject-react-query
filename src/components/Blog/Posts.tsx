import {useEffect, useState} from "react";
import {useQuery, useQueryClient} from "react-query";

import {PostDetail} from "./PostDetail";

const maxPostPage = 10;

async function fetchPosts(currentPage: number) {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${currentPage}`
    );
    return response.json();
}

export type PostType = {
    body: string
    id: number
    title: string
    userId: number
}

export function Posts() {
    const [currentPage, setCurrentPage] = useState(0);
    const [selectedPost, setSelectedPost] = useState<PostType | null>(null);

    const queryClient = useQueryClient();

    useEffect(() => {
        //пишем в useEffect т.к. useState асинхронный
        //убереме loading...  при нажатии на next кнопку
        //используем prefetching
        //по сути делаем запрос за следующей страницей
        if (currentPage < maxPostPage) {
            const nextPage = currentPage + 1;
            queryClient.prefetchQuery(
                ['posts', nextPage],
                () => fetchPosts(nextPage)
            )
        }
    }, [currentPage])

    const {data, isLoading, isError, error} = useQuery(
        //isFetching -  покажите идикатор загрузки, если функция вызвана независимо есть ли у нас закэшированные данные или нет 
        ['posts', currentPage],
        () => fetchPosts(currentPage),
        {
            // время(мс) на протяжении которого данные будут считаться актуальными (fresh),
            // время прошло - они не актуальны (stale)
            //по default: 0
            staleTime: 5000,
            //сохраним прошлые данные, если возвращаются назад, то данные есть в cache
            keepPreviousData: true,
        });

    const nextPage = () => {
        setCurrentPage(page => page + 1)
    }
    const previousPage = () => {
        setCurrentPage(page => page - 1)
    }

    if (isLoading) {
        //isFetching будет показывать Loading независимо есть ли у нас закэшированные данные или нет
        return <div>Loading ...</div>
    }
    if (isError) {
        return <div>Some error is occurred <p>{(error as any).toString()}</p>
        </div>
    }
    return (
        <>
            <ul>
                {data.map((post: PostType) => (
                    <li
                        key={post.id}
                        className="post-title"
                        onClick={() => setSelectedPost(post)}
                    >
                        {post.title}
                    </li>
                ))}
            </ul>
            <div className="pages">
                <button disabled={currentPage === 0} onClick={previousPage}>
                    Previous page
                </button>
                <span>Page {currentPage + 1}</span>
                <button
                    disabled={currentPage >= maxPostPage}
                    onClick={nextPage}>
                    Next page
                </button>
            </div>
            <hr/>
            {selectedPost && <PostDetail post={selectedPost}/>}
        </>
    );
}