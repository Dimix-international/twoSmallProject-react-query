import {ReactNode, useMemo, useReducer} from "react";
import {appReducer} from "../reducers/app-reducer";
import {AppContext} from "../context/app-context";

export type AppStateType = {
    error: string | null
    severity: 'error' | 'warning' | 'info' | 'success'
}

export const AppProvider = ({children}: { children: ReactNode }) => {
    const [appState, appDispatch] = useReducer(appReducer, {
        error: null,
        severity: 'error',
    });
    const value = useMemo(() => ({
        appState, appDispatch
    }), [appState])

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}