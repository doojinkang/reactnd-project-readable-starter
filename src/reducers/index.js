import { combineReducers } from 'redux'

import post from './postReducer'
import comment from './commentReducer'

export default combineReducers({ post, comment })
