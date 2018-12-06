import * as React from 'react';

import {Checkbox, Icon, Input} from 'antd';

import './FlightHeader.css';

// const Search = Input.Search;

interface IProps {
    handleTypeChange: (type: string) => void;
    handleCheckboxChange: any;
    handleSearch: any;
    handleResetSearch: any;
    type: string;
}

interface IState {
    search: string;
}

export default class FlightHeader extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);

        this.state = {
            search: ''
        };

        this.onDepartureClick = this.onDepartureClick.bind(this);
        this.onArrivalClick = this.onArrivalClick.bind(this);
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.onResetSearch = this.onResetSearch.bind(this);
        this.onSearch = this.onSearch.bind(this);
    }

    public onDepartureClick() {
        if (this.props.type === 'departure') {
            return;
        }

        this.props.handleTypeChange('departure');
    }

    public onArrivalClick() {
        if (this.props.type === 'arrival') {
            return;
        }

        this.props.handleTypeChange('arrival');
    }

    public onChangeSearch(event: any) {
        this.setState({ search: event.target.value });

        if (event.target.value === '') {
            this.onResetSearch();
        }
    }

    public onResetSearch() {
        this.props.handleResetSearch();
        this.setState({ search: '' });
    }

    public onSearch() {
        this.props.handleSearch(this.state.search);
    }

    public render(): JSX.Element {
        const { search } = this.state;
        const suffix = search ? <Icon type="close-circle" style={{cursor: 'pointer'}} onClick={this.onResetSearch} /> : null;

        const departureClass = `flight-header__type-item ${this.props.type === 'departure' ? 'active' : ''}`;
        const arrivalClass = `flight-header__type-item ${this.props.type === 'arrival' ? 'active' : ''}`;

        return <div className="flight-header">
            <div className="flight-header__type">
                <div className={departureClass} onClick={this.onDepartureClick}>
                    Вылет
                </div>
                <div className={arrivalClass} onClick={this.onArrivalClick}>
                    Прилет
                </div>
            </div>
            <div className="flight-header__filters">
                <Input
                    placeholder="Поиск по номеру рейса"
                    // placeholder="Поиск по номеру рейса, городу и авиакомпании"
                    prefix={<Icon type="search" style={{cursor: 'pointer', marginLeft: '-3px'}} onClick={this.onSearch}/>}
                    suffix={suffix}
                    value={search}
                    onChange={this.onChangeSearch}
                    style={{fontSize: '1em', color: '#141251', marginRight: '1em'}}
                    size="large"
                    onPressEnter={this.onSearch}
                />
                <Checkbox
                    onChange={this.props.handleCheckboxChange}
                    style={{
                        color: '#141251', fontSize: '0.9em',
                        margin: 'auto', width: '20em'
                    }}
                >
                    Только задержанные
                </Checkbox>
            </div>
        </div>;
    }
}
