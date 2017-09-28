import { combineReducers } from 'redux'

import post from './postReducer'
import comment from './commentReducer'
import category from './categoryReducer'

export default combineReducers({ post, comment, category })
