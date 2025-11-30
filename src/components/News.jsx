import React, { Component } from 'react'
import Newsitems from './Newsitems'
import propTypes from 'prop-types'
import Spinner from './Spinner'

export default class News extends Component {
  

static defaultProps={
  pageSize:9,
  
}

static propTypes={
  country:propTypes.string.isRequired,
  pageSize:propTypes.number.isRequired,
  category:propTypes.string.isRequired,
}
handlenext=async()=>{
       {
        this.setState({
          loading:true
        })
      }
      let url=`https://gnews.io/api/v4/search?q=Google&lang=en&apikey=af673669f6d58c73c14f1b697ec2c0f6
&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
      let data=await fetch(url)
      let parsedData=await data.json();

      this.setState({
        articles:parsedData.articles,
        page:this.state.page+1,
        loading:false
      });
}

handleprev=async()=>{
       {
        this.setState({
          loading:true
        })
      }
      let url=`https://gnews.io/api/v4/search?q=Google&lang=en&apikey=af673669f6d58c73c14f1b697ec2c0f6
&page=${this.state.page-1}&pageSize=${this.props.pageSize}`
      let data=await fetch(url)
      let parsedData=await data.json();

      this.setState({
        articles:parsedData.articles,
        page:this.state.page-1,
        loading:false
      });
}


constructor(props){
    super(props)
    console.log("I am a constructor")
    this.state={
    articles:[],
    loading:false,
    page:0,
    totalresult:0
    }}

    async componentDidMount(){
      let url=`https://gnews.io/api/v4/search?q=Google&lang=en&apikey=af673669f6d58c73c14f1b697ec2c0f6
&page=${this.state.page+1}&pageSize=${this.props.pageSize}`

      {
        this.setState({
          loading:true
        })
      }
      let data=await fetch(url)
      let parsedData=await data.json();

      this.setState({
        articles:parsedData.articles  || [],
        totalresult:parsedData.totalResults || 0,
        loading:false
      });
    }
  render() {
    return (
<>
<h1 className='text-center text-danger'>LIVE NEWS</h1>

{this.state.loading && <Spinner/>}
<div className="container ">
    <div className="row">
    {this.state.articles.map((element)=>{
        return(
            <div className="col-md-4" key={element.url}>
            <Newsitems
            title={element.title}
            description={element.description}
            image={element.urlToImage}
            linkurl={element.url}
            author={element.author}
            date={element.publishedAt}
            source={element.source.name}/>
                        </div>
        )
    })}
</div><hr />
<div className="d-grid gap-2 d-md-flex justify-content-md-end">
  <button className="btn btn-danger me-md-2" type="button" onClick={this.handleprev}>Prev </button>
  <button className="btn btn-danger me-md-2" type="button" onClick={this.handlenext}>Next </button>
</div>
<hr />

</div>



</>
    )
  }

}