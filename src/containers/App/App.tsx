import * as React from 'react';

import Flight from "../Flights/Flight";

import './App.css';


class App extends React.Component {
    public render() {
        return (
            <div className="App">
                <header className="App-header">
                    <div className="App-title">Табло Рейсов</div>
                </header>
                <p className="App-content">
                    <Flight/>
                </p>
            </div>
        );
    }
}

export default App;
