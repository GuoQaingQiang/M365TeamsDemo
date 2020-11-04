import React from 'react';
import { Row, Col } from 'antd';
import "./index.css";
type DatePickerProps = {
    onChange: () => String;
}
interface DatePickerState {
    isFocus: boolean;
    date: string;
}

export default class M365DatePicker extends React.Component<DatePickerProps, any>{
    constructor(props: DatePickerProps) {
        super(props);
        this.state = {
            isFocus: false,
            dataValue: '',
            dateObj: {}
        }
    }

    getTodayDate() {
        let date = new Date();
        return {
            dateObj: {
                year: date.getFullYear(),
                month: date.getMonth() + 1,
                date: date.getDate(),
                day: date.getDay() + 1
            },
            dataValue: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
        }
    }

    componentDidMount() {
        this.today();
    }
    // get there are many days in this year month;
    getDatesInMonth(year: number, month: any): number {
        var temp = new Date(year, parseInt(month, 10), 0);
        return temp.getDate();
    }

    getNewDateAndDay(year: number, month: number, date: number) {
        let daysNum = this.getDatesInMonth(year, month);
        if (date > daysNum) {
            date = daysNum;
        }
        return {
            date,
            day: (new Date(year, month - 1, date).getDay()) === 0 ? 7 : (new Date(year, month - 1, date).getDay())
        }
    }

    lastYear() {
        let { year, month, date } = this.state.dateObj;
        let currentYear = year - 1;
        let newDateAndDay = this.getNewDateAndDay(currentYear, month, date);
        this.setState({
            dateObj: {
                ...this.state.dateObj,
                year: currentYear,
                date: newDateAndDay.date,
                day: newDateAndDay.day
            }
        });
    }
    lastMonth() {
        let { year, month, date } = this.state.dateObj;
        let currentMonth = month - 1;
        if (currentMonth === 0) {
            let newDateAndDay = this.getNewDateAndDay(year - 1, 12, date);
            this.setState({
                dateObj: {
                    ...this.state.dateObj,
                    year: year - 1,
                    month: 12,
                    date: newDateAndDay.date,
                    day: newDateAndDay.day
                }
            });
        } else {
            let newDateAndDay = this.getNewDateAndDay(year, month, date);
            this.setState({
                dateObj: {
                    ...this.state.dateObj,
                    month: currentMonth,
                    date: newDateAndDay.date,
                    day: newDateAndDay.day
                }
            });
        }
    }
    nextMonth() {
        let { year, month, date } = this.state.dateObj;
        let currentMonth = month + 1;
        if (currentMonth === 13) {
            let newDateAndDay = this.getNewDateAndDay(year + 1, 1, date);
            this.setState({
                dateObj: {
                    ...this.state.dateObj,
                    year: year + 1,
                    month: 1,
                    date: newDateAndDay.date,
                    day: newDateAndDay.day
                }
            });
        } else {
            let newDateAndDay = this.getNewDateAndDay(year, month, date);
            this.setState({
                dateObj: {
                    ...this.state.dateObj,
                    month: currentMonth,
                    date: newDateAndDay.date,
                    day: newDateAndDay.day
                }
            });
        }
    }
    nextYear() {
        let { year, month, date } = this.state.dateObj;
        let currentYear = year + 1;
        let newDateAndDay = this.getNewDateAndDay(currentYear, month, date);
        this.setState({
            dateObj: {
                ...this.state.dateObj,
                year: currentYear,
                date: newDateAndDay.date,
                day: newDateAndDay.day
            }
        });
    }
    today() {
        let { dateObj, dataValue } = this.getTodayDate();
        this.setState({
            dateObj,
            dataValue
        })
    }
    // 根据年月日得到一个月面板上展示的日期数组
    getDatesArr(year: number, month: number, date: number) {
        // 得到这个月有多少天
        let thisMonthDates = this.getDatesInMonth(year, month);
        // 得到这个月第一天是周几
        let firstDayOfTheWeek = (new Date(year, month - 1, 1).getDay()) === 0 ? 7 : (new Date(year, month - 1, 1).getDay());
        // 得到这个月最后一天是周几
        let lastDayOfTheWeek = (new Date(year, month - 1, thisMonthDates).getDay()) === 0 ? 7 : (new Date(year, month - 1, thisMonthDates).getDay());
        // 1.前边需要补充上个月的最后几天
        // 得到上个月有几天
        let lastMonthDates = this.getLastMonthDates(year, month);
        let lastMonthDatesArr = [];
        for (let index = 0; index < firstDayOfTheWeek - 1; index++) {
            let singleDate = {
                color: 'gray',
                isToday: false,
                isActive: false,
                year: month === 1 ? year - 1 : year,
                month: month - 1,
                date: lastMonthDates - index,
                day: firstDayOfTheWeek - index - 1
            }
            lastMonthDatesArr.unshift(singleDate);
        }

        // 2.后边需要补充下个月的前几天
        let nextMonthDatesArr = [];
        for (let index = 0; index < 7 - lastDayOfTheWeek; index++) {
            let singleDate = {
                color: 'gray',
                isToday: false,
                isActive: false,
                year: month === 12 ? year + 1 : year,
                month: month + 1,
                date: 1 + index,
                day: firstDayOfTheWeek + 1 + index
            }
            nextMonthDatesArr.push(singleDate);
        }

        // 3.这个月的天数
        let thisMonthDatesArr = [];
        for (let index = 0; index < thisMonthDates; index++) {
            if (index + 1 === date) {
                thisMonthDatesArr.push({
                    color: 'black',
                    isToday: true,
                    isActive: true,
                    year: year,
                    month: month,
                    date: 1 + index,
                    day: firstDayOfTheWeek + index
                })
            } else {
                thisMonthDatesArr.push({
                    color: 'black',
                    isToday: false,
                    isActive: false,
                    year: year,
                    month: month,
                    date: 1 + index,
                    day: firstDayOfTheWeek + index
                })
            }
        }
        return [...lastMonthDatesArr, ...thisMonthDatesArr, ...nextMonthDatesArr]
    }

    // 根据年月得到上个月有几天
    getLastMonthDates(year: number, month: any): number {
        let lastMonthDates = 0;
        if (month === 1) {
            lastMonthDates = this.getDatesInMonth(year - 1, 12);
        } else {
            lastMonthDates = this.getDatesInMonth(year, month - 1);
        }
        return lastMonthDates;
    }

    render() {
        let { dataValue, isFocus, dateObj } = this.state;
        let { year, month, date } = dateObj;

        let thisMonthDatesArr = this.getDatesArr(year, month, date);
        return (
            <div className="date-picker-wrap">
                <input value={dataValue} className="date-input" type="text" placeholder="Select date"
                    onFocus={() => {
                        this.setState({ isFocus: true })
                    }}
                    onBlur={() => {
                        // this.setState({ isFocus: false })
                    }} />
                <div className="date-picker-panel" style={{ display: isFocus ? "block" : "none" }}>
                    <div className="paner-header">
                        <button className="change-date"
                            aria-label="last year"
                            onClick={() => this.lastYear()}>&lt;&lt;</button>
                        <button className="change-date"
                            aria-label="last month"
                            onClick={() => this.lastMonth()}>&lt;</button>
                        <span>{year}year&nbsp;{month}month</span>
                        <button className="change-date"
                            aria-label="next month"
                            onClick={() => this.nextMonth()}>&gt;&gt;</button>
                        <button className="change-date"
                            aria-label="next year"
                            onClick={() => this.nextYear()}>&gt;</button>
                    </div>
                    <div className="paner-content">
                        <Row className="datePicker-row">
                            <Col className="datePicker-col">一</Col>
                            <Col className="datePicker-col">二</Col>
                            <Col className="datePicker-col">三</Col>
                            <Col className="datePicker-col">四</Col>
                            <Col className="datePicker-col">五</Col>
                            <Col className="datePicker-col">六</Col>
                            <Col className="datePicker-col">日</Col>
                        </Row>
                        <Row className="datePicker-row date-wrap">
                            {
                                thisMonthDatesArr.map((item, index) => {
                                    return <Col key={index}
                                        tabIndex={2}
                                        className={"datePicker-col " + (item.isToday ? 'today ' : '') + (item.isActive ?
                                            "active" : '')}
                                        onClick={() => {
                                            let { year, month, date, day } = item;
                                            if (month)
                                                this.setState({
                                                    dataValue: item.year + '-' + item.month + '-' + item.date,
                                                    dateObj: {
                                                        year,
                                                        month,
                                                        date,
                                                        day
                                                    }
                                                });
                                        }}
                                        style={{ color: item.color }}>{item.date}</Col>
                                })
                            }
                        </Row>
                    </div>
                    <div className="paner-footer">
                        <button className="change-date"
                            onClick={() => this.today()}>today</button>

                        <button className="change-date"
                            onClick={() => this.setState({ isFocus: false })}> close</button>
                    </div>
                </div>
            </div>)
    }
}