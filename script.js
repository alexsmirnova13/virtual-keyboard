/* eslint-disable capitalized-comments */

import controls, {Button, ButtonFunction, ButtonNumber} from './controls.js';
import state from './state.js';
// Const language = 'Ru';

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

function createButton(buttonFunction) {
	const button = document.createElement('button');
	const input = document.querySelector('.keyboard__screen');
	button.classList = `button keyboard__button key-${buttonFunction.code}`;
	if (!(buttonFunction instanceof ButtonFunction) && !(buttonFunction instanceof ButtonNumber)) {
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
	} else if ((buttonFunction instanceof ButtonFunction) && !(buttonFunction instanceof ButtonNumber)) {
		button.innerText = buttonFunction.textRu;
	} else if (!(buttonFunction instanceof ButtonFunction) && (buttonFunction instanceof ButtonNumber)) {
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
	}

	if (buttonFunction instanceof ButtonFunction) {
		button.addEventListener('click', buttonFunction.func);
	} else if (buttonFunction instanceof Button) {
		button.addEventListener('click', () => {
			const ss = input.selectionStart;
			const se = input.selectionEnd;
			const ln = input.value.length;
			const textbefore = input.value.substring(0, ss);
			// const textselected = input.value.substring(ss, se);
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
renderButtons(controls);

// сочетание клавиш для переключения языка альт шифт
// капс и замена языка как на компе

