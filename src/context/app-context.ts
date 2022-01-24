import {createContext} from "react";
import {AppStateType} from "../providers/app-provider";

export enum AppActionOperationType {
    SetError = 'set-error',
    LoggedUser = 'loggedUser',
    Default = 'default',
}

export type AppActionsType = {
    type: `${AppActionOperationType}`,
    payload: AppStateType | boolean
}

export type AppDispatchType = (action: AppActionsType) => void;
export type AppContextType = { appState: AppStateType, appDispatch: AppDispatchType };

export const AppContext = createContext<AppContextType | undefined>(undefined)