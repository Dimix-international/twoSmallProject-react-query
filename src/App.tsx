import React from 'react';
import './App.css';
import {QueryClient, QueryClientProvider} from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'
import {StartWars} from "./components/InfineSwapi/StartWars";


const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="App">
               <StartWars />
            </div>
            <ReactQueryDevtools/>
        </QueryClientProvider>
    );
}

export default App;
