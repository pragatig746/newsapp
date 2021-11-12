import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let {title,description,imageurl,newsurl}=this.props;
        return (
            <div className="my-3">
            <div className="card" style={{width: "18rem;"}}>
                <img src={imageurl} className="card-img-top" alt="not available"/>
                <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <a rel = "norefferer" href={newsurl} target="blank" className="btn btn-sm btn-dark btn-primary">Read More</a>
                </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
