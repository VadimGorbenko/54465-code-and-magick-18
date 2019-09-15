var MODAL_X = 100;
var MODAL_Y = 10;
var MODAL_WIDTH = 420;
var MODAL_HEIGHT = 270;
var MODAL_PADDING = 20;
var MODAL_COLOR = 'white';

var MODAL_SHADDOW_OFFSET_X = 10;
var MODAL_SHADDOW_OFFSET_Y = 10;
var MODAL_SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';

var TEXT_X = MODAL_X + MODAL_PADDING;
var TEXT_Y = MODAL_Y + MODAL_PADDING;
var TEXT_SIZE = 16 + 'px';
var TEXT_FAMILY = 'PT Mono';
var TEXT_COLOR = 'black';

var COLUMN_TEXT_TOP_MARGIN = 20;

var STATS_HEIGHT = 140;
var STATS_TEXT_MARGIN_TOP = 5;
var STATS_BARS_MARGIN_SIDES = 10;
/**
 *
 * @description Функция для отрисовки статистики игроков.
 * @param {HTMLCanvasElement} ctx - 2D канвас КОНТЕКСТ, на котором рисуется игра.
 * @param {String[]} names - массив имён игроков.
 * @param {Number[]} times - массив миллисекунд, затраченных на прохождение игры.
 */
function renderStatistics(ctx, names, times){
    drawModal(ctx);
    drawTitle(ctx, ['Ура, вы победили!', 'Список результатов:']);
    drawStats(ctx, names, times);
}

/**
 *
 * @description Рисует модалку с тенью
 * @param {HTMLCanvasElement} ctx - 2D канвас КОНТЕКСТ, на котором рисуется игра.
 */
function drawModal(ctx) {
    // Рисуем "тень"
    ctx.fillStyle = MODAL_SHADOW_COLOR;
    ctx.fillRect(MODAL_X + MODAL_SHADDOW_OFFSET_X, MODAL_Y + MODAL_SHADDOW_OFFSET_Y, MODAL_WIDTH, MODAL_HEIGHT);
    // Рисуем модалку
    ctx.fillStyle = MODAL_COLOR;
    ctx.fillRect(MODAL_X, MODAL_Y, MODAL_WIDTH, MODAL_HEIGHT);
}

/**
 *
 * @description Рисует текстовку шапки.
 * @param {HTMLCanvasElement} ctx - 2D канвас КОНТЕКСТ, на котором рисуется игра.
 * @param {String[]} headItems - строки шапки.
 */
function drawTitle(ctx, headItems) {
  var rowY = TEXT_Y;

  ctx.font = TEXT_SIZE + ' ' + TEXT_FAMILY;
  ctx.fillStyle = TEXT_COLOR;
  ctx.textBaseline = 'top';
  // рисуем текст
  for (var i = 0, headItemsLength = headItems.length; i < headItemsLength; i++) {
      ctx.fillText(headItems[i], TEXT_X, rowY);
      rowY += parseInt(TEXT_SIZE, 10);
  };
}

/**
 *
 * @description Рисует график результатов участников.
 * @param {HTMLCanvasElement} ctx - 2D канвас КОНТЕКСТ, на котором рисуется игра.
 * @param {String[]} names - массив имён игроков.
 * @param {Number[]} times - массив миллисекунд, затраченных на прохождение игры.
 */
function drawStats(ctx, names, times) {
  var chartBarMaxHeight = STATS_HEIGHT;
  var chartBarsWidth = ((MODAL_WIDTH - MODAL_PADDING * 2 ) / names.length) - STATS_BARS_MARGIN_SIDES * 2;

  var maxPlayersTime = Math.round(Math.max.apply(undefined, times));
  var barsY = MODAL_Y + MODAL_HEIGHT - MODAL_PADDING;

  names.forEach(function (name, playerIdx) {
      var currentPlayerTime = Math.round(times[playerIdx]);
      // Находим через пропорцию высоту столбца текущего игрока в зависимости от его времени, максимального времени, и максимальной высоты столбца.
      var currentBarHeight = (chartBarMaxHeight * (currentPlayerTime * 100 / maxPlayersTime)) / 100;
      // Находим Х координату текущего столбца на основе порядкового номера игрока, отступов между графиками и шириной столбцов
      var currentBarX = (MODAL_X + MODAL_PADDING) + (playerIdx*(chartBarsWidth + STATS_BARS_MARGIN_SIDES * 2));
      var currentBarColor = 'hsl(' + (playerIdx * 50) + ', 50%, 50%)'
      drawStatItem(ctx, currentBarX, barsY, chartBarsWidth, currentBarHeight, currentBarColor, name, currentPlayerTime);
  });
}

/**
 *
 *
 * @param {HTMLCanvasElement} ctx - 2D канвас КОНТЕКСТ, на котором рисуется игра.
 * @param {Number} x - X координата элемента графика.
 * @param {Number} y - Y координата элемента графика.
 * @param {Number} width - Ширина элемента графика.
 * @param {Number} height - Высота элемента графика.
 * @param {String} color - Заливка элемента графика.
 * @param {String} name - Имя игрока.
 * @param {Numebr} timeResult - результат игрока в милисекундах.
 */
function drawStatItem(ctx, x, y, width, height, color, name, timeResult){
  // Сначала нарисуем имя и результат игрока.
  ctx.fillStyle = TEXT_COLOR;
  ctx.textBaseline = 'bottom';
  ctx.fillText(name, x, y);
  ctx.fillText(timeResult, x, y - parseInt(TEXT_SIZE) - STATS_TEXT_MARGIN_TOP * 2 - height);
  // А теперь столбец графика игрока.
  ctx.fillStyle = color;
  ctx.fillRect(x, y - parseInt(TEXT_SIZE) - STATS_TEXT_MARGIN_TOP - height, width, height);
}
