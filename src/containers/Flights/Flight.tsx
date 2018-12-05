import * as React from 'react';

import FlightHeader from "../../components/FlightHeader";
import FlightTable from "../../components/FlightTable";

import {getFlights} from "../../redux/actions/flights";

interface IState {
    type: string;
    pagination: any;
}

interface IProps {
    type: string;
    pagination: any;
}

export default class Flight extends React.Component<any, IState> {
    constructor(props: any) {
        super(props);

        this.state = {
            pagination: {
                current: 0
            },
            type: 'departure'
        };
    }

    public render(): JSX.Element {
        return <div className="flight">
            <FlightHeader/>
            <FlightTable/>
        </div>;
    }
}

const mapStateToProps = (state: any) => {
    return {
        incident: state.flight.data
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        findIncident(id: string) {
            dispatch(getIncident(id));
        }
    };
};
