import {notification} from 'antd';
import * as moment from 'moment';

import * as constants from '../constants';

import transport from '../../service/Transport';

export function setLoading(loading: any): any {
    return {
        type: constants.LOADING_SET,
        // tslint:disable-next-line
        loading
    };
}

export function setFlights(data: any): any {
    return {
        type: constants.FLIGHTS_SET,
        // tslint:disable-next-line
        data
    };
}

function filterFlights(data: any, type: string) {
    data = data.items.reduce((items: any[], item: any) => {
        const newItem = {
            company: [item.co.code],
            delayed: false,
            flight_number: [item.flt],
            status: item.vip_status,
            terminal: item.term,
            time: item.t_st,
            time_estimated: item.t_et,
            time_real: type === 'departure' ? item.t_otpr : item.t_at,
            town: type === 'departure' ? item.mar2.city : item.mar1.city,
            town_id: type === 'departure' ? item.mar2.id : item.mar1.id,
        };

        newItem.delayed = moment(newItem.time_estimated).diff(moment(newItem.time), 'minutes') > 10;

        const i = items.findIndex((element: any) => {
            return !!(element.time === newItem.time && element.town_id === newItem.town_id);
        });

        if (i !== -1) {
            items[i].flight_number.push(item.flt);
            items[i].company.push(item.co.code);
        } else {
            items.push(newItem);
        }

        return items;
    }, []);

    // tslint:disable-next-line
    console.log(data);

    return data;
}

export function getFlights(type: string): any {
    return async (dispatch: any) => {
        let notificationInfo: any = {};

        dispatch(setLoading(true));
        // const response: Response = await transport.get('?direction=departure&dateStart=2018-12-04T16:00:00%2B03:00&dateEnd=2018-12-04T18:00:00%2B03:00&perPage=9999&page=0&locale=ru');
        const response: Response = await transport.get(`?direction=${type}&
        dateStart=${encodeURIComponent(moment().startOf('day').format("YYYY-MM-DDTHH:mm:ssZ"))}&
        dateEnd=${encodeURIComponent(moment().endOf('day').format("YYYY-MM-DDTHH:mm:ssZ"))}&
        perPage=20&page=0&locale=ru`);
        if (response.ok) {
            const json = await response.json();
            // tslint:disable-next-line
            console.log(json);

            const flights = filterFlights(json, type);
            dispatch(setFlights(flights));
        } else {
            notificationInfo = {
                duration: 3,
                message: 'Что-то пошло не так',
                request: 'end',
                type: 'error'
            };
            notification[notificationInfo.type]({...notificationInfo});
        }
        dispatch(setLoading(false));
    };
}