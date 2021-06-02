import React from "react";
import "../card-list/card-list.styles.css";
import ErrorModal from "../Modal/ErrorModal";
import moment from "moment";
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
            alt="Image not accessible"
            src={
              this.props.element.article.media.main_image
                ? this.props.element.article.media.main_image
                : "https://images.unsplash.com/photo-1603060541887-c1a0d703e3a9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
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
          <p className="card-date">
            {moment.utc(this.props.element.article.published).format("LLLL")}
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
