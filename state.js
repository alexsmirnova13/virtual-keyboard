
const state = {
	language: localStorage.getItem('language') || 'Ru',
	case: 'lower',
	capsLock: false,
	shift: false,
	ctrl: false,
	alt: false,
	win: false,

};

export default state;
