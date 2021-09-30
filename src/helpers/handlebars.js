var moment = require('moment');
module.exports = {
  discountCost: (a, b) => a - (a * b) / 100,
  convertDate: (a) => moment(a).format('MMMM Do YYYY, h:mm:ss a'),
  sum: (a) => (a == a ? a + 1 : a), //create helpers
  accType: (a) => (a == 1 ? 'User ' : 'Admin'),
  status: (a) => (a == 1 ? 'Activity' : 'Block'),
  order_status: (a) => {
    if (a == 1) return 'Ready';
    else if (a == 2) return 'Delivery';
    else if (a == 3) return 'Done';
    else if (a == 0) return 'Cancel';
  },
  btnStatus: (a) => (a == 1 ? 'block' : 'check'),
  sortable: (field, sort) => {
    const sortType = field == sort.column ? sort.type : 'default';
    const icons = {
      default: 'fas fa-sort',
      desc: 'fas fa-sort-amount-down',
      asc: 'fas fa-sort-amount-up',
    };

    const types = {
      default: 'desc',
      asc: 'desc',
      desc: 'asc',
    };
    const icon = icons[sortType];
    const type = types[sortType];
    return `<a href="?_sort&column=${field}&type=${type}">
          <i class="${icon}"></i>
        </a>`;
  },
};