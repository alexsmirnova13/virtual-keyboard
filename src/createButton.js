/* eslint-disable complexity */
import controls, {Button, ButtonFunction, ButtonNumber, Punctuation} from './controls.js';
import {renderButtons} from './script.js';
import state from './state.js';

export default function createButton(buttonFunction) {
	const button = document.createElement('button');
	const input = document.querySelector('.keyboard__screen');
	button.classList = `button keyboard__button key-${buttonFunction.code}`;

	if (!(buttonFunction instanceof ButtonFunction) && !(buttonFunction instanceof ButtonNumber) && !(buttonFunction instanceof Punctuation)) {
		const isUpperCase = Boolean((Number(state.capsLock) + Number(state.shift)) % 2);
		if (state.language === 'Ru') {
			if (isUpperCase) {
				button.innerText = buttonFunction.textRu.toUpperCase();
			} else {
				button.innerText = buttonFunction.textRu;
			}
		} else if (state.language === 'Eng') {
			if (isUpperCase) {
				button.innerText = buttonFunction.textEng.toUpperCase();
			} else {
				button.innerText = buttonFunction.textEng;
			}
		}
	} else if ((buttonFunction instanceof ButtonFunction) && !(buttonFunction instanceof ButtonNumber) && !(buttonFunction instanceof Punctuation)) {
		button.innerText = buttonFunction.textRu;
	} else if (!(buttonFunction instanceof ButtonFunction) && (buttonFunction instanceof ButtonNumber) && !(buttonFunction instanceof Punctuation)) {
		if (state.shift) {
			if (state.language === 'Ru') {
				button.innerText = buttonFunction.sybmolRu;
			} else {
				button.innerText = buttonFunction.symbolEng;
			}
		} else if (state.language === 'Ru') {
			button.innerText = buttonFunction.textRu;
		} else {
			button.innerText = buttonFunction.textEng;
		}
	} else if (buttonFunction instanceof Punctuation) {
		if (state.language === 'Ru') {
			if (state.shift) {
				button.innerText = buttonFunction.symbolRuShift;
			} else {
				button.innerText = buttonFunction.symbolRu;
			}
		} else if (state.shift) {
			button.innerText = buttonFunction.symbolEngShift;
		} else {
			button.innerText = buttonFunction.symbolEng;
		}
	}

	if ((buttonFunction.code === 'AltLeft') && state.alt === true) {
		button.classList.add('pushed');
	}

	if ((buttonFunction.code === 'ControlLeft') && state.ctrl === true) {
		button.classList.add('pushed');
	}

	if ((buttonFunction.code === 'ShiftLeft' || buttonFunction.code === 'ShiftRight') && state.shift === true) {
		button.classList.add('pushed');
	}

	if (buttonFunction.code === 'CapsLock' && state.capsLock === true) {
		button.classList.add('pushed');
	}

	if (buttonFunction instanceof ButtonFunction) {
		button.addEventListener('click', buttonFunction.func);
		if (state.ctrl) {
			if (state.alt) {
				if (state.language === 'Ru') {
					state.language = 'Eng';
				} else {
					state.language = 'Ru';
				}
			}
		}
	} else if (buttonFunction instanceof Button || buttonFunction instanceof Punctuation) {
		button.addEventListener('click', () => {
			const ss = input.selectionStart;
			const se = input.selectionEnd;
			const ln = input.value.length;
			const textbefore = input.value.substring(0, ss);
			const textafter = input.value.substring(se, ln);
			if (ss === se) {
				input.value = input.value.substring(0, ss) + button.innerText + input.value.substring(se, ln);
				input.focus();
				input.selectionStart = ss + 1;
				input.selectionEnd = ss + 1;
			} else {
				input.value = textbefore + button.innerText + textafter;
				input.focus();
				input.selectionStart = ss;
				input.selectionEnd = ss;
			}

			if (!(buttonFunction instanceof ButtonFunction)) {
				state.shift = false;
				state.case = 'lower';
				renderButtons(controls);
			}

			input.focus();
		});
	}

	if (state.capsLock) {
		if (state.language === 'Ru') {
			if (buttonFunction.code === 'Backquote') {
				button.innerText = buttonFunction.symbolRuShift;
			}
		}
	}

	return button;
}
