import React from 'react';
import './App.css';
import {QueryClientProvider} from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'
import {queryClient} from "./hooks/react-query/queryClient";
import {LazyDays} from "./lazyDays/LazyDays";
import {BrowserRouter} from "react-router-dom";
import {AppProvider} from "./providers/app-provider";


function App() {
    return (
        <BrowserRouter>
            <AppProvider>
                <QueryClientProvider client={queryClient}>
                    <div className="App">
                        <LazyDays/>
                    </div>
                    <ReactQueryDevtools/>
                </QueryClientProvider>
            </AppProvider>
        </BrowserRouter>
    );
}

export default App;
