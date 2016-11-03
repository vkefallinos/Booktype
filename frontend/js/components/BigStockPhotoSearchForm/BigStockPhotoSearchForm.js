import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import ImagePhotoCamera from 'material-ui/svg-icons/image/photo-camera';
import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField'
export default class BigStockPhotoSearchForm extends React.Component {

    constructor() {
        super();
        this.state = {
          searchTerm: '',
          categories: [],
          category: ''
        };
    }
    handleCategoryChange(event, index, value){
      // console.log(value)
      this.setState({
          category: value
      });
    }
    handleInputChange(event) {
        this.setState({
            searchTerm: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        let searchTerm = this.state.searchTerm.trim(); // Remove whitespace at the beginning and end.
        let category = this.state.category
        if (!searchTerm && !category) { // If no search term was typed, return early and do nothing.
            return;
        }

        this.props.onSearch(searchTerm); // Execute callback
        // this.setState({ searchTerm: '' });
    }

    render() {
      // console.log(this.props)
        return (
            <div className="search-box-container" >
                <form onSubmit={this.handleSubmit.bind(this)}>
                  <TextField
                    className="search-box-text"
                    hintText="Hint Text"
                    floatingLabelText="Big Stock Photo Search"
                    floatingLabelFixed={true}
                    onChange={this.handleInputChange.bind(this)} value={this.state.searchTerm}
                  />
                  <SelectField
                    floatingLabelText="Category"
                    value={this.state.category}
                    onChange={this.handleCategoryChange.bind(this)}
                  >
                    {this.props.categories.map((category, index)=>{
                      return <MenuItem key={index} value={category.name} primaryText={category.name} />
                    })}
                  </SelectField>
                  <RaisedButton
                    label="Search"
                    labelPosition="before"
                    primary={true}
                    icon={<ImagePhotoCamera />}
                    type="submit"
                  />
                </form>
            </div>
        );
    }
}
