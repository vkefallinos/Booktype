import React from 'react';
import GridTile from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';



const BigStockPhotoSingleResult = (props) => {
  console.log(props)
  return (
        <GridTile
          title="image"
          actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
        >
          <img src={props.image} />
        </GridTile>
)};

export default BigStockPhotoSingleResult;
