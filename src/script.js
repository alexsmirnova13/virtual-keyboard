
import controls from './controls.js';
import createButton from './createButton.js';
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
	if (!(e.key === button?.innerText)) {
		if (button?.innerText.length === 1) {
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

	if (e.code === 'CapsLock') {
		state.capsLock = !state.capsLock;
		renderButtons(controls);
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
		if (state.shift) {
			return;
		}

		state.shift = true;
		renderButtons(controls);
	}
});

document.addEventListener('keyup', e => {
	if (e.code === 'ShiftRight' || e.code === 'ShiftLeft') {
		if (!state.shift) {
			return;
		}

		state.shift = false;
		renderButtons(controls);
	}
});

document.addEventListener('keydown', e => {
	if (e.code === 'Tab') {
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
	}
});

renderButtons(controls);

