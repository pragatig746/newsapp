import React from 'react'

const NewsItem = (props)=> {
        let {title,description,imageurl,newsurl,author,date}=props;
        return (
            <div className="my-4 rounded border border-5 border-warning">
            <div className="card" >
                <img src={imageurl} className="card-img-top" alt="not available"/>
                <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
                <a rel = "norefferer" href={newsurl} target="blank" className="btn btn-sm  btn-primary btn-danger">Read More</a>
                </div>
                </div>
            </div>
        )
}

export default NewsItem
