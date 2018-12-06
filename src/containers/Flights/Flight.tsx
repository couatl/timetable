import * as React from 'react';
import {connect} from 'react-redux';

import FlightHeader from "../../components/FlightHeader";
import FlightTable from "../../components/FlightTable";

import {getFlights, setFlights, setLoading} from "../../redux/actions/flights";

interface IState {
    type: string;
    pagination: any;
    search: string;
    delayed: boolean;
}

interface IProps {
    getFlights: (type: string, pagination?: any, data?: any[]) => any;
    setFlights: (data: any[]) => any;
    setLoading: (loading: boolean) => any;
    data: any[];
    loading: boolean;
}

class Flight extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);

        this.state = {
            delayed: false,
            pagination: 1,
            search: '',
            type: 'departure'
        };

        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleResetSearch = this.handleResetSearch.bind(this);
        this.handleLoadMore = this.handleLoadMore.bind(this);
    }

    public componentDidMount() {
        this.props.getFlights(this.state.type);
    }

    public handleTypeChange(type: string) {
        this.setState({
            ...this.state,
            type
        });
        this.props.getFlights(type);
    }

    public handleSearch(search: string) {
        if (search === this.state.search || search === '') {
            return;
        }

        this.setState({
            ...this.state,
            search
        });

        this.props.setFlights(this.props.data.filter((elem: any) => {
            return `${elem.company} ${elem.flight_number}`.toLowerCase().includes(search.toLowerCase());
        }));
    }

    public handleResetSearch() {
        this.setState({
            ...this.state,
            delayed: false,
            search: ''
        });

        this.props.getFlights(this.state.type);
    }

    public handleCheckboxChange(event: any) {
        if (event.target.checked) {
            this.setState({
                ...this.state,
                delayed: true
            });
            this.props.setFlights(this.props.data.filter((elem: any) => {
                return elem.delayed;
            }));
        } else {
            this.setState({
                ...this.state,
                delayed: false,
                search: ''
            });
            this.props.getFlights(this.state.type);
        }
    }

    public handleLoadMore() {
        const currentPagination = this.state.pagination;
        this.setState({
            ...this.state,
            pagination: currentPagination + 1
        });

        this.props.getFlights(this.state.type, currentPagination + 1, this.props.data);
    }

    public render(): JSX.Element {
        const {data, loading} = this.props;
        const {type, delayed, search} = this.state;
        const showLoadMore = search === '' && !delayed;

        return <div className="flight">
            <FlightHeader handleTypeChange={this.handleTypeChange} handleCheckboxChange={this.handleCheckboxChange}
                          handleSearch={this.handleSearch} handleResetSearch={this.handleResetSearch} type={type}/>
            <FlightTable data={data} loading={loading} handleLoadMore={this.handleLoadMore}
                         showLoadMore={showLoadMore}/>
        </div>;
    }
}

const mapStateToProps = (state: any) => {
    return {
        data: state.flight.data,
        loading: state.flight.loading
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        getFlights(type: string, pagination = 1, data = []) {
            dispatch(getFlights(type, pagination, data));
        },
        setFlights(data: any[]) {
            dispatch(setFlights(data));
        },
        setLoading(loading: boolean) {
            dispatch(setLoading(loading));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Flight);
