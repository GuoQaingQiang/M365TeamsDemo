import React from 'react';
import { Row, Col } from 'antd';
import "./index.css";
type DatePickerProps = {
    onChange: () => String;
}

export default class M365DatePicker extends React.Component<DatePickerProps, any>{
    constructor(props: DatePickerProps) {
        super(props);
        this.state = {
            isFocus: false,
            dataValue: '',
            dateObj: {
                year: 0,
                month: 1,
                date: 1,
                day: 1
            },
            model: 'date', // ['date','tenYear',''hundredYear',"month"],
            tenYearsArr: [],
            hundredYearsArr: []
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
            dataValue,
            model: "date"
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

    // 日期点击事件
    dateClick(item: { color?: string; isToday?: boolean; isActive?: boolean; year: any; month: any; date: any; day?: any; }) {
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
    }

    // 年点击事件
    yearClick() {
        let { year } = this.state.dateObj;
        if (this.state.model === "date") {
            let tenYearsArr = [];
            let theFirstyear = year - year % 10;
            for (let index = -1; index < 11; index++) {
                tenYearsArr.push(theFirstyear + index);
            }
            this.setState({
                model: 'tenYear',
                tenYearsArr
            });
        } else {
            let hundredYearsArr = [];
            let theFirstyear = year - year % 100;
            for (let index = -10; index < 110; index += 10) {
                hundredYearsArr.push((theFirstyear + index) + '-' + (theFirstyear + index + 9));
            }
            this.setState({
                model: 'hundredYear',
                hundredYearsArr
            });
        }
    }

    // 月点击事件
    monthClick() {
        this.setState({ model: 'month' });
    }

    // 选择月份
    selectMonth(newMonth: any) {
        let { year, date } = this.state.dateObj;
        let newDate = date > this.getDatesInMonth(year, newMonth) ? this.getDatesInMonth(year, newMonth) : date;
        let newDay = (new Date(year, newMonth - 1, newDate).getDay()) === 0 ? 7 : (new Date(year, newMonth - 1, newDate).getDay());
        this.setState({
            dataValue: year + '-' + newMonth + '-' + newDate,
            dateObj: {
                year,
                month: newMonth,
                date: newDate,
                day: newDay
            },
            model: "date"
        });
    }

    // 10年模式下选择年
    selectTenYear(newYear: any) {
        let { month, date } = this.state.dateObj;
        let newDate = date > this.getDatesInMonth(newYear, month) ? this.getDatesInMonth(newYear, month) : date;
        let newDay = (new Date(newYear, month - 1, newDate).getDay()) === 0 ? 7 : (new Date(newYear, month - 1, newDate).getDay());
        this.setState({
            dataValue: newYear + '-' + month + '-' + newDate,
            dateObj: {
                year: newYear,
                month,
                date: newDate,
                day: newDay
            },
            model: "month"
        });
    }

    // 100年模式下选择年
    selectHundredYear(newYear: any) {
        this.setState({
            dateObj: {
                ...this.state.dateObj,
                year: Number(newYear.split('-')[0])
            },
            model: "tenYear"
        });
    }


    render() {
        let { dataValue, isFocus, dateObj, model, tenYearsArr, hundredYearsArr } = this.state;
        let { year, month, date } = dateObj;
        let thisMonthDatesArr = this.getDatesArr(year, month, date);
        return (
            <div className="date-picker-wrap">
                <input readOnly={true} value={dataValue} className="date-input" type="text" placeholder="Select date"
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
                        {model !== "date" ? "" : <button className="change-date"
                            aria-label="last month"
                            onClick={() => this.lastMonth()}>&lt;</button>}

                        {
                            model === "date" ? <>
                                <button className="select-year" aria-label="select year"
                                    onClick={() => this.yearClick()}
                                >&nbsp;{year}&nbsp;year</button>
                                <button className="select-month" aria-label="select month"
                                    onClick={() => this.monthClick()}
                                >{month}&nbsp;month&nbsp;</button></> : ""
                        }

                        {
                            model === "tenYear" ?
                                <button className="select-year" aria-label="select year"
                                    onClick={() => this.yearClick()}
                                >&nbsp;{year}-{year + 9}&nbsp;year</button> : ""
                        }

                        {
                            model === "hundredYear" ?
                                <button className="select-year" aria-label="select year"
                                    onClick={() => this.yearClick()}
                                >&nbsp;{year}-{year + 99}&nbsp;year</button> : ""
                        }

                        {
                            model === "month" ?
                                <button className="select-month" aria-label="select month"
                                    onClick={() => this.monthClick()}
                                >&nbsp;{year}&nbsp;year</button> : ""
                        }

                        {
                            model !== "date" ? "" : <button className="change-date"
                                aria-label="next month"
                                onClick={() => this.nextMonth()}>&gt;</button>
                        }
                        <button className="change-date"
                            aria-label="next year"
                            onClick={() => this.nextYear()}>&gt;&gt;</button>
                    </div>
                    <div className="paner-content">
                        {
                            model === "date" ? <>
                                <Row className="datePicker-row">
                                    <Col className="datePicker-col">Mon</Col>
                                    <Col className="datePicker-col">Tues</Col>
                                    <Col className="datePicker-col">Wed</Col>
                                    <Col className="datePicker-col">Thur</Col>
                                    <Col className="datePicker-col">Fri</Col>
                                    <Col className="datePicker-col">Sat</Col>
                                    <Col className="datePicker-col">Sun</Col>
                                </Row>
                                <Row className="datePicker-row date-wrap">
                                    {
                                        thisMonthDatesArr.map((item, index) => {
                                            return <Col key={index}
                                                tabIndex={2}
                                                className={"datePicker-col " + (item.isToday ? 'today ' : '') + (item.isActive ?
                                                    "active" : '')}
                                                onClick={() => { this.dateClick(item); }}
                                                style={{ color: item.color }}>{item.date}</Col>
                                        })
                                    }
                                </Row></> : ""
                        }
                        {
                            model === "tenYear" ?
                                <Row className="datePicker-row date-wrap">
                                    {
                                        tenYearsArr.map((item: React.ReactNode, index: string | number | null | undefined) => {
                                            return <Col key={index}
                                                tabIndex={2}
                                                className={"datePicker-col datePicker-col-tenyear"}
                                                onClick={() => { this.selectTenYear(item) }}>{item}</Col>
                                        })

                                    }
                                </Row> : ""
                        }
                        {
                            model === "hundredYear" ?
                                <Row className="datePicker-row date-wrap">
                                    {
                                        hundredYearsArr.map((item: React.ReactNode, index: string | number | null | undefined) => {
                                            return <Col key={index}
                                                tabIndex={2}
                                                className={"datePicker-col datePicker-col-hundredyear"}
                                                onClick={() => { this.selectHundredYear(item) }}>{item}</Col>
                                        })

                                    }
                                </Row> : ""
                        }

                        {
                            model === "month" ?
                                <Row className="datePicker-row date-wrap">
                                    {
                                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item, index) => {
                                            return <Col key={index}
                                                tabIndex={2}
                                                className={"datePicker-col datePicker-col-month"}
                                                onClick={() => { this.selectMonth(item) }}>{item}</Col>
                                        })
                                    }
                                </Row> : ""
                        }
                    </div>
                    <div className="paner-footer">
                        <button className="change-date select-today"
                            onClick={() => this.today()}>today</button>
                        <button className="change-date"
                            onClick={() => this.setState({ isFocus: false })}>close</button>
                    </div>
                </div>
            </div>)
    }
}