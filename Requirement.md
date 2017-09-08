# Story list

1. Default Root List View

  - css, html : bootstrap, router4
  - redux storage  Post, Comments
  - actions : post => add, update, vote, delete
              comment => add, update, vote, delete
  - reducer : posts (처음에는 하나만)
  - Form : calls newPost API and action addPost

2. Detail View

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

  - show comment
  - add comment
    reducer now have state of post and comment
  - vote : upvote, downvote
  - edit, delete, vote

  Detail 문제
    1. getDetail Fetch 후에는 state 에만 저장이 가능함
       state 를 써서 문제가 되는 것은 아닌 것 같음
    2. mapProps 를 통해서는 아직 props 가 설정되기 전에 render
    3. App 으로부터 prop 을 받는 경우에도 2번과 같은 문제 발생
       ==> post && post.title 로 출력
       object 를 만드는 경우 default 값을 설정할 수 있으면

  API.votePost 후
    this.props.votePost({id, newVoteScore})
    에서 두개의 reducer 에 모두 action 이 전달 된다.
    reducer.post POST_VOTE
    reducer.comment POST_VOTE // 이것은 무시됨

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

