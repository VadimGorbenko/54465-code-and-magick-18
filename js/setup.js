'use strict';

/**
 * @description Создаёт нового волшебника (new Wizard)
 * @class
 * @param {String} [fullName] - Полное имя волшебника.
 * @param {String} [coatColor=rgb(255,99,71)] - Цвет мантии.
 * @param {String} [eyesColor=rgb(160,82,45)] - Цвет глаз.
 */
function Wizard(fullName, coatColor, eyesColor) {
  if (fullName) {
    fullName = fullName.trim();
  }

  this.setName(fullName);
  this.setColorSchem('eyes', eyesColor);
  this.setColorSchem('coat', coatColor);
}

/**
 * @description Задаёт имя волшебника, либо переданное в конструктор, либо выбранное случайным образом одно из вариантов по умолчанию.
 * @param {String} [name] - Полное имя, в зависимости от nameType;
 */
Wizard.prototype.setName = function (name) {
  var WIZARD_FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

  var valuesArray;
  var nameIdx;
  var minNameIdx;
  var maxNameIdx;
  var fullName;
  if (name) {
    this.name = name;
  } else {
    fullName = [];
    minNameIdx = 0;
    // Определим имя
    valuesArray = WIZARD_FIRST_NAMES;
    maxNameIdx = valuesArray.length - 1;
    nameIdx = minNameIdx + Math.random() * (maxNameIdx - minNameIdx);
    nameIdx = Math.round(nameIdx);
    fullName.push(valuesArray[nameIdx]);
    // Определим фамилию
    valuesArray = WIZARD_LAST_NAMES;
    maxNameIdx = valuesArray.length - 1;
    nameIdx = minNameIdx + Math.random() * (maxNameIdx - minNameIdx);
    nameIdx = Math.round(nameIdx);
    fullName.push(valuesArray[nameIdx]);

    this.name = fullName.join(' ');

  }
};

/**
 * @description Определяет цвет для указанного элемента волшебника.
 * @param {String} target - что нужно перекрасить.
 * @param {String} [color] - в какой цвет нужно перекрасить.
 */
Wizard.prototype.setColorSchem = function (target, color) {
  var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];

  var valuesArray;

  switch (target) {
    case 'eyes':
      valuesArray = WIZARD_EYES_COLORS;
      break;
    case 'coat':
      valuesArray = WIZARD_COAT_COLORS;
      break;

    default:
      throw new Error('Цель цветовой схемы target не известна или не определёна.');
  }

  var colorIdx;
  var minColorIdx;
  var maxColorIdx;

  if (color) {
    this[target] = color;
  } else {
    minColorIdx = 0;
    maxColorIdx = valuesArray.length - 1;
    colorIdx = minColorIdx + Math.random() * (maxColorIdx - minColorIdx);
    colorIdx = Math.round(colorIdx);
    this[target] = valuesArray[colorIdx];
  }

};

/**
 * @description Отрисовывает настройки.
 */
function openSetup() {
  showBlock('.setup');
  var wizards = [
    new Wizard('Mr.Keks'),
    new Wizard(),
    new Wizard(),
    new Wizard(),
  ];

  drawWizards(wizards);
  showBlock('.setup-similar');
}

/**
 * @description убирает класс "hidden" с первого элемента по переданному селектору.
 * @param {String} selector - css-совместимый селектор элемента.
 */
function showBlock(selector) {
  document.querySelector(selector).classList.remove('hidden');
}

/**
 * @typedef {Object} Wizard
 * @property {String} name - Имя волшебника.
 * @property {String} eyes - Цвет глаз.
 * @property {String} coat - Цвет мантии.
 */

/**
 * @description Отрисовывает волшебников
 * @param {Wizard[]} wizards - массив волшебников.
 */
function drawWizards(wizards) {
  var template = document.querySelector('#similar-wizard-template');
  var wizardTemplate = template.content.querySelector('.setup-similar-item');
  var fragment = document.createDocumentFragment();
  var wizardItem;
  wizards.forEach(function (wizard) {
    wizardItem = wizardTemplate.cloneNode(true);
    wizardItem.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardItem.querySelector('.wizard-eyes').style.fill = wizard.eyes;
    wizardItem.querySelector('.wizard-coat').style.fill = wizard.coat;
    fragment.appendChild(wizardItem);
  });

  document.querySelector('.setup-similar-list').appendChild(fragment);
}

openSetup();
