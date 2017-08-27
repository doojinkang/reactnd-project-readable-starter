# Story list

1. Default Root List View
   css, html
   redux storage

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

