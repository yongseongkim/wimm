import {isNil} from 'lodash';
import moment from 'moment';

const DateFormatter = {
  dateInForm: (str: string): Date => {
    return moment(str, 'YYYY-MM-DD HH:mm').toDate();
  },
  formatInForm: (date: Date): string => {
    return moment(date).format('YYYY-MM-DD HH:mm');
  },
};

export default DateFormatter;
