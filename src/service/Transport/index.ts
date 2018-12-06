// import * as fetch from 'isomorphic-fetch';

import {BACK_URL} from './constants';

class Transport {
    private static instance: any;
    private headers: any;
    private baseUrl: string;

    constructor() {
        if (Transport.instance) {
            return Transport.instance;
        }

        this.headers = {};
        this.baseUrl = BACK_URL;

        Transport.instance = this;

        this.setUpHeaders();
    }

    get BaseUrl(): string {
        return this.baseUrl;
    }

    set BaseUrl(url: string) {
        this.baseUrl = url;
    }

    public get(uri: string, timeout: number = 20000): any {
        return this.sender(uri, 'GET', timeout);
    }

    public post(uri: string, data: any = {}, timeout: number = 20000): any {
        return this.sender(uri, 'POST', timeout, JSON.stringify(data));
    }

    public put(uri: string, data: any = {}, timeout: number = 20000): any {
        return this.sender(uri, 'PUT', timeout, JSON.stringify(data));
    }

    public delete(uri: string, data: any = {}, timeout: number = 20000): any {
        return this.sender(uri, 'DELETE', timeout, JSON.stringify(data));
    }

    public head(uri: string, timeout: number = 20000): any {
        return this.sender(uri, 'HEAD', timeout);
    }

    private async sender(
        uri: string,
        type: string,
        timeout: number,
        data?: string
    ): Promise<any> {
        const options = {
            body: data,
            method: type,
            mode: 'no-cors',
            timeout
        };

        return await fetch(this.baseUrl + uri, this.setRequest(options));
    }

    private setRequest(options?: any): any {
        return {
            body: options.body,
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            method: options.method,
            timeout: options.timeout
        };

    }

    private setUpHeaders() {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
    }
}

const transport = new Transport();
transport.BaseUrl = BACK_URL;

export default transport;
