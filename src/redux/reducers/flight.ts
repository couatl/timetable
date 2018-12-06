import * as constants from '../constants';

const initialState: any = {
    data: [],
    loading: false
};

export function flight(state: any = initialState, action: any = {}): any {
    switch (action.type) {
        case constants.LOADING_SET:
            return {
                ...state,
                loading: action.loading
            };
        case constants.FLIGHTS_SET:
            return {
                ...state,
                data: action.data
            };
        default:
            return state;
    }
}
