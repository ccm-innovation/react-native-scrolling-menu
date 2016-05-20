'use strict'

let React = require('react-native')

let {
  Component,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} = React

class ScrollingMenu extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selected: 1,
      widths: new Array(props.items.length),
      contentWidth: 0
    }
  }

  scroll(itemNum) {
    let widthInFront = 0,
        currentItemWidth = this.state.widths[itemNum - 1],
        screenWidth = Dimensions.get('window').width,
        contentWidth = this.state.contentWidth,
        self = this

    for (let i = 1; i <= itemNum; i++) {
      if (i < itemNum) widthInFront += this.state.widths[i - 1] + this.props.itemSpacing
    }

    setTimeout(function(){
      window.requestAnimationFrame(
        () => {
          let x = (widthInFront + self.props.itemSpacing) - ( ( screenWidth / 2 ) - ( currentItemWidth / 2 ) )
          console.log(x + ' ' + (contentWidth - (currentItemWidth - self.props.itemSpacing)))
          if (x < 0) {
            x = 0
          } else if (x > (contentWidth - screenWidth)) {
            x = contentWidth - screenWidth
          }
          self.refs.scrollView.scrollTo({x})
          self.setState({selected: itemNum})
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
    for (let i = 1; i <= this.props.items.length; i++) {
      items.push(
        <TouchableOpacity
          key={i}
          style={styles.button}
          onPress={() => { this.scroll(i) }}
        >
          <Text style={[i == 1 ? styles.scrollBarFirstItem : null, styles.scrollBarItem, this.state.selected == i ? styles.scrollBarSelectedItem : null]}
                onLayout={(object) => {
                  let {width} = object.nativeEvent.layout
                  let newState = this.state
                  newState.widths[i - 1] = width
                  this.setState(newState)
                }}
          >
            {this.props.items[i-1]}
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
