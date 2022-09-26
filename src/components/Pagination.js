import React from "react";
import "./Pagination.css";

const Pagination = (props) => {
  const pages = [];

  for (let i = 1; i <= props.pages; i++) {
    let active = props.currentPage === i ? "selected" : "";

    pages.push(
      <li
        className={`pages ${active}`}
        key={i}
        onClick={() => {
          props.nextPage(i);
        }}
      >
        {i}
      </li>
    );
  }

  return (
    <div className="container">
      <ul className="pages">
        {props.currentPage > 1 ? (
          <li
            className={`pages`}
            onClick={() => {
              props.nextPage(props.currentPage - 1);
            }}
          >
            prev{" "}
          </li>
        ) : (
          ""
        )}
        {pages.length <= 7
          ? pages
          : [
              pages[props.currentPage - 1 - 3],
              pages[props.currentPage - 1 - 2],
              pages[props.currentPage - 1 - 1],
              pages[props.currentPage - 1],
              pages[props.currentPage - 1 + 1],
              pages[props.currentPage - 1 + 2],
              pages[props.currentPage - 1 + 3],
            ]}
        {props.currentPage < props.pages ? (
          <li
            className={`pages`}
            onClick={() => {
              props.nextPage(props.currentPage + 1);
            }}
          >
            next{" "}
          </li>
        ) : (
          ""
        )}
      </ul>
    </div>
  )
};

export default Pagination;
