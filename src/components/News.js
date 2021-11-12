import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
    
    constructor()
    {
        super();
        this.state = {
            articles:[],
            loading: false,
            page: 1
        };
    }
    async componentDidMount()
   {
       let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=21e4fb76493a4f32b87646195b14404f&page=1&pageSize=20";
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({articles:parsedData.articles , totalResults:parsedData.totalResults });
    }
    handleNextClick = async ()=>{
        if(this.state.page + 1 > Math.ceil(this.state.totalResults/20))
        {

        }
        else{
            let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=21e4fb76493a4f32b87646195b14404f&page=${this.state.page + 1}&pageSize=20`;
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({
            page: this.state.page + 1,
            articles: parsedData.articles
        })
        }
    }

    handlePreviousClick = async ()=>{
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=21e4fb76493a4f32b87646195b14404f&page=${this.state.page - 1}&pageSize=20`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles
        })
    }
    render() {
        return (
            <div className="container my-3">
                <h2>Daily News top headlines</h2>
                <div className="row">
                {this.state.articles.map((element)=>{
                   return <div className="col-md-4" key={element.url}>
                   <NewsItem  title={element.title} description={element.description} 
                   imageurl={element.urlToImage} 
                   newsurl={element.url}/>
                   </div> 
                })}
                </div>
                <div className="container d-flex justify-content-between">
                <button disabled={this.state.page<=1} type="button" class="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
                <button type="button" class="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News
