# React Native Scrolling Menu
> A horizontal scrolling menu for React Native.

![Screenshot](https://drive.google.com/uc?export=view&id=0BwAfqxmTWrImakRNWTBZZklBNmc)

## Installation
`npm install --save react-native-scrolling-menu`

## React Native
```JavaScript
var ScrollingMenu = require('react-native-scrolling-menu');
```

## Usage
```JavaScript
let items = ['Menu Item 1','Menu Item 2','Menu Item 3','Menu Item 4','Menu Item 5'];

onClick(itemIndex) {
  console.log("Selected: " + items[itemNum]);
}

render() {
  return (
    <ScrollingMenu
      items={items}
      callback={this.onClick.bind(this)}
      backgroundColor="#ffffff"
      textColor="#cccccc"
      selectedTextColor="#000000"
      itemSpacing={20} />
  );
}
```

## Props
|Key |Type |Description |
|--- |--- |--- |
|`items`|Array|An array of items for the menu|
|`callback`|Function(itemIndex)|The callback function sends the index of the menu item selected|
|`backgroundColor`|String (HEX)|The background color of the menu|
|`textColor`|String (HEX)|The text color prior to being selected|
|`selectedTextColor`|String (HEX)|The text color of the selected item|
|`itemSpacing`|Number|The number of pixels between the menu items|
