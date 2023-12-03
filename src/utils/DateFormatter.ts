import moment from 'moment';

const DateFormatter = {
  formatInForm: (date: Date): string => {
    return moment(date).format('YYYY-MM-DD HH:mm');
  },
};

export default DateFormatter;
