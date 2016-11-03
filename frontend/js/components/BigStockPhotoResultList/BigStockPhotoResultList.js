import React from 'react';
import { GridList} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import BigStockPhotoSingleResult from '../BigStockPhotoSingleResult/BigStockPhotoSingleResult'
const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 500,
    height: 450,
    overflowY: 'auto',
  },
};

const tilesData = [
  {
    img: 'images/grid-list/00-52-29-429_640.jpg',
    title: 'Breakfast',
    author: 'jill111',
  }]
/**
 * A simple example of a scrollable `GridList` containing a [Subheader](/#/components/subheader).
 */
const BigStockPhotoResultList = (props) => (
    <div style={styles.root}>
      <Subheader>{props.searchTerm}</Subheader>
      <GridList
        cellHeight={180}
        style={styles.gridList}
      >
        {props.results.map((result,index) => (
          <BigStockPhotoSingleResult
            key={index}
            image={result.small_thumb.url}
          />

        ))}
      </GridList>
    </div>
  );

export default BigStockPhotoResultList;
