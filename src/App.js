import "./App.css";
import "./loader.css";
import React, { Component } from "react";
import { SearchBox } from "./components/search-box/search-box.component";
import { CardList } from "./components/card-list/card-list.component";
import InfiniteScroll from "react-infinite-scroll-component";
import { ShowDetailedCard } from "./components/showDetailedCard/showDetailedCard.components";
import { CircleArrow as ScrollUpButton } from "react-scroll-up-button";
import moment from "moment";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      searchField: "",
      loading: true,
      showComponent: false,
      showMainComponent: true,
      childData: {},
      count: 0,
      totalResults: 0,
      moreResults: 0,
      next: "",
      endloading: false,
      error: false,
      date: "",
    };
  }
  fetchData = () => {
    console.log("search field is", this.state.searchField);
    let text = this.state.searchField;
    console.log("count is :", this.state.count);
    let date = this.state.date == "" ? Date.now() : this.state.date;
    // console.log(
    //   "state is ",
    //   this.state.next,
    //   " " + date + " " + this.state.searchField + " " + text + this.state.date
    // );

    //https://github.com/Ankit7982993072/firstapp/blob/master/src/loader.js
    var defdate = new Date(date).toISOString();
    console.log("defdate", defdate);
    var defd = new Date(moment.utc(defdate).format("YYYY-MM-DD")).valueOf();
    console.log("defd", defd);
    console.log("moment(defd).valueOf()", moment(defd).valueOf());
    //
    let url = `https://webhose.io/nseFilter?token=2ff49d93-4587-4c4d-aca4-57459b878314&size=10&from=${this.state.count}&q=${text} article.published:>${defd}`;
    fetch(url, { cache: "no-store" })
      .then((response) => response.json())
      .then((data) => {
        console.log(data, " ", url);
        if (data.docs.length == 0) {
          this.setState({
            error: true,
            showComponent: false,
            showMainComponent: false,
            loading: false,
          });
        } else {
          this.setState({
            data: data.docs,
            loading: false,
            moreResults: data.moreResultsAvailable,
            totalResults: data.totalResults,
            next: data.next,
            count: this.state.count + 10,
          });
        }
      })
      .catch((err) => console.log("Error is ", err));
  };
  fetchNextResults = () => {
    this.setState({ endloading: true, searchFieldDisable: true });
    let text = this.state.searchField;
    let date = this.state.date == "" ? Date.now() : this.state.date;
    var defdate = new Date(date).toISOString();
    console.log("defdate", defdate);
    var defd = new Date(moment.utc(defdate).format("YYYY-MM-DD")).valueOf();
    console.log("defd", defd);
    console.log("moment(defd).valueOf()", moment(defd).valueOf());
    const options = {
      next: this.state.next,
    };
    let url = `https://webhose.io/nseFilter?token=c07c2a75-8e3e-4a14-836e-0f9c533fee48&size=10&from=${this.state.count}&q=${text}`;
    fetch(url, options, { cache: "no-store" })
      .then((response) => response.json())
      .then((data) => {
        if (data.docs.length === 0) {
          this.setState({
            error: true,
            showComponent: false,
            showMainComponent: false,
          });
        } else {
          let arr = this.state.data.concat(data.docs);

          console.log(data.next + " " + data.docs, arr);
          this.setState({
            data: arr,
            endloading: false,
            next: data.next,
            moreResults: data.moreResultsAvailable,
            totalResults: data.totalResults,
            count: this.state.count + 10,
          });
        }
      })
      .catch((err) => console.log("Error is ", err));
  };
  componentDidMount() {
    this.fetchData();
  }
  handleSubmit = async () => {
    //let text = this.state.searchField;

    await this.setState({
      loading: true,
      count: 0,
      error: false,
      showComponent: false,
      showMainComponent: true,
      next: "",
      totalResults: 0,
      moreResults: 0,
      data: [],
      endloading: false,
    });
    this.fetchData();
  };
  handleChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value, error: false });
    console.log(this.state);
  };
  showLoading = () => {
    return (
      <div className="loader">
        <h1>Loading...</h1>
      </div>
    );
  };
  handleCallback = (childData) => {
    this.setState({
      showComponent: true,
      showMainComponent: false,
      childData: childData,
    });
  };
  handleRouteClick = async (e) => {
    e.preventDefault();
    console.log("e.target.name is", e.target.name);
    await this.setState({
      searchField: e.target.name,
    });
    this.setState({
      data: [],
      loading: true,
      endloading: false,
      count: 0,
      error: false,
      showComponent: false,
      showMainComponent: true,
      next: "",
      totalResults: 0,
      moreResults: 0,
    });
    this.fetchData();
  };
  closeComponent = () => {
    this.setState({
      showComponent: false,
      showMainComponent: true,
    });
  };

  render() {
    return (
      <div className="App">
        {
          <SearchBox
            placeholder="Search news here..."
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            handleRouteClick={this.handleRouteClick}
          />
        }
        {this.state.error && (
          <div>
            <h1>No results found.....</h1>
          </div>
        )}
        {this.state.showComponent && (
          <ShowDetailedCard
            childData={this.state.childData}
            closeComponent={this.closeComponent}
          />
        )}
        {this.state.loading && this.showLoading()}
        {this.state.showMainComponent && (
          <InfiniteScroll
            className="scrollBar"
            dataLength={this.state.data.length}
            next={this.fetchNextResults}
            hasMore={this.state.moreResults > 0}
          >
            <CardList
              data={this.state.data}
              parentCallback={this.handleCallback}
            />
          </InfiniteScroll>
        )}
        <ScrollUpButton />
        {this.state.showMainComponent &&
          this.state.endloading &&
          this.showLoading()}
      </div>
    );
  }
}

export default App;
