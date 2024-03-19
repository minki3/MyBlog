import moment from 'moment';

export const dateFormat = (date: any) => {
  return moment(date.data.timestamp.toDate()).format('MM-DD');
};
