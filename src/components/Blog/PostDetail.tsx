import {PostType} from "./Posts";
import {useQuery, useMutation} from "react-query";

async function fetchComments(postId: number) {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
    );
    return response.json();
}
async function deletePost(postId: number) {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/postId/${postId}`,
        {method: "DELETE"}
    );
    return response.json();
}
async function updatePost(postId: number) {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/postId/${postId}`,
        // @ts-ignore
        {method: "PATCH", data: {title: "REACT QUERY FOREVER!!!!"}}
    );
    return response.json();
}
type CommentType = {
    body: string,
    email: string,
    id: number,
    name: string,
    postId: number,
}

export function PostDetail({post}: { post: PostType }) {
    const {
        data,
        isLoading,
        isError,
        error
    } = useQuery(
        ['comments', post.id],
        () => fetchComments(post.id),
        {
            staleTime: 5000,
        }
    )
    const deleteMutation = useMutation((postId: number) => deletePost(postId));
    //isFetching у мутаций нету
    const updateTitleMutation = useMutation((postId: number) => updatePost(postId))

    if (isError) {
        return <div>Some error is occurred <p>{(error as any).toString()}</p>
        </div>
    }
    return (
        <>
            <h3 style={{color: "blue"}}>{post.title}</h3>
            <button onClick={() => deleteMutation.mutate(post.id)}>Delete
            </button>

            {deleteMutation.isError &&
            <p style={{color: 'red'}}>Deleting post error</p>}
            {deleteMutation.isLoading &&
            <p style={{color: 'purple'}}>Loading deleting post...</p>}
            {deleteMutation.isSuccess &&
            <p style={{color: 'green'}}>Deleted was succeeded!</p>}

            <button onClick={() => updateTitleMutation.mutate(post.id)}>Update
                title
            </button>
            {updateTitleMutation.isLoading &&
            <p style={{color: 'purple'}}>Loading update post...</p>}
            {updateTitleMutation.isSuccess &&
            <p style={{color: 'green'}}>Update was succeeded!</p>}
            {updateTitleMutation.isError &&
            <p style={{color: 'red'}}>Update post error</p>}


            <p>{post.body}</p>
            <h4>Comments</h4>
            {
                isLoading
                    ? <div>Loading comments....</div>
                    : data.map((comment: CommentType) => (
                        <li key={comment.id}>
                            {comment.email}: {comment.body}
                        </li>
                    ))
            }
        </>
    );
}