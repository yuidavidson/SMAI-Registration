
const makeUrl = path => `/app${path}`;

const navMap = {
  '/': {title: 'Home', bcrumb: ''},
  '/events': {title: 'Events/Camps', bcrumb: 'Events/Camps'},
  '/register': {title: 'Register for Event/Camp', bcrumb: 'Register'},
  '/register/camper': {title: 'Register Camper', bcrumb: 'Camper'},
  '/register/camper/details': {title: 'Camper Details', bcrumb: 'Details'},
  '/register/camper/sessions': {title: 'Camper Sessions', bcrumb: 'Sessions'},
};

export {makeUrl, navMap};