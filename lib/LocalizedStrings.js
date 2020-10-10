'use strict';
/**
 * Simple module to localize the React interface using the same syntax
 * used in the ReactNativeLocalization module
 * (https://github.com/stefalda/ReactNativeLocalization)
 *
 * Originally developed by Stefano Falda (stefano.falda@gmail.com)
 *
 * It uses a call to the Navigator/Browser object to get the current interface language,
 * then display the correct language strings or the default language (the first
 * one if a match is not found).
 *
 * This library has been refactored to use the newly created localized-strings package so to
 * unify the code and make it easier to mantain
 *
 * How to use:
 * Check the instructions at:
 * https://github.com/stefalda/react-localization
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _localizedStrings = _interopRequireDefault(require("localized-strings"));

var _this = void 0;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var placeholderRegex = /(\{[\d|\w]+\})/;
/**
 * Format the passed string replacing the numbered or tokenized placeholders
 * eg. 1: I'd like some {0} and {1}, or just {0}
 * eg. 2: I'd like some {bread} and {butter}, or just {bread}
 * Use example:
 * eg. 1: strings.formatString(strings.question, strings.bread, strings.butter)
 * eg. 2: strings.formatString(strings.question, { bread: strings.bread, butter: strings.butter }
 *
 * THIS METHOD OVERRIDE the one of the parent class by adding support for JSX code
*/

_localizedStrings["default"].prototype.formatString = function (str) {
  for (var _len = arguments.length, valuesForPlaceholders = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    valuesForPlaceholders[_key - 1] = arguments[_key];
  }

  var hasObject = false;
  var input = str || "";

  if (typeof input === "string") {
    input = this.getString(str, null, true) || input;
  }

  var res = input.split(placeholderRegex).filter(function (textPart) {
    return !!textPart;
  }).map(function (textPart, index) {
    if (textPart.match(placeholderRegex)) {
      var matchedKey = textPart.slice(1, -1);
      var valueForPlaceholder = valuesForPlaceholders[matchedKey]; // If no value found, check if working with an object instead

      if (valueForPlaceholder == undefined) {
        var valueFromObjectPlaceholder = valuesForPlaceholders[0][matchedKey];

        if (valueFromObjectPlaceholder !== undefined) {
          valueForPlaceholder = valueFromObjectPlaceholder;
        } else {
          // If value still isn't found, then it must have been undefined/null
          return valueForPlaceholder;
        }
      }

      if ( /*#__PURE__*/_react["default"].isValidElement(valueForPlaceholder)) {
        hasObject = true;
        return _react["default"].Children.toArray(valueForPlaceholder).map(function (component) {
          return _objectSpread(_objectSpread({}, component), {}, {
            key: index.toString()
          });
        });
      }

      return valueForPlaceholder;
    }

    return textPart;
  }); // If the results contains a object return an array otherwise return a string

  if (hasObject) return res;
  return res.join('');
};

var _default = _localizedStrings["default"];
exports["default"] = _default;