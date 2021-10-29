
const count = $__(".count")
const lists = $__(".lists");
const usersTemp = $_("#users-list-template");
const postsTemp = $_("#posts-list-template");
const commentsTemp = $_("#comments-list-template")


let getUsersList = user => {
    let userList = usersTemp.content.cloneNode(true);
    userInfo = $__(".userData", userList);
    $_(".user_name", userList).dataset.id = user.id;
    userInfo[0].textContent =  user.name + "-" + user.username;
    userInfo[1].textContent = user.id;
    userInfo[2].textContent = user.email;
    userInfo[3].textContent = user.address['city'];
    userInfo[4].textContent = user.company['name'];
    userInfo[5].textContent = user.website;
    return userList;
}

let getPostsList = post => {
    let postList = postsTemp.content.cloneNode(true);
    postInfo = $__(".postData", postList);
    $_(".post_title", postList).dataset.id = post.id;
    postInfo[0].textContent = post.title;
    postInfo[1].textContent = post.userId;
    postInfo[2].textContent = post.body;
    return postList;
}

let getCommentsList = comment => {
    let commentList = commentsTemp.content.cloneNode(true);
    commentInfo = $__(".commentData", commentList);
    commentInfo[0].textContent = comment.name;
    commentInfo[1].textContent = comment.postId
    commentInfo[2].textContent = comment.email;
    commentInfo[3].textContent = comment.body;
    return commentList;
}
  
const render = array => {
    count[0].textContent = 'Count of users: ' + array.length;
    array.forEach(element => {
        lists[0].appendChild(getUsersList(element));
    });
}

;(async () => {
    const data = await fetch("https://jsonplaceholder.typicode.com/users")
    const getData = await data.json()
    render(getData);
})()

lists[0].addEventListener('click', async (evt) => {
    if(evt.target.matches(".user_name")){
        userId = evt.target.dataset.id;
        const postData = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        const getPostData = await postData.json()
        count[1].textContent = 'Count of posts: ' + getPostData.length;
        lists[1].textContent = "";
        getPostData.map(item => {
            lists[1].appendChild(getPostsList(item));
        })
        
    }
})

lists[1].addEventListener("click", async (evt) => {
    if (evt.target.matches(".post_title")) {
        postId = evt.target.dataset.id;
        const commentData =  await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
        const getCommentData = await commentData.json()
        count[2].textContent = "Count of comments: " + getCommentData.length;
        lists[2].textContent = ""
        getCommentData.map(item => {
            lists[2].appendChild(getCommentsList(item))
        })
    }
})