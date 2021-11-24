import React,{useEffect,useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props)=> {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true) 
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    
    const capitalize = (string)=>{
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
       
    const updateNews = async ()=>{
       props.setProgress(10);
       const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=
       ${props.pageSize}`;
       setLoading(true);
        let data = await fetch(url);
        props.setProgress(40);
        let parsedData = await data.json();
        props.setProgress(70);
        setArticles(parsedData.articles);
        setLoading(false);
        setTotalResults(parsedData.totalResults);
        props.setProgress(100);
    }
    
    useEffect(() => {
        document.title = `${capitalize(props.category)} - Daily News`;
        updateNews();
        //eslint-disable-next-line
    }, [])
   
   // const handleNextClick = async ()=>{
        /* if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/props.pageSize)))
        {
            let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${this.state.page + 1}&pageSize=${props.pageSize}`;
            this.setState({loading:true});
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({
            page: this.state.page + 1,
            articles: parsedData.articles,
            loading: false
        })
        } */ 
      //  setPage(page+1);
      //  updateNews(); 
   // }

   // const handlePreviousClick = async ()=>{
        /* let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${this.state.page - 1}&pageSize=${props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading: false
        }) */ 
     //   setPage(page-1);
      //  updateNews();
   // }
    const fetchMoreData = async () => {
        
        
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page+1);
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles));
        
      }
    
        return (
            <div className="bg-dark">
                <h1 className="text-center" style={{marginTop:'50px' , color: 'white',fontSize:'60px',fontFamily:'revert',fontWeight:'bold'}}>Daily News top {capitalize(props.category)} headlines</h1>
                {loading && <Spinner/>}
                <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length!==totalResults}
                loader={<Spinner/>}
                >
                <div className="container">
                <div className="row">
                {articles.map((element)=>{
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
                <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div> */}
                </div>
        )
}

export default News

News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
};
News.propTypes={
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
};
