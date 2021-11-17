import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general'
    };
    static propTypes={
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    };
    capitalize = (string)=>{
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    constructor(props)
    {
        super(props);
        this.state = {
            articles:[],
            loading: true,
            page: 1,
            totalResults: 0
        };
        document.title = `${this.capitalize(this.props.category)} - Daily News`;
    }
    async updateNews(){
       this.props.setProgress(10);
       const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=
       ${this.props.pageSize}`;
       this.setState({loading:true});
        let data = await fetch(url);
        this.props.setProgress(40);
        let parsedData = await data.json();
        this.props.setProgress(70);
        this.setState({articles:parsedData.articles ,
             totalResults: parsedData.totalResults,
             loading:false });
        this.props.setProgress(100);
    }
    async componentDidMount()
   {
       /* console.log("Running")
       let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=
       ${this.props.pageSize}`;
       this.setState({loading:true});
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({articles:parsedData.articles ,
             totalResults: parsedData.totalResults,
             loading:false }); */
             this.updateNews();
    }
    handleNextClick = async ()=>{
        /* if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)))
        {
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({loading:true});
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({
            page: this.state.page + 1,
            articles: parsedData.articles,
            loading: false
        })
        } */ 
        this.setState({page: this.state.page + 1});
        this.updateNews(); 
    }

    handlePreviousClick = async ()=>{
        /* let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading: false
        }) */ 
        this.setState({page: this.state.page - 1});
        this.updateNews();
    }
    fetchMoreData = async () => {
        
          this.setState({
            page: this.state.page +1
          });
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({articles:this.state.articles.concat(parsedData.articles) ,
             totalResults: parsedData.totalResults,
             });
      };
    render() {
        return (
            <>
                <h1 className="text-center">Daily News top {this.capitalize(this.props.category)} headlines</h1>
                {this.state.loading && <Spinner />}
                <InfiniteScroll
                dataLength={this.state.articles.length}
                next={this.fetchMoreData}
                hasMore={this.state.articles.length!==this.state.totalResults}
                loader={<Spinner/>}
                >
                <div className="container">
                <div className="row">
                {this.state.articles.map((element)=>{
                   return <div className="col-md-4" key={element.url}>
                   <NewsItem  title={element.title} description={element.description} 
                   imageurl={element.urlToImage} 
                   newsurl={element.url} author={element.author} date={element.publishedAt}/>
                   </div> 
                })}
                </div>
                </div>
                </InfiniteScroll>
                {/* <div className="container d-flex justify-content-between">
                <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
                <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div> */}
                </>
        )
    }
}

export default News
