import React, { Component } from 'react'
import Newsitems from './Newsitems'
import propTypes from 'prop-types'
import Spinner from './Spinner'

export default class News extends Component {
  // articles= [
  //    {
    
  //      "id": "34d3ce66aab2749384abd6410beff323",
  //      "title": "Google just cut ties with Movies Anywhere",
  //      "description": "Things are getting ugly",
  //      "content": "It's not easy running a live TV streaming service, especially when you have to rely on other companies for content. Despite this, YouTube was able to navigate some hairy contracts over the past few months, but it didn't manage to close the deal with ... [2617 chars]",
  //      "url": "https://www.androidpolice.com/google-play-youtube-drop-movies-anywhere-support/",
  //      "image": "https://static0.anpoimages.com/wordpress/wp-content/uploads/wm/2025/11/untitled-design-1-2.png?w=1600&h=900&fit=crop",
  //      "publishedAt": "2025-11-05T23:16:40Z",
  //      "lang": "en",
  //      "source": {
  //        "id": "3855a489b685d9599a636250ed950d3c",
  //        "name": "Android Police",
  //        "url": "https://www.androidpolice.com",
  //        "country": "us"
  //      }
  //    },
  //    {
  //      "id": "b20269bb3e1b02d463ee9ff0d24e8178",
  //      "title": "T-Mobile's Black Friday preview has free Apple and Google phones - how to get yours",
  //      "description": "T-Mobile's Black Friday preview is offering some of our favorite phones for free. Here are the best freebies deals at T-Mobile this week.",
  //      "content": "T-Mobile is waiting till November 28 to release its official Black Friday deals. However, this week we're getting a quick preview of what's to come...",
  //      "url": "https://www.tomsguide.com/phones/t-mobiles-black-friday-preview-has-free-apple-and-google-phones-how-to-get-yours",
  //      "image": "https://cdn.mos.cms.futurecdn.net/HuSuuCUpXb4KrZPGgsVzy8-2000-80.jpg",
  //      "publishedAt": "2025-11-05T22:55:05Z",
  //      "lang": "en",
  //      "source": {
  //        "id": "dcc4f4c6eb081eb8a9ee9cca215517f5",
  //        "name": "Tom's Guide",
  //        "url": "https://www.tomsguide.com",
  //        "country": "us"
  //      }
  //    },
     
  //    {
  //      "id": "9a66d8635d091c0c2bdb5e314b6e49c6",
  //      "title": "Report reveals how much Apple will pay Google to use a custom Gemini AI model",
  //      "description": "Apple will reportedly pay Google a large sum to use a custom version of its Gemini LLM model while it works on its own.",
  //      "content": "The new and improved Siri digital assistant will be powered by Google's Gemini according to a new report from Mark Gurman at Bloomberg...",
  //      "url": "https://www.phonearena.com/news/report-reveals--apple-will-pay-google-to-use-custom-gemini-model_id175503",
  //      "image": "https://m-cdn.phonearena.com/images/article/175503-wide-two_1200/Report-reveals-how-much-Apple-will-pay-Google-to-use-a-custom-Gemini-AI-model.jpg",
  //      "publishedAt": "2025-11-05T22:31:22Z",
  //      "lang": "en",
  //      "source": {
  //        "id": "82dc94c51bef044035e3d16ef869c7a8",
  //        "name": "PhoneArena",
  //        "url": "https://www.phonearena.com",
  //        "country": "us"
  //      }
  //    }
  //  ]


static defaultProps={
  country:"us",
  pageSize:9,
  category:"sports"
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
      let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2815af94b293430da5f85dfea06f2069&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
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
      let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2815af94b293430da5f85dfea06f2069&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
      let data=await fetch(url)
      let parsedData=await data.json();

      this.setState({
        articles:parsedData.articles,
        page:this.state.page-1,
        loading:false
      });
}


constructor(props){
    super()
    console.log("I am a constructor")
    this.state={
    articles:[],
    loading:false,
    page:0,
    totalresult:0
    }}

    async componentDidMount(){
      let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2815af94b293430da5f85dfea06f2069&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
      {
        this.setState({
          loading:true
        })
      }
      let data=await fetch(url)
      let parsedData=await data.json();

      this.setState({
        articles:parsedData.articles,
        totalresult:parsedData.totalResults,
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