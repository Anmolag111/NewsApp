import React from "react";
import "../card-list/card-list.styles.css";
import ErrorModal from "../Modal/ErrorModal";

export class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = { openErrorModal: false };
    this.props = props;
  }
  openModal = () => {
    this.setState({ openErrorModal: true });
  };
  toggle = () => {
    this.setState((prevState) => {
      return { openErrorModal: !prevState.openErrorModal };
    });
  };
  onTrigger = (event) => {
    this.props.parentCallback(this.props.element);
    event.preventDefault();
  };
  render() {
    let jsx = this.state.openErrorModal ? (
      <ErrorModal
        openErrorModal={this.state.openErrorModal}
        toggle={this.toggle}
        element={this.props.element}
      />
    ) : (
      ""
    );
    return (
      <div className="grid-item">
        <div className="card">
          <div className="card-content"></div>
          <img
            className="card-img"
            src={
              this.props.element.article.media.main_image
                ? this.props.element.article.media.main_image
                : "https://images.unsplash.com/photo-1621348003857-e62390c077ac?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80"
            }
          />
          <h1 className="card-header">
            {this.props.element.article.title.substr(0, 55)}
            <span>....</span>
          </h1>
          <p className="card-text">
            {this.props.element.article.text.substr(0, 120)}
            <span>....</span>
          </p>
          <p className="cardDetails-date">
            <b> Date : </b>
            {new Date(this.props.element.article.published).getDate() +
              "-" +
              (new Date(this.props.element.article.published).getMonth() + 1) +
              "-" +
              new Date(this.props.element.article.published).getFullYear()}
          </p>
          <button className="card-btn " onClick={this.onTrigger}>
            Read More..<span>&rarr;</span>
          </button>
          {jsx}
        </div>
      </div>
    );
  }
}
