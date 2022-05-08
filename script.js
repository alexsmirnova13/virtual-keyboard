/* eslint-disable no-negated-condition */
import controls, {Button, ButtonFunction} from './controls.js';
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
	button.classList = 'button keyboard__button';
	if (!(buttonFunction instanceof ButtonFunction)) {
		if (state.language === 'Ru') {
			if (state.case === 'upper') {
				button.innerText = buttonFunction.textRu.toUpperCase();
			} else {
				button.innerText = buttonFunction.textRu;
			}
		} else if (state.language === 'Eng') {
			if (state.case === 'upper') {
				button.innerText = buttonFunction.textEng.toUpperCase();
			} else {
				button.innerText = buttonFunction.textEng;
			}
		}
	} else {
		button.innerText = buttonFunction.textRu;
	}

	if (buttonFunction instanceof ButtonFunction) {
		button.addEventListener('click', buttonFunction.func);
	} else if (buttonFunction instanceof Button) {
		button.addEventListener('click', () => {
			const ss = input.selectionStart;
			const se = input.selectionEnd;
			const ln = input.value.length;
			const textbefore = input.value.substring(0, ss);
			const textselected = input.value.substring(ss, se);
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

			input.focus();
		});
	}

	return button;
}

createKeyboard();

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

renderButtons(controls);

// ентер (как бекспейс)
// зависимость вирт клавы от физ клавы
// кнопка делейт и ее функц (не обязат)
// дизайн
// Shift + кнопки 1-0
// стрелочки
// space как энтер
// сочетание клавиш для переключения языка фльт шифт

