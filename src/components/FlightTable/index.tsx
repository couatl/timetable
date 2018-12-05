import * as React from 'react';

import { List } from 'antd';

import './FlightTable.css';

// import FlightLoader from "../FlightLoader";

const data = [
    {
        city: 'Москва',
        flightNumber: 'D2 154',
        time: '22'
    },
    {
        city: 'Moscow',
        flightNumber: 'D2 154',
        time: '22'
    }
];

interface IState {
    loading: boolean;
}

export default class FlightTable extends React.Component<any, IState> {
    constructor(props: any) {
        super(props);

        this.state = {
            loading: true
        };
    }

    public renderItem(item: any) {
        return <List.Item>
            <div className="flight-table__item">{item.time}</div>
            <div className="flight-table__item">{item.city}</div>
            <div className="flight-table__item">{item.flightNumber}</div>
        </List.Item>
    }

    public render(): JSX.Element {
        return <div className="flight-table">
            {/*<FlightLoader/>*/}
            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={this.renderItem}
            />,
        </div>;
    }
}
