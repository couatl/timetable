import * as constants from '../constants';

const initialState: any = {
    data: {},
    loading: false
};

export function flight(state: any = initialState, action: any = {}): any {
    switch (action.type) {
        case constants.LOADING_SET:
            return {
                loading: action.loading
            };
        case constants.FLIGHTS_SET:
            return {
                data: action.flights
            };
        default:
            return state;
    }
}
