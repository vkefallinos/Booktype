import React from 'react';
import BigStockPhotoSearchForm from '../BigStockPhotoSearchForm/BigStockPhotoSearchForm';
import BigStockPhotoResultList from '../BigStockPhotoResultList/BigStockPhotoResultList';

import superagent from 'superagent';
import jsonp from 'superagent-jsonp';

export default class BigStockPhotoViewer extends React.Component {

    constructor() {
        super();
        this.state = {
            searchTerm: '',
            results: [],
            categories:[]
        };
    }
    componentWillMount(){
      superagent.get('http://api.bigstockphoto.com/2/458743/categories')
          .use(jsonp)
          .end((error, response) => {
             if (response) {
                //  console.log(response.body.data)
                 this.setState({ categories: response.body.data });
                //  console.log(this.state.categories)
             }
          });
    }
    handleSearch(searchTerm, category) {
      this.setState({ searchTerm });
        superagent.get('http://api.bigstockphoto.com/2/458743/search/')
            .query({
                illustrations: "y",
                q: searchTerm,
                category: category,
            })
            .use(jsonp)
            .end((error, response) => {
              // console.log(response)
               if (response) {
                //  console.log(response.body.data.images)
                   this.setState({ results: response.body.data.images });
               }
            });
    }

    render() {
        return(
            <div className="wrapper">
                <BigStockPhotoSearchForm categories={this.state.categories} onSearch={this.handleSearch.bind(this)}/>
                <BigStockPhotoResultList results={this.state.results} searchTerm={this.state.searchTerm}/>
            </div>
        );
    }
}
