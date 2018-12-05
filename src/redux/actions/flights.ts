import * as constants from '../constants';

import transport from '../../service/Transport';

export function setLoading(loading: any): any {
    return {
        type: constants.LOADING_SET,
        // tslint:disable-next-line
        loading
    };
}

export function getFlights(): any {
    return async (dispatch: any) => {
        dispatch(setLoading(true));
        const response: Response = await transport.get('?direction=departure&dateStart=2018-12-04T16:00:00%2B03:00&dateEnd=2018-12-04T18:00:00%2B03:00&perPage=9999&page=0&locale=ru');
        if (response.ok) {
            const json = await response.json();
            // tslint:disable-next-line
            console.log(json);
            // dispatch(setIncident(filterIncident(json)));
        }
        dispatch(setLoading(false));
    };
}