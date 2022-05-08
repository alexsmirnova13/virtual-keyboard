
const state = {
	language: localStorage.getItem('language') || 'Ru',
	case: 'lower',
	shift: false,
	ctrl: false,
	alt: false,

};

export default state;
