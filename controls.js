import {renderButtons} from './script.js';
import state from './state.js';

export class Button {
	constructor(textRu, textEng) {
		this.textEng = textEng;
		this.textRu = textRu;
	}
}
export class ButtonFunction extends Button {
	constructor(text, func) {
		super(text, text);
		this.func = func;
	}
}
const controls1 = [
	new Button('ё', '`'),
	new Button('1', '1'),
	new Button('2', '2'),
	new Button('3', '3'),
	new Button('4', '4'),
	new Button('5', '5'),
	new Button('6', '6'),
	new Button('7', '7'),
	new Button('8', '8'),
	new Button('9', '9'),
	new Button('0', '0'),
	new Button('-', '-'),
	new Button('=', '='),
	new ButtonFunction('backspase', (() => {
		const input = document.querySelector('.keyboard__screen');

		const ss = input.selectionStart;
		const se = input.selectionEnd;
		const ln = input.value.length;
		const textbefore = input.value.substring(0, ss);
		const textselected = input.value.substring(ss, se);
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
	new ButtonFunction('Tab', (() => {
		const input = document.querySelector('.keyboard__screen');
		input.value += '    ';
	})),
	new Button('й', 'q'),
	new Button('ц', 'w'),
	new Button('у', 'e'),
	new Button('к', 'r'),
	new Button('е', 't'),
	new Button('н', 'y'),
	new Button('г', 'u'),
	new Button('ш', 'i'),
	new Button('щ', 'o'),
	new Button('з', 'p'),
	new Button('х', '['),
	new Button('ъ', ']'),
	new Button('\\', '\\'),
];

const controls3 = [
	new ButtonFunction('CapsLk', (() => {
		if (state.case === 'lower') {
			state.case = 'upper';
		} else {
			state.case = 'lower';
		}

		renderButtons(controls);
	})),
	new Button('ф', 'a'),
	new Button('ы', 's'),
	new Button('в', 'd'),
	new Button('а', 'f'),
	new Button('п', 'g'),
	new Button('р', 'h'),
	new Button('о', 'j'),
	new Button('л', 'k'),
	new Button('д', 'l'),
	new Button('ж', ';'),
	new Button('э', '\''),
	new ButtonFunction('Enter', (() => {
		const input = document.querySelector('.keyboard__screen');
		// Console.log('\r\n')
		input.value += '\n';
	})),
];

const controls4 = [
	new Button('Shift', 'Shift'),
	new Button('я', 'z'),
	new Button('ч', 'x'),
	new Button('с', 'c'),
	new Button('м', 'v'),
	new Button('и', 'b'),
	new Button('т', 'n'),
	new Button('ь', 'm'),
	new Button('б', ','),
	new Button('ю', '.'),
	new Button('.', '/'),
	new Button('наверх', 'up'),
];

const controls5 = [
	new ButtonFunction('ru/eng', (() => {
		if (state.language === 'Ru') {
			state.language = 'Eng';
		} else {
			state.language = 'Ru';
		}

		localStorage.setItem('language', state.language);
		renderButtons(controls);
	})),
	new Button('Ctrl', 'Ctrl'),
	new Button('win', 'win'),
	new Button('Alt', 'Alt'),
	new ButtonFunction('Space', (() => {
		const input = document.querySelector('.keyboard__screen');
		input.value += ' ';
	})),
	new Button('Alt', 'v'),
	new Button('<', '<'),
	new Button('вниз', 'вниз'),
	new Button('>', '>'),
	new Button('Ctrl', 'Ctrl'),
];
const controls = [
	controls1,
	controls2,
	controls3,
	controls4,
	controls5,
];

export default controls;
