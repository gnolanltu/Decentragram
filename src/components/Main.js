/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import Identicon from "identicon.js";
import { ipfs } from "./App";

class Main extends Component {
  constructor() {
    super();
    this.state = {};
  }

  async fetchImage(hash) {
    const result = ipfs.cat(hash);
    let content = [];
    for await (const chunk of result) {
      content = [...content, ...chunk];
    }

    //jpeg
    const src = `data:image;base64,${Buffer.from(content).toString("base64")}`;
    const newState = {
      ...this.state,
      [hash]: src,
    };
    this.setState(newState);
  }

  render() {
    return (
      <div className="container-fluid mt-5">
        <div className="row">
          <main
            role="main"
            className="col-lg-12 ml-auto mr-auto"
            style={{ maxWidth: "500px" }}
          >
            <div className="content mr-auto ml-auto">
              <p>&nbsp;</p>
              <h2>Share Image</h2>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  const description = this.imageDescription.value;
                  this.props.uploadImage(description);
                }}
              >
                <input
                  type="file"
                  accept=".jpg, .jpeg, .png, .bmp, .gif"
                  onChange={this.props.captureFile}
                />
                <div className="form-group mr-sm-2">
                  <br></br>
                  <input
                    id="imageDescription"
                    type="text"
                    ref={(input) => {
                      this.imageDescription = input;
                    }}
                    className="form-control"
                    placeholder="Image description..."
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-block btn-lg"
                >
                  Upload!
                </button>
              </form>
              <p>&nbsp;</p>
              {this.props.images &&
                this.props.images.map((image, key) => {
                  if (this.state[image.hash] === undefined)
                    this.fetchImage(image.hash);
                  return (
                    <div className="card mb-4" key={key}>
                      <div className="card-header">
                        <img
                          className="mr-2"
                          width="30"
                          height="30"
                          src={`data:image/png;base64,${new Identicon(
                            image.author,
                            30
                          ).toString()}`}
                        />
                        <small className="text-muted">{image.author}</small>
                      </div>
                      <ul
                        id="imageList"
                        className="list-group list-group-flush"
                      >
                        <li className="list-group-item">
                          <p className="text-center">
                            <img
                              src={this.state[image.hash]}
                              style={{ maxWidth: "420px" }}
                            />
                          </p>
                          <p>{image.description}</p>
                        </li>
                        <li key={key} className="list-group-item py-2">
                          <small className="float-left mt-1 text-muted">
                            TIPS:{" "}
                            {window.web3.utils.fromWei(
                              image.tipAmount.toString(),
                              "Ether"
                            )}{" "}
                            ETH
                          </small>
                          <button
                            className="btn btn-link btn-sm float-right pt-0"
                            name={image.id}
                            onClick={(event) => {
                              let tipAmount = window.web3.utils.toWei(
                                "0.1",
                                "Ether"
                              );
                              console.log(event.target.name, tipAmount);
                              this.props.tipImageOwner(
                                event.target.name,
                                tipAmount
                              );
                            }}
                          >
                            TIP 0.1 ETH
                          </button>
                        </li>
                      </ul>
                    </div>
                  );
                })}
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default Main;
