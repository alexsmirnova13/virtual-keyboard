/* eslint-disable max-params */
import {renderButtons} from './script.js';
import state from './state.js';

export class Button {
	constructor(textRu, textEng, code) {
		this.textEng = textEng;
		this.textRu = textRu;
		this.code = code;
	}
}
export class Punctuation {
	constructor(symbolRu, symbolRuShift, symbolEng, symbolEngShift, code) {
		this.symbolRu = symbolRu;
		this.symbolEng = symbolEng;
		this.symbolEngShift = symbolEngShift;
		this.symbolRuShift = symbolRuShift;
		this.code = code;
	}
}
export class ButtonNumber extends Button {
	constructor(text, code, sybmolRu, symbolEng) {
		super(text, text, code);
		this.sybmolRu = sybmolRu;
		this.symbolEng = symbolEng;
	}
}
export class ButtonFunction extends Button {
	constructor(text, code, func) {
		super(text, text, code);
		this.func = func;
	}
}
const controls1 = [
	new Punctuation('ё', 'Ё', '`', '~', 'Backquote'),
	new ButtonNumber('1', 'Digit1', '!', '!'),
	new ButtonNumber('2', 'Digit2', '"', '@'),
	new ButtonNumber('3', 'Digit3', '№', '#'),
	new ButtonNumber('4', 'Digit4', ';', '$'),
	new ButtonNumber('5', 'Digit5', '%', '%'),
	new ButtonNumber('6', 'Digit6', ':', '^'),
	new ButtonNumber('7', 'Digit7', '?', '&'),
	new ButtonNumber('8', 'Digit8', '*', '*'),
	new ButtonNumber('9', 'Digit9', '(', '('),
	new ButtonNumber('0', 'Digit0', ')', ')'),
	new ButtonNumber('-', 'Minus', '_', '_'),
	new ButtonNumber('=', 'Equal', '+', '+'),
	new ButtonFunction('Backspace', 'Backspace', (() => {
		const input = document.querySelector('.keyboard__screen');

		const ss = input.selectionStart;
		const se = input.selectionEnd;
		const ln = input.value.length;
		const textbefore = input.value.substring(0, ss);
		const textafter = input.value.substring(se, ln);

		if (ss === se) {
			input.value = input.value.substring(0, ss - 1) + input.value.substring(se, ln);
			input.focus();
			input.selectionStart = ss - 1;
			input.selectionEnd = ss - 1;
		} else {
			input.value = textbefore + textafter;
			input.focus();
			input.selectionStart = ss;
			input.selectionEnd = ss;
		}
	})),
];
const controls2 = [
	new ButtonFunction('Tab', 'Tab', (() => {
		const input = document.querySelector('.keyboard__screen');

		const ss = input.selectionStart;
		const se = input.selectionEnd;
		const ln = input.value.length;
		const textbefore = input.value.substring(0, ss);
		const textafter = input.value.substring(se, ln);

		if (ss === se) {
			input.value = input.value.substring(0, ss) + '\t' + input.value.substring(se, ln);
			input.focus();
			input.selectionStart = ss + 1;
			input.selectionEnd = ss + 1;
		} else {
			input.value = textbefore + textafter;
			input.focus();
			input.selectionStart = ss;
			input.selectionEnd = ss;
		}
	})),
	new Button('й', 'q', 'KeyQ'),
	new Button('ц', 'w', 'KeyW'),
	new Button('у', 'e', 'KeyE'),
	new Button('к', 'r', 'KeyR'),
	new Button('е', 't', 'KeyT'),
	new Button('н', 'y', 'KeyY'),
	new Button('г', 'u', 'KeyU'),
	new Button('ш', 'i', 'KeyI'),
	new Button('щ', 'o', 'KeyO'),
	new Button('з', 'p', 'KeyP'),
	new Button('х', '[', 'BracketLeft'),
	new Button('ъ', ']', 'BracketLeft'),
	new Punctuation('\\', '/', '\\', '|', 'Backslash'),
	new ButtonFunction('Delete', 'Delete', (() => {
		const input = document.querySelector('.keyboard__screen');

		const ss = input.selectionStart;
		const se = input.selectionEnd;
		const ln = input.value.length;
		const textbefore = input.value.substring(0, ss);
		const textafter = input.value.substring(se, ln);

		if (ss === se) {
			input.value = input.value.substring(0, ss) + input.value.substring(se + 1, ln);
			input.focus();
			input.selectionStart = ss;
			input.selectionEnd = ss;
		} else {
			input.value = textbefore + textafter;
			input.focus();
			input.selectionStart = ss;
			input.selectionEnd = ss;
		}
	})),
];

const controls3 = [
	new ButtonFunction('CapsLock', 'CapsLock', (() => {
		state.capsLock = !state.capsLock;

		renderButtons(controls);
	})),
	new Button('ф', 'a', 'KeyA'),
	new Button('ы', 's', 'KeyS'),
	new Button('в', 'd', 'KeyD'),
	new Button('а', 'f', 'KeyF'),
	new Button('п', 'g', 'KeyG'),
	new Button('р', 'h', 'KeyH'),
	new Button('о', 'j', 'KeyJ'),
	new Button('л', 'k', 'KeyK'),
	new Button('д', 'l', 'KeyL'),
	new Punctuation('ж', 'Ж', ';', ':', 'Semicolon'),
	new Punctuation('э', 'Э', '\'', '"', 'Quote'),
	new ButtonFunction('Enter', 'Enter', (() => {
		const input = document.querySelector('.keyboard__screen');

		const ss = input.selectionStart;
		const se = input.selectionEnd;
		const ln = input.value.length;
		const textbefore = input.value.substring(0, ss);
		const textafter = input.value.substring(se, ln);

		if (ss === se) {
			input.value = input.value.substring(0, ss) + '\n' + input.value.substring(se, ln);
			input.focus();
			input.selectionStart = ss + 1;
			input.selectionEnd = ss + 1;
		} else {
			input.value = textbefore + textafter;
			input.focus();
			input.selectionStart = ss;
			input.selectionEnd = ss;
		}
	})),
];

const controls4 = [
	new ButtonFunction('Shift', 'ShiftLeft', (() => {
		state.shift = !state.shift;
		renderButtons(controls);
	})),
	new Button('я', 'z', 'KeyZ'),
	new Button('ч', 'x', 'KeyX'),
	new Button('с', 'c', 'KeyC'),
	new Button('м', 'v', 'KeyV'),
	new Button('и', 'b', 'KeyB'),
	new Button('т', 'n', 'KeyN'),
	new Button('ь', 'm', 'KeyM'),
	new Punctuation('б', 'Б', ',', '<', 'Comma'),
	new Punctuation('ю', 'Ю', '.', '?', 'Period'),
	new Punctuation('.', ',', '/', '?', 'Slash'),
	new Button('\u2191', '\u2191', 'ArrowUp'),
	new ButtonFunction('Shift', 'ShiftRight', (() => {
		state.shift = !state.shift;
		renderButtons(controls);
	})),
];

const controls5 = [
	new ButtonFunction('ru/eng', '', (() => {
		if (state.language === 'Ru') {
			state.language = 'Eng';
		} else {
			state.language = 'Ru';
		}

		localStorage.setItem('language', state.language);
		renderButtons(controls);
	})),
	new ButtonFunction('Ctrl', 'ControlLeft', (() => {
		state.ctrl = !state.ctrl;
		if (state.alt) {
			if (state.language === 'Ru') {
				state.language = 'Eng';
			} else {
				state.language = 'Ru';
			}

			state.alt = !state.alt;
			state.ctrl = !state.ctrl;
		}

		renderButtons(controls);
	})),
	new ButtonFunction('Meta', 'MetaLeft', (() => {
		state.win = !state.win;
	})),
	new ButtonFunction('Alt', 'AltLeft', (() => {
		state.alt = !state.alt;
		if (state.ctrl) {
			if (state.language === 'Ru') {
				state.language = 'Eng';
			} else {
				state.language = 'Ru';
			}

			state.alt = !state.alt;
			state.ctrl = !state.ctrl;
		}

		renderButtons(controls);
	})),
	new ButtonFunction('Space', 'Space', (() => {
		const input = document.querySelector('.keyboard__screen');

		const ss = input.selectionStart;
		const se = input.selectionEnd;
		const ln = input.value.length;
		const textbefore = input.value.substring(0, ss);
		const textafter = input.value.substring(se, ln);

		if (ss === se) {
			input.value = input.value.substring(0, ss) + ' ' + input.value.substring(se, ln);
			input.focus();
			input.selectionStart = ss + 1;
			input.selectionEnd = ss + 1;
		} else {
			input.value = textbefore + textafter;
			input.focus();
			input.selectionStart = ss;
			input.selectionEnd = ss;
		}
	})),
	new ButtonFunction('Alt', 'AltRight', (() => {
		state.alt = !state.alt;
	})),

	new ButtonFunction('Ctrl', 'ControlRight', (() => {
		state.ctrl = !state.ctrl;
	})),
	new Button('\u2190', '\u2190', 'ArrowLeft'),
	new Button('\u2193', '\u2193', 'ArrowDown'),
	new Button('\u2192', '\u2192', 'ArrowRight'),
];
const controls = [
	controls1,
	controls2,
	controls3,
	controls4,
	controls5,
];

export default controls;
