import React, {useState, useEffect} from 'react';
import {
  Pressable,
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const itemPaddingVertical = 30;
const itemMargin = 0;

const TileBox = ({start, content, grid, lastTile, onPress}) => {
  console.log(start);
  return (
    <View style={styles.container}>
      {content.map((item, index) => {
        return lastTile !== item ? (
          <TouchableOpacity
            key={index}
            onPress={() => {
              start ? onPress(index) : alert('start first!');
            }}>
            <View
              style={[
                styles.item,
                {
                  width: deviceWidth / grid,
                },
              ]}>
              <Text style={styles.textItem}>{item}</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <View
            style={[
              {
                width: deviceWidth / grid,
              },
            ]}></View>
        );
      })}
    </View>
  );
};

export default TileBox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  item: {
    borderColor: '#aaa',
    borderWidth: 0.7,
    paddingVertical: itemPaddingVertical,
    backgroundColor: '#462E8D',
    margin: itemMargin,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textItem: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});
