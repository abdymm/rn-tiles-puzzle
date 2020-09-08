import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, Button, TextInput, LogBox} from 'react-native';
import styles from './style';
import {TileBox} from '../../components';

//redux
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {init, shuffle, move} from '../../stores/actions/tiles';

let GRID = 0;
let LAST_TILE = 0;
export default function Home() {
  const [play, setPlay] = useState(false);
  const [grid, setGrid] = useState(0);
  const {tiles} = useSelector(
    (state) => ({
      tiles: state.tiles,
    }),
    shallowEqual,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    LogBox.ignoreAllLogs();
  }, []);
  useEffect(() => {
    const {finish} = tiles;
    if (finish) {
      setPlay(false);
      setGrid(2);
      alert('Horay!'); //FINISH the game
    }
  }, [tiles]);

  const onSubmitGrid = () => {
    GRID = grid;
    LAST_TILE = GRID * GRID;
    setPlay(true);
    dispatch(init(GRID));
  };
  const onPressTile = (row, column) => {
    dispatch(move(row, column));
  };

  const onStartPuzzle = () => {
    dispatch(shuffle());
  };

  const onReStartPuzzle = () => {
    setGrid(0);
    setPlay(false);
  };

  const renderItem = ({item, index}) => {
    const row = index;

    return (
      <TileBox
        start={tiles.start}
        key={item}
        content={item}
        grid={GRID}
        lastTile={LAST_TILE}
        onPress={(column) => {
          onPressTile(row, column);
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BillowSoftware Puzzle Challenge</Text>
      {!play ? (
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => setGrid(text)}
          onSubmitEditing={() => onSubmitGrid()}
          value={grid}
          placeholder={'Enter Grid'}
        />
      ) : (
        <>
          <FlatList
            data={tiles.tiles}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
          />
          <Button
            onPress={tiles.start ? onReStartPuzzle : onStartPuzzle}
            title={tiles.start ? 'Surender! Restart!' : 'Start'}
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
        </>
      )}
    </View>
  );
}
