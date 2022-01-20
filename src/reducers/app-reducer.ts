import {AppActionOperationType, AppActionsType} from "../context/app-context";
import {AppStateType} from "../providers/app-provider";

export type AppReducerReturnType = {
    [key in `${AppActionOperationType}`]: () => any
}

export const appReducer = (state: AppStateType, action: AppActionsType): AppStateType => {

    const setError = (): AppStateType => {
        return {
            ...state,
            ...action.payload
        }
    }

    const appActions = {
        'set-error': setError,
        'default': () => state,
    } as AppReducerReturnType

    return (appActions[action.type] || appActions['default'])()
}