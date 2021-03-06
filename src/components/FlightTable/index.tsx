import * as React from 'react';

import * as moment from 'moment';

import {Button, Col, List, Row, Spin} from 'antd';

import './FlightTable.css';

import FlightLoader from "../FlightLoader";

interface IProps {
    loading: boolean;
    data: any[];
    showLoadMore: boolean;
    handleLoadMore: any;
}

class FlightTable extends React.Component<IProps> {
    constructor(props: any) {
        super(props);
    }

    public renderItem(item: any) {
        return <List.Item style={{padding: '2em 2em 2em 0'}}>
            <Row style={{width: '100%'}}>
                <Col span={2}>
                    {!item.delayed &&
                    <div className="flight-table__item">{moment(item.time).format("HH:mm")}</div>
                    }
                    {item.delayed &&
                    <React.Fragment>
                        <div className="flight-table__item">
                            <del>{moment(item.time).format("HH:mm")}</del>
                        </div>
                        <div className="flight-table__item">{item.time_real ? moment(item.time_real).format("HH:mm") :
                            moment(item.time_estimated).format("HH:mm")}</div>
                    </React.Fragment>}
                </Col>
                <Col span={11}>
                    <div className="flight-table__item"
                         style={{fontWeight: 'bold', fontSize: '1.8em'}}>{item.town}</div>
                </Col>
                <Col span={4}>
                    {item.flight_number.map((elem: any, index: any) =>
                        <div key={index} className="flight-table__item">{item.company[index] + ' '}<b>{elem}</b>
                        </div>
                    )}
                </Col>
                <Col span={1}>
                    <div className="flight-table__item">{item.terminal}</div>
                </Col>
                <Col span={6}>
                    <div className="flight-table__item">{item.status}</div>
                </Col>
            </Row>
        </List.Item>
    }

    public render(): JSX.Element {
        const loader = <FlightLoader/>;
        const loadMore = this.props.showLoadMore && !this.props.loading ? (
            <div style={{
                height: 32, lineHeight: '32px', marginTop: 12, textAlign: 'center'
            }}
            >
                <Button onClick={this.props.handleLoadMore}>Показать больше</Button>
            </div>
        ) : null;


        return <div className="flight-table">
            <Spin spinning={this.props.loading} indicator={loader}>
                <List
                    itemLayout="horizontal"
                    dataSource={this.props.data}
                    renderItem={this.renderItem}
                    locale={{emptyText: "Ничего не нашлось"}}
                    loadMore={loadMore}
                />
            </Spin>
        </div>;
    }
}

export default FlightTable;
