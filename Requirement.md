# Q list

1. Action and reducer
  Every actions passed to all the reducers in combine.
  Is there a way avoid this behaviour?

2. Display props that is not set yet
  Detail gets props of post info by App <Route path>
  This props may not be set when Detail page opened
  because Posts are from the server asynchronously.
  {post.title} causes error, so I coded { post && post.title }
  Is there a way avoid expression { post && post.title } ?

3. Store Design
  The component which access store as props or dispatcher
  Each component can access store by itself.

  - App     : post    : addPost
  - Detail  :         : votePost, deletePost
  - Form    :         : addPost
  - Comment : comment : addComment, voteComment, deletePost

  Another design will be App has all,
  and pass necessary things to sub components.
  If the sub component has no other state, it can be const.

  Which is better design?

4. () => this.openModal() vs this.openModal

  openModal = (comment) => {
    // comment is undefined if create new comment
    // comment is valid object if edit exist comment
  }

  [1] <button onClick={this.openModal}>Create Comment</button>
  This doesn't work because comment is Proxy object (event)

  [2] <button onClick={() => this.openModal()}>Create Comment</button>
  This works : comment is undefined in openModal.

  I don't clearly undestand the difference.


Solved

1. Delete set flag deleted
   As for the actual delet from state object
   Object spread
      ==> Object spread 같은 것으로 해결하고 싶음...  (질문)
  https://stackoverflow.com/questions/36553129/what-is-the-shortest-way-to-modify-immutable-objects-using-spread-and-destructur


# Story list

1. Default Root List View

  - css, html : bootstrap, router4
  - redux storage  Post, Comments
  - actions : post => add, update, vote, delete
              comment => add, update, vote, delete
  - reducer : posts (처음에는 하나만)

2. Create View
  - Form : calls newPost API and action addPost

3. Detail View

  - src/routes/Detail.js
  - Data from store, id from props.match.params
    --> Detail View 에서 페이지를 리프레시하는 경우 문제 발생
        이유는 App.js 에서 데이터를 아직 가져오지 않았음
        해결책
        1. fetch getDetail in detail view :
          이 경우도 같은 문제를 발생시킴
          이렇게 하면 App.js 부터 시작하지 않나?
        2. 가짜 데이터를 먼저 만들어 놓고,
          fetch 후 업데이트 하도록 하면 된다.

  - show comment ............. ok
  - add comment  ............. ok
      reducer now have state of post and comment
  - vote ..................... ok
      upvote, downvote

      API.votePost 후
        this.props.votePost({id, newVoteScore})
        에서 두개의 reducer 에 모두 action 이 전달 된다. (질문)
        reducer.post POST_VOTE
        reducer.comment POST_VOTE // 이것은 무시됨

  Detail 문제
    1. getDetail Fetch 후에는 state 에만 저장이 가능함
       state 를 써서 문제가 되는 것은 아닌 것 같음
    2. mapProps 를 통해서는 아직 props 가 설정되기 전에 render
    3. App 으로부터 prop 을 받는 경우에도 2번과 같은 문제 발생
       ==> post && post.title 로 출력
       object 를 만드는 경우 default 값을 설정할 수 있으면
       state 에 디폴트 값을 '' 으로 설정할 수도 있다. (질문)


4. Edit View (by Create View)
      handling state is same in edit or create view   (질문)
      get data from server and update state

      modal (both post and comment)

      Form 에서 ...serializeform(e.target, { hash: true }) 사용하는 경우,
        blank 데이터는 object 에 포함되지 않음

      Post Form 과 Comment Form 이 다른 것
        const value = {
          id: base64.encode(uuid.v4()),
          timestamp: Date.now(),
          ...this.state.post or comment
        }

      Post Form Edit : this.state.post 에 값이 들어감
                      id, timestamp 는 이 값으로 overwrite 됨
      Post Form New  : this.state.post 에 값이 들어가지 않음
                      id, timestamp 는 설정하지 않음
      Comment Form Edit : this.state.comment 값이 들어감
                          id, timestamp 는 이 값으로 overwrite 됨
      Comment Form New  : this.state.comment is null
                          id, timestamp 는 this.state.comment 는 없고
                          parentId 는 설정


5. delete (both post and comment)
      implement set flag deleted true
      without delete property of state object
      ==> Object spread 같은 것으로 해결하고 싶음...  (질문)

  - sort
      Post - created : newer first
           - hot : # of comments
           - trending : higher votescore first
      Comment - created : newer first
              - trending : higher votescore first

  - Form 은 Detail 에서 new/edit 할 수 있도록 하자
    route 에서는 처리할 수 있도록
    스팀잇은 new 는 전체 페이지, edit 은 detail (url 은 detail 과 동일)

  - category 추가 시 적용 확인 ok
    /write 에서 category 가 default 로 선택되지 않음
      ==> history 를 통해서 가능할 것 같은데...


Store, dispatch 를 props 로 사용하는 컴포넌트

  App     : post    : addPost
  Detail  :         : votePost, deletePost
  Form    :         : addPost
  Comment : comment : addComment, voteComment, deletePost

  editPost 는  addPost 를 그대로 사용할 수 있다.
  state object spreading 를 사용하므로 add 와 edit 차이 없음

  App 에서 모두 설정한 후 props 로 전달 하는 것이 맞는가? (질문)
  이렇게 하면 routes 의 component 는 모두 const 로 할 수 있을 것 같음

Refactoring Point

  - Proper owner of store, dispatch
  - const component
  - action 에서 postAdd, commentAdd 의 파라미터를 post, comment 로
  - Form, Comment 에서 form data 를 받기 위한 state 관련 코드

App    --> Form (new)  : category
Detail --> Form (edit) : category, post, closeForm

# Data

1 Categories

  - Array in caregories.js (fixed number)

2 Posts

  |name|type |    |
  |----|:---:|---|
  |id        |String	|Unique identifier|
  |timestamp	|Integer	|Time created - default data tracks this in Unix time. use Date.now()|
  |title	    |String	|Post title|
  |body	    |String	|Post body|
  |author	  |String	|Post author|
  |category	|String	|Should be one of the categories provided by the server|
  |voteScore	|Integer	|Net votes the post has received (default: 1)|
  |deleted	  |Boolean	|Flag if post has been 'deleted' (inaccessible by the FE),(default: false)|

3 Comments

  |name|type |    |
  |----|:---:|---|
  |id	      |String|	Unique identifier|
  |parentId	|String|	id of the parent post|
  |timestamp	|Integer|	Time created - default data tracks this in Unix time. use Date.now()|
  |body	    |String|	Comment body|
  |author	  |String|	Comment author|
  |voteScore	|Integer|	Net votes the post has received (default: 1)|
  |deleted	  |Boolean|	Flag if comment has been 'deleted' (inaccessible by the FE), (default: F)|
  |parentDeleted	|Boolean|	Flag for when the the parent post was deleted, but the comment itself was not.|

- Anonymous, with no auth.
- No user objects, auth
- server light zero data validation

# Views

1. Default(Root)
  list all available categories => link to category view
  list all the posts ordered by voteScore (highest first)
  have a control for changing the sort method for the list
      Order by voteScore, order by timestamp, and more
  control for add a new post (button)

2. Category view
  same to default view, filtered with the selected category

3. Post detail view
  details of a post, Title, Body, Author, timestamp(user readable format), vote score
  list all the comments for that post, ordered by voteScore (highest first)
  control for reordering comments by score or timestamp
  control to edit or delete the post
  control to add a new comment
  implement comment form (inline, modal or etc)
  comments has control for edit or delete

4. Create/Edit View
  form to create new post or edit existing posts
  editing, existing data be shown in the form

- Post/Comment display current score and control to increase or decrease the voteScore
- Post display the number of comments for tha post.
