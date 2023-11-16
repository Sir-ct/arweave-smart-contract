
export function handle(state, action){
    const input = action.input

    if(input.function == "createPost"){
        return createPost(state, action);
    }

    if(input.function == "updatePost"){
        return updatePost(state, action);
    }

    if(input.function == "readPost"){
        return readPost(state, action)
    }

    if(input.function == "allPosts"){
        return allPosts(state, action);
    }

    throw new ContractError(`You have to enter a valid function`)
}


function createPost(state, action){
    if(action.input.title == "" || typeof action.input.title !== "string"){
        throw new ContractError(`Enter valid post title`)
    }

    if(action.input.body == "" || typeof action.input.body !== "string"){
        throw new ContractError(`Enter valid post`)
    }

    state.posts.push({
        id: state.posts.length + 1,
        title: action.input.title,
        body: action.input.body,
        timestamp: Date.now()
    })

    return {state}
}

function updatePost(state, action){
    if(typeof action.input.id !== "string"){
        throw new ContractError(`id has to be a string`)
    }

    let post = state.posts.find((post)=> post.id == action.input.id)

    if(!post){
        throw new ContractError(`post with the provided id does not exist`)
    }

    if(action.input.title && action.input.title !== ""){
        post.title = action.input.title
    }

    if(action.input.body && action.input.body !== ""){
        post.body = action.input.body
    }

    return { state }
}

function readPost(state, action){
    let id = action.input.id
    if(!id){
        throw new ContractError(`provide valid id to the post you want to fetch`)
    }

    let post = state.posts.find((post)=> post.id == id)

    if(!post){
        throw new ContractError(`post with provided id does not exist`)
    }

    return { result: post }

}

function allPosts(state, action){
    let posts = state.posts

    return {result: posts}
}