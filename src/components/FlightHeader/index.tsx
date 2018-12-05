import * as React from 'react';

import {Checkbox} from 'antd';
import {Input} from 'antd';

import './FlightHeader.css';

const Search = Input.Search;

export default class FlightHeader extends React.Component {
    constructor(props: any) {
        super(props);
    }

    public onCheckboxChange() {
        // tslint:disable-next-line
        console.log('hi');
    }

    public onSearch() {
        // tslint:disable-next-line
        console.log('hi');
    }

    public render(): JSX.Element {
        return <div className="flight-header">
            <div className="flight-header__type">
                <div className="flight-header__type-item active">
                    Вылет
                </div>
                <div className="flight-header__type-item">
                    Прилет
                </div>
            </div>
            <div className="flight-header__filters">
                <Search
                    placeholder="Поиск по номеру рейса"
                    onSearch={this.onSearch}
                    style={{ fontSize: '1em', color: '#141251' }}
                    size="large"
                />
                <Checkbox
                    onChange={this.onCheckboxChange}
                    style={{color: '#141251', fontSize: '0.9em',
                        margin: 'auto', width: '20em'}}
                >
                    Только задержанные
                </Checkbox>
            </div>
        </div>;
    }
}
