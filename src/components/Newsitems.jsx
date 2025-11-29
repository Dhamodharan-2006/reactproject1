import React, { Component } from 'react'

export default class Newsitems extends Component {
  render() {
    let {title,description,image,linkurl,author,date,source}=this.props;
    return (
      <div>
        <div className="container mt-4">
          <div className="card">
            <img src={image} alt="not found" className='card-img-top' />

            <div className="card-body">
              <span
              className='badge rounded-pill bg-danger text-light'
              style={{
                display:'flex',
                justifyContent:'flex-end',
                position:'absolute',
                right:'0px',
                top:'0px',
              }}
              >{source}</span>
<h5 className='card-title text-success'>{title?title.split("").slice(0,50).join(""):"no-title"}...</h5>
<p className='card-text'>{description?description.split("").slice(0,200).join(""):"no descripton"}</p>
<p>By :{author?author:"Anonymous"}</p>
<hr/>
<p>Published At:{date}</p>
<a href={linkurl} className='btn btn-danger'>Read more</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}