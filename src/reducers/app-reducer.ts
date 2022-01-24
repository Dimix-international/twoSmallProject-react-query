import {AppActionOperationType, AppActionsType} from "../context/app-context";
import {AppStateType} from "../providers/app-provider";

export type AppReducerReturnType = {
    [key in `${AppActionOperationType}`]: () => any
}

export const appReducer = (state: AppStateType, action: AppActionsType): AppStateType => {

    const setError = (): AppStateType => {
        return {
            ...state,
            ...action.payload as AppStateType
        }
    }
    const logUser = (): AppStateType =>{
        return {
            ...state,
            isLogged: action.payload as boolean
        }
    }

    const appActions = {
        'set-error': setError,
        'loggedUser':logUser,
        'default': () => state,
    } as AppReducerReturnType

    return (appActions[action.type] || appActions['default'])()
}