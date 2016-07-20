'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _reactNative2 = _interopRequireDefault(_reactNative);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var ScrollingMenu = function (_Component) {
  _inherits(ScrollingMenu, _Component);

  function ScrollingMenu(props) {
    _classCallCheck(this, ScrollingMenu);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ScrollingMenu).call(this, props));

    _this.state = {
      selected: 0,
      widths: new Array(props.items.length),
      contentWidth: 0
    };
    return _this;
  }

  _createClass(ScrollingMenu, [{
    key: 'scroll',
    value: function scroll(itemNum) {
      var widthInFront = 0,
          currentItemWidth = this.state.widths[itemNum],
          screenWidth = _reactNative.Dimensions.get('window').width,
          contentWidth = this.state.contentWidth,
          self = this;

      for (var i = 0; i <= itemNum; i++) {
        if (i < itemNum) widthInFront += this.state.widths[i] + this.props.itemSpacing;
      }

      setTimeout(function () {
        window.requestAnimationFrame(function () {
          var x = widthInFront + self.props.itemSpacing - (screenWidth / 2 - currentItemWidth / 2);
          if (x < 0) {
            x = 0;
          } else if (x > contentWidth - screenWidth) {
            x = contentWidth - screenWidth;
          }
          if (self.props.noSetState) {
            if (self.props.noSetState.indexOf(self.props.items[itemNum]) === -1) {
              self.refs.scrollView.scrollTo({ x: x });
              self.setState({ selected: itemNum });
            }
          } else {
            self.refs.scrollView.scrollTo({ x: x });
            self.setState({ selected: itemNum });
          }
        });
      }, 500);

      this.props.callback(itemNum);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var styles = _reactNative.StyleSheet.create({
        scrollBar: {
          backgroundColor: this.props.backgroundColor,
          paddingBottom: 10,
          paddingTop: 8
        },
        scrollBarItem: {
          color: this.props.textColor,
          marginRight: this.props.itemSpacing
        },
        scrollBarFirstItem: {
          marginLeft: this.props.itemSpacing
        },
        scrollBarSelectedItem: {
          color: this.props.selectedTextColor
        }
      });

      var items = [];

      var _loop = function _loop(i) {
        items.push(_react2.default.createElement(_reactNative.TouchableOpacity, {
          key: i,
          style: styles.button,
          onPress: function onPress() {
            _this2.scroll(i);
          }
        }, _react2.default.createElement(_reactNative.Text, { style: [i === 0 ? styles.scrollBarFirstItem : null, styles.scrollBarItem, _this2.state.selected === i ? styles.scrollBarSelectedItem : null],
          onLayout: function onLayout(object) {
            var width = object.nativeEvent.layout.width;

            var newState = _this2.state;
            newState.widths[i] = width;
            _this2.setState(newState);
          }
        }, _this2.props.items[i])));
      };

      for (var i = 0; i <= this.props.items.length; i++) {
        _loop(i);
      }

      return _react2.default.createElement(_reactNative.ScrollView, {
        ref: 'scrollView',
        style: styles.scrollBar,
        horizontal: true,
        onContentSizeChange: function onContentSizeChange(contentWidth, contentHeight) {
          _this2.setState({ contentWidth: contentWidth });
        }
      }, items);
    }
  }]);

  return ScrollingMenu;
}(_react.Component);

ScrollingMenu.propTypes = {
  items: _react2.default.PropTypes.array.isRequired,
  callback: _react2.default.PropTypes.func.isRequired,
  backgroundColor: _react2.default.PropTypes.string,
  textColor: _react2.default.PropTypes.string,
  selectedTextColor: _react2.default.PropTypes.string,
  itemSpacing: _react2.default.PropTypes.number
};

ScrollingMenu.defaultProps = {
  backgroundColor: "#ffffff",
  textColor: "#cccccc",
  selectedTextColor: "#000000",
  itemSpacing: 20
};

module.exports = ScrollingMenu;
