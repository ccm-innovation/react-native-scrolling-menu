'use strict'

import React, {
  Component
} from 'react';

import ReactNative, {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

class ScrollingMenu extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      widths: new Array(props.items.length),
      contentWidth: 0
    }
  }

  scroll(itemNum) {
    let widthInFront = 0,
        currentItemWidth = this.state.widths[itemNum],
        screenWidth = Dimensions.get('window').width,
        contentWidth = this.state.contentWidth,
        self = this

    for (let i = 0; i <= itemNum; i++) {
      if (i < itemNum) widthInFront += this.state.widths[i] + this.props.itemSpacing
    }

    setTimeout(function(){
      window.requestAnimationFrame(
        () => {
          let x = (widthInFront + self.props.itemSpacing) - ( ( screenWidth / 2 ) - ( currentItemWidth / 2 ) )
          if (x < 0) {
            x = 0
          } else if (x > (contentWidth - screenWidth)) {
            x = contentWidth - screenWidth
          }
          if (self.props.noSetState) {
            if (self.props.noSetState.indexOf(self.props.items[itemNum]) === -1) {
              self.refs.scrollView.scrollTo({x})
              self.setState({selected: itemNum})
            }
          } else {
            self.refs.scrollView.scrollTo({x})
            self.setState({selected: itemNum})
          }
        }
      )
    },500)

    this.props.callback(itemNum)
  }

  render() {

    let styles = StyleSheet.create({
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
    })

    let items = []
    for (let i = 0; i <= this.props.items.length; i++) {
      items.push(
        <TouchableOpacity
          key={i}
          style={styles.button}
          onPress={() => { this.scroll(i) }}
        >
          <Text style={[i === 0 ? styles.scrollBarFirstItem : null, styles.scrollBarItem, this.state.selected === i ? styles.scrollBarSelectedItem : null]}
                onLayout={(object) => {
                  let {width} = object.nativeEvent.layout
                  let newState = this.state
                  newState.widths[i] = width
                  this.setState(newState)
                }}
          >
            {this.props.items[i]}
          </Text>
        </TouchableOpacity>
      )
    }

    return (
      <ScrollView
        ref='scrollView'
        style={styles.scrollBar}
        horizontal={true}
        onContentSizeChange={(contentWidth, contentHeight) => {
      		this.setState({contentWidth})
      	}}
      >
        {items}
      </ScrollView>
    )
  }
}

ScrollingMenu.propTypes = {
  items: React.PropTypes.array.isRequired,
  callback: React.PropTypes.func.isRequired,
  backgroundColor: React.PropTypes.string,
  textColor: React.PropTypes.string,
  selectedTextColor: React.PropTypes.string,
  itemSpacing: React.PropTypes.number
}

ScrollingMenu.defaultProps = {
  backgroundColor: "#ffffff",
  textColor: "#cccccc",
  selectedTextColor: "#000000",
  itemSpacing: 20
}

module.exports = ScrollingMenu
