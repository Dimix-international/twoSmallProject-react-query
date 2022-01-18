import React from 'react';
import './App.css';
import {QueryClientProvider} from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'
import {queryClient} from "./hooks/react-query/queryClient";
import {LazyDays} from "./lazyDays/LazyDays";
import {BrowserRouter} from "react-router-dom";


function App() {
    return (
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <div className="App">
                    <LazyDays/>
                </div>
                <ReactQueryDevtools/>
            </QueryClientProvider>
        </BrowserRouter>
    );
}

export default App;
