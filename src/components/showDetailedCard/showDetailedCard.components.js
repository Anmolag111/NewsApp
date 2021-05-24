import React, { Component } from "react";
import "./showDetailedCard.styles.css";
import image from "../../images/image.jpg";
export class ShowDetailedCard extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    window.scrollTo(0, 0);
  }
  targetComponent = () => {
    this.props.closeComponent();
  };
  render() {
    let date = new Date(this.props.childData.article.published);

    return (
      <div className="cardDetails">
        <button className="cardDetails-button" onClick={this.targetComponent}>
          <i className="fa fa-arrow-left icon"></i>Back
        </button>
        <button className=" cardDetails-button cardDetails-viewmore">
          <a
            className="atag"
            href={this.props.childData.article.url}
            target="_blank"
            rel="noreferrer"
          >
            View More
          </a>
        </button>
        <img
          className="cardDetails-img"
          alt={this.props.childData.article.title.substr(0, 10)}
          src={
            this.props.childData.article.media.main_image
              ? this.props.childData.article.media.main_image
              : "https://images.unsplash.com/photo-1603060541887-c1a0d703e3a9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
          }
          align="left"
        />
        <h1 className="cardDetails-title">
          {this.props.childData.article.title}
        </h1>

        <p className="cardDetails-author">
          <b>Author : </b>
          {this.props.childData.article.author}
        </p>
        <p className="cardDetails-date">
          <b> Date : </b>
          {date.getDate() +
            "-" +
            (date.getMonth() + 1) +
            "-" +
            date.getFullYear()}
        </p>

        <p className="cardDetails-text"> {this.props.childData.article.text}</p>
      </div>
    );
  }
}

// export const ShowDetailedCard = (props) => {
//   targetComponent = () => {
//     props.closeComponent();
//   };
//   return (
//     <div>
//       <button onClick={this.targetComponent}>Back</button>
//       <img src={props.childData.article.media.main_image} />
//       <h1>{props.childData.article.title}</h1>
//       <h1>{props.childData.article.author}</h1>
//       <h5>{props.childData.article.text}</h5>
//       <a href={props.childData.article.url}>View More</a>
//     </div>
//   );
// };
