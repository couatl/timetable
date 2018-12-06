import {notification} from 'antd';
import * as moment from 'moment';

import * as constants from '../constants';

import transport from '../../service/Transport';

export function setLoading(loading: any): any {
    return {
        loading,
        type: constants.LOADING_SET
    };
}

export function setFlights(data: any): any {
    return {
        data,
        type: constants.FLIGHTS_SET
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

    return data;
}

export function getFlights(type: string, pagination = 1, data?: any): any {
    return async (dispatch: any) => {
        let notificationInfo: any = {};

        dispatch(setLoading(true));

        const response: Response = await transport.get(`?direction=${type}&
        dateStart=${encodeURIComponent(moment().startOf('day').format("YYYY-MM-DDTHH:mm:ssZ"))}&
        dateEnd=${encodeURIComponent(moment().endOf('day').format("YYYY-MM-DDTHH:mm:ssZ"))}&
        perPage=30&page=${pagination}&locale=ru`);
        if (response.ok) {
            const json = await response.json();

            const flights = filterFlights(json, type);
            if (pagination !== 0) {
                dispatch(setFlights(data.concat(flights)));
            } else {
                dispatch(setFlights(flights));
            }
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