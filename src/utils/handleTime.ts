import moment, { Moment } from 'moment'

const handleTime = {
  getTimestamp: (
    date: Date | Moment | string,
    type?: string
  ) => {
    return moment(date, type).unix()
  },
  getTimestampEndDay: (date: Moment) => {
    return moment(date).endOf('day').unix()
  },
  format: (
    date: Date | Moment | string | number,
    type: string
  ) => {
    if (typeof date === 'number') {
      date = date * 1000
    }
    return moment(date).format(type)
  }
}

export default handleTime
