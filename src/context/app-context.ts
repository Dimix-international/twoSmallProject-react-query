import {createContext} from "react";
import {AppStateType} from "../providers/app-provider";

export enum AppActionOperationType {
    SetError = 'set-error',
    Default = 'default',
}

export type AppActionsType = {
    type: `${AppActionOperationType}`,
    payload: AppStateType
}

export type AppDispatchType = (action: AppActionsType) => void;
export type AppContextType = { appState: AppStateType, appDispatch: AppDispatchType };

export const AppContext = createContext<AppContextType | undefined>(undefined)