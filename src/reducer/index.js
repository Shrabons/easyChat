import { combineReducers } from 'redux'
import * as activetype from '../action/type'

const defaultdataSet = {
    userId : null,
    userName : null,
    picture: null
}

const selectUser = (currentStata = defaultdataSet, action) => {
    switch(action.type){
        case activetype.ACTIVE_USER:
            return {
                userId: action.payload.userid,
                userName: action.payload.username,
                picture: action.payload.userpic
            }
        default:
            return currentStata
    }
}

const rootReducer = combineReducers({
    activeManSelect : selectUser
})

export default rootReducer