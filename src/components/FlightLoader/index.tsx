import * as React from 'react';

import './FlightLoader.css';

export default class FlightLoader extends React.Component {
    constructor(props: any) {
        super(props);
    }

    public render(): JSX.Element {
        return <div className="loader-wrapper">
            <div className="loader">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 113.5 104">
                    <path
                        d="M97.7 41.5c16.3 0 16.3 21-.2 21H66.7l-26 38H29.2l14.1-38h-23l-7.8 10h-9L8.2 52 3.5 31.5h9l7.8 10h23.1l-14.1-38h11.4l26 38h31z"
                        fill="none" stroke-linecap="round" stroke-linejoin="round"
                        stroke-miterlimit="10" stroke="#1b60db" stroke-width="4"/>
                </svg>
            </div>
        </div>;
    }
}
