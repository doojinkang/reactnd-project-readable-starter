# Readable SNS project

## Installation and Launching

- Download source code
  - `git clone git@github.com:doojinkang/reactnd-readable.git`
- Install packages:
  - `cd reactnd-readable; npm install`

- Launch server:
  - `node server`
  - Unless modified in `config.js` server will use port 3001

- Launch dev server:
  - `npm start`
  - Default dev server use port 3000

## Routes

1. /created : PostList Component
  / is redirected to /created
    - Navbar has
      - 'ALL' : All post list
      - Category Link 'react', 'redux', 'nanodegree', 'udacity'
    - Submit a Story
      - Link to '/write' view creating new Post
    - Ordering Buttons
      - Date : ascending descending
      - voteScore : ascending descending

2. /created/:category : PostList Component
    - same to default view, filtered with the selected category

3. /detail/:postid : Detail component
  Details
    - Details of a post, Title, Body, Author, time, vote score
    - control to edit or delete the post
    - edit is opened using React-bootstrap Modal

    - Comments (separated as Comment component)
      - list all the comments for that post, ordered by voteScore (highest first)
      - Ordering Buttons fo Comments (Date, voteScore)
      - control to add a new comment (Modal)
      - control to edit comment (Modal), and delete

4. /write : Form Compoenent
    - View for creating new Post
      - Form to create new post
      - Editing for existing data is opened in Post Detail View as Modal

## About the Author

  - Author : Kang Doojin (doojin.kang@gmail.com)
         Udacity nanodegree react program student
