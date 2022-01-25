/* eslint-disable no-console */

import {render} from '@testing-library/react';
import {
    DefaultOptions,
    QueryClient,
    QueryClientProvider,
    setLogger,
} from 'react-query';

import {defaultQueryClientOptions} from "../hooks/react-query/queryClient";
import {ReactNode} from "react";
import {AppProvider} from "../../providers/app-provider";

// suppress errors written to console
setLogger({
    log: console.log,
    warn: console.warn,
    error: () => {
        // swallow the errors
    },
});

const defaultOptions: DefaultOptions = defaultQueryClientOptions;
if (defaultOptions && defaultOptions.queries)
    defaultOptions.queries.retry = false;

// make this a function for unique queryClient per test
const generateQueryClient = () => {
    return new QueryClient({defaultOptions});
};

export function renderWithQueryClient(
    ui: React.ReactElement,
    client?: QueryClient,
) {
    const queryClient = client ?? generateQueryClient();
    return render(
        <AppProvider>
            <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
        </AppProvider>,
    );
}
//FOR Testing custom HOOKS
// from https://tkdodo.eu/blog/testing-react-query#for-custom-hooks
export const createWrapper = () => {
    const queryClient = new QueryClient({
        defaultOptions: defaultQueryClientOptions,
    });
    return ({children}: { children: ReactNode }) => (
        <AppProvider>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </AppProvider>
    );
};