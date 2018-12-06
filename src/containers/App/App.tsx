import * as React from 'react';

import FlightLoader from '../../components/FlightLoader';
import Flight from "../Flights/Flight";

import './App.css';

interface IProps {
    loading?: boolean;
}

class App extends React.Component<IProps> {
    public render() {
        const loading = this.props.loading;

        return (
            <div className="App">
                <header className="App-header">
                    <div className="App-title">Табло Рейсов</div>
                </header>
                {loading && (
                    <FlightLoader/>
                )}
                {!loading && (
                    <p className="App-content">
                        <Flight/>
                    </p>
                )}
            </div>
        );
    }
}

export default App;
