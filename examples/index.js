/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { storiesOf } from '@kadira/react-native-storybook';
import { View, Text, Dimensions, FlatList } from 'react-native';

const window = Dimensions.get('window');

const style = {
  justifyContent: 'center',
  alignItems: 'center',
  width: window.width,
  height: window.height,
};

const Card = props => (
  <View style={style}>
    {props.children}
  </View>
);

const longList = (new Array(100)).fill('').map((v, i) => `${i}`);

class ScrollToExample extends Component {
  componentDidMount() {
    this.list.scrollToIndex({ index: this.props.scrollToIndex || 0 });
  }

  getItemLayout = (data, index) => (
    { length: window.width, offset: window.width * index, index }
  );

  render() {
    return (
      <FlatList
        onScroll={(e) => { console.log('onScroll', e.nativeEvent); }}
        style={{ flex: 1 }}
        ref={(ref) => { this.list = ref; }}
        {...this.props}
        horizontal
        pagingEnabled
        keyExtractor={item => item}
        getItemLayout={this.getItemLayout}
        renderItem={({ item }) => (
          <Card><Text>{item}</Text></Card>
        )}
      />
    );
  }
}

storiesOf('Horizontal Paging')
  .add('One', () => (
    <ScrollToExample
      data={longList}
      scrollToIndex={50}
    />
  )).add('Two', () => (
    <ScrollToExample
      data={longList}
      scrollToIndex={50}
    />
  ))
  .add('Three', () => (
    <ScrollToExample
      data={longList}
      scrollToIndex={50}
    />
  ));
