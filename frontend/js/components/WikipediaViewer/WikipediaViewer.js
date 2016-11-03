import React from 'react';
import WikipediaSearchForm from '../WikipediaSearchForm/WikipediaSearchForm';
import WikipediaResultList from '../WikipediaResultList/WikipediaResultList';

import superagent from 'superagent';
import jsonp from 'superagent-jsonp';

export default class WikipediaViewer extends React.Component {

    constructor() {
        super();
        this.state = {
            results: [
                '', [], [], []
            ]
        };
    }

    handleSearch(searchTerm) {
        superagent.get('https://en.wikipedia.org/w/api.php')
            .query({
                search: searchTerm,
                action: 'opensearch',
                format: 'json'
            })
            .use(jsonp)
            .end((error, response) => {
               if (error) {
                   console.error(error);
               } else {
                   this.setState({ results: response.body });
               }
            });
    }

    render() {
        return(
            <div className="wrapper">
                <WikipediaSearchForm onSearch={this.handleSearch.bind(this)}/>
                <WikipediaResultList results={this.state.results}/>
            </div>
        );
    }
}
