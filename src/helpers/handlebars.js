var moment = require("moment");
module.exports = {
  discountCost: (a, b) => (a == 0 ? b : a),
  convertDate: (a) => moment(a).format("MMMM Do YYYY, h:mm:ss a"),
  sum: (a) => (a == a ? a + 1 : a), //create helpers
  accType: (a) => (a == 1 ? "User " : "Admin"),
  status: (a) => (a == 1 ? "Activity" : "Block"),
  order_status: (a) => {
    if (a == 1) return "Ready";
    else if (a == 2) return "Delivery";
    else if (a == 3) return "Done";
    else if (a == 0) return "Cancel";
  },
  btnStatus: (a) => (a == 1 ? "block" : "check"),
  sortable: (field, sort) => {
    const sortType = field == sort.column ? sort.type : "default";
    const icons = {
      default: "fas fa-sort",
      desc: "fas fa-sort-amount-down",
      asc: "fas fa-sort-amount-up",
    };

    const types = {
      default: "desc",
      asc: "desc",
      desc: "asc",
    };
    const icon = icons[sortType];
    const type = types[sortType];
    return `<a href="?_sort&column=${field}&type=${type}">
          <i class="${icon}"></i>
        </a>`;
  },
  formatCurrency: (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(Number(price));
  },

  formatLongString: (str) => {
    return str.length > 10 ? str.slice(0, 9).concat("...") : str;
  },

  emitCardTitle: (str) => {
    return str.length > 40 ? str.slice(0, 40).concat("...") : str;
  },

  displayPromotion: (per) => {
    return per != 0 ? per + "% off" : "";
  },

  displayStarNo: (starNo) => {
    let stars = "";
    for (let i = 0; i < starNo; i++) stars += "star ";
    return stars;
  },
};
