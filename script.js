/* eslint-disable no-lonely-if */
/* eslint-disable no-negated-condition */
/* eslint-disable capitalized-comments */

import controls, {Button, ButtonFunction, ButtonNumber, Punctuation} from './controls.js';
import state from './state.js';

function createKeyboard() {
	const body = document.querySelector('body');
	const keyboard = document.createElement('div');
	keyboard.classList = 'keyboard';
	body.append(keyboard);
	const screen = document.createElement('textarea');
	const controls = document.createElement('div');
	screen.classList = 'keyboard__screen';
	controls.classList = 'keyboard__controls';
	keyboard.append(screen);
	keyboard.append(controls);
}

// eslint-disable-next-line complexity
function createButton(buttonFunction) {
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
			if (!(state.shift)) {
				button.innerText = buttonFunction.symbolRu;
			} else {
				button.innerText = buttonFunction.symbolRuShift;
			}
		} else {
			if (!(state.shift)) {
				button.innerText = buttonFunction.symbolEng;
			} else {
				button.innerText = buttonFunction.symbolEngShift;
			}
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
	} else if (buttonFunction instanceof Button) {
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
	// console.log(buttonFunction)

	return button;
}

function createText() {
	const body = document.querySelector('body');
	const info = document.createElement('div');
	info.classList = 'info';
	body.append(info);
	const language = document.createElement('p');
	const title = document.createElement('h1');
	const os = document.createElement('p');
	language.classList = 'info__p';
	title.classList = 'title';
	os.classList = 'info__p';
	info.append(os);
	info.append(language);
	body.prepend(title);
	title.innerText = 'RSS Виртуальная клавиатура';
	os.innerText = 'Клавиатура создана в операционной системе Windows';
	language.innerText = 'Для переключения языка комбинация: левыe ctrl + alt';
}

createKeyboard();
createText();

export function renderButtons(controls) {
	const controlsDiv = document.querySelector('.keyboard__controls');
	const textarea = document.querySelector('.keyboard__screen');
	controlsDiv.innerHTML = '';
	controls.forEach(el => {
		const line = document.createElement('div');
		line.classList = 'keyboard__line';
		controlsDiv.append(line);
		el.forEach(item => {
			const button = createButton(item);
			line.append(button);
		});
	});
	localStorage.setItem('language', state.language);
	textarea.focus();
}

document.addEventListener('keydown', e => {
	const {code} = e;
	const button = document.querySelector(`.key-${code}`);
	const input = document.querySelector('.keyboard__screen');
	if (!(e.key === button.innerText)) {
		if (button.innerText.length === 1) {
			e.preventDefault();
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
		}
	}
});

document.addEventListener('keydown', e => {
	const {code} = e;
	const keySelector = `.key-${code}`;
	const button = document.querySelector(keySelector);
	if (button) {
		button.classList.add('active');
	}
});

document.addEventListener('keyup', e => {
	const {code} = e;
	const keySelector = `.key-${code}`;
	const button = document.querySelector(keySelector);
	if (button) {
		button.classList.remove('active');
	}
});

document.addEventListener('keydown', e => {
	if (e.code === 'AltLeft') {
		state.alt = true;
	}

	if (e.code === 'ControlLeft') {
		state.ctrl = true;
	}
});

document.addEventListener('keyup', e => {
	const button = document.querySelector(`.key-${e.code}`);
	if (state.alt && state.ctrl) {
		state.language = state.language === 'Ru' ? 'Eng' : 'Ru';
	}

	if (e.code === 'AltLeft') {
		state.alt = false;
		button.classList.remove('pushed');
	}

	if (e.code === 'ControlLeft') {
		state.ctrl = false;
		button.classList.remove('pushed');
	}

	renderButtons(controls);
});

document.addEventListener('keydown', e => {
	if (e.code === 'ShiftRight' || e.code === 'ShiftLeft') {
		state.shift = true;
		renderButtons(controls);
	}
});

document.addEventListener('keyup', e => {
	if (e.code === 'ShiftRight' || e.code === 'ShiftLeft') {
		state.shift = false;
		renderButtons(controls);
	}
});

renderButtons(controls);

// активные шифт, альт, контрл
