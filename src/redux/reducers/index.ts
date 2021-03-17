import {combineReducers} from 'redux'
import {villagersReducer} from './villagers'

export const rootReducer = combineReducers({
    villagers: villagersReducer
})

export type RootState = ReturnType<typeof rootReducer>