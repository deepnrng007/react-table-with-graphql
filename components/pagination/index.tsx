import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";

const Pagination = (props) => {
  const {
    pageChangeHandler,
    currentPageIndex,
    totalPageCount,
    rowsPerPage,
    gotoPage,
  } = props;
  // Calculating max number of pages
  const noOfPages = Math.ceil(200 / rowsPerPage);

  const [currentPage, setCurrentPage] = useState(0);
  // Onclick handlers for the butons
  const onNextPage = () => {
    setCurrentPage(currentPageIndex + 1);
    pageChangeHandler(currentPageIndex + 1);
  };
  const onPrevPage = () => {
    setCurrentPage(currentPageIndex - 1);
    pageChangeHandler(currentPageIndex - 1);
  };
  const onPageSelect = (pageNo: Number) => {
    setCurrentPage(pageNo);
    pageChangeHandler(pageNo);
  };

  // Disable previous and next buttons in the first and last page
  // respectively
  // useEffect(() => {
  //   if (noOfPages === currentPageIndex) {
  //     setCanGoNext(false);
  //   } else {
  //     setCanGoNext(true);
  //   }
  //   if (currentPageIndex === 1) {
  //     setCanGoBack(false);
  //   } else {
  //     setCanGoBack(true);
  //   }
  // }, [noOfPages, currentPageIndex]);

  return (
    <>
      {noOfPages > 1 ? (
        <div>
          <ul className="pagination">
            <button
              type="button"
              className="page-item"
              onClick={onPrevPage}
              disabled={currentPageIndex === 0 || totalPageCount === 0}
            >
              <div>{"<"}</div>
            </button>

            {currentPageIndex >= 4 && (
              <button
                type="button"
                className="page-item"
                onClick={() => onPageSelect(0)}
              >
                <div className="page-link-text">{1}</div>
              </button>
            )}
            {totalPageCount < 6 &&
              Array.from(Array(totalPageCount).keys()).map((x, i) => {
                return (
                  <button
                    type="button"
                    className={`page-item ${
                      currentPageIndex === i ? "active" : ""
                    }`}
                    onClick={() => {
                      onPageSelect(i);
                    }}
                  >
                    {x + 1}
                  </button>
                );
              })}

            {totalPageCount >= 6 &&
              currentPageIndex < 4 &&
              [1, 2, 3, 4].map((x, i) => (
                <button
                  type="button"
                  className={`page-item ${
                    currentPageIndex === i ? "active" : ""
                  }`}
                  onClick={() => {
                    onPageSelect(i);
                  }}
                >
                  {x}
                </button>
              ))}

            {totalPageCount >= 6 && currentPageIndex < 4 && (
              <li className="page-three-dots">
                <div>{". . ."}</div>
              </li>
            )}

            {totalPageCount >= 6 &&
              currentPageIndex >= 4 &&
              currentPageIndex <= totalPageCount - 3 && (
                <li className="page-three-dots">
                  <div>{". . ."}</div>
                </li>
              )}

            {totalPageCount >= 6 &&
              currentPageIndex >= 4 &&
              currentPageIndex <= totalPageCount - 3 && (
                <>
                  <button
                    type="button"
                    className={`page-item`}
                    onClick={() => {
                      onPageSelect(currentPageIndex - 1);
                    }}
                  >
                    {currentPageIndex - 1}
                  </button>

                  <button
                    type="reset"
                    className={`page-item active`}
                    onClick={() => onPageSelect(currentPageIndex)}
                  >
                    {currentPageIndex}
                  </button>

                  <button
                    type="button"
                    className={`page-item`}
                    onClick={() => {
                      onPageSelect(currentPageIndex + 1);
                    }}
                  >
                    {currentPageIndex + 1}
                  </button>
                </>
              )}

            {totalPageCount >= 6 &&
              currentPageIndex >= 4 &&
              currentPageIndex <= totalPageCount - 3 && (
                <li className="page-three-dots">
                  <div>{". . ."}</div>
                </li>
              )}

            {totalPageCount >= 6 && currentPageIndex > totalPageCount - 3 && (
              <li className="page-three-dots">
                <div>{". . ."}</div>
              </li>
            )}

            {totalPageCount >= 6 &&
              currentPageIndex > totalPageCount - 3 &&
              Array.from(Array(4).keys()).map((x, i) => (
                <button
                  type="button"
                  className={`page-item ${
                    currentPageIndex === totalPageCount - 4 + i ? "active" : ""
                  }`}
                  onClick={() => {
                    onPageSelect(totalPageCount - 4 + i);
                  }}
                >
                  {totalPageCount - 3 + i}
                </button>
              ))}

            {totalPageCount >= 6 && currentPageIndex <= totalPageCount - 3 && (
              <button
                type="button"
                className="page-item"
                onClick={() => {
                  onPageSelect(totalPageCount - 1);
                }}
                disabled={
                  currentPageIndex === totalPageCount || totalPageCount === 0
                }
              >
                <div className="page-link-text">{totalPageCount}</div>
              </button>
            )}

            <button
              type="button"
              className="page-item"
              onClick={() => {
                // gotoPage(currentPageIndex + 1);
                onNextPage();
              }}
              disabled={
                currentPageIndex === totalPageCount || totalPageCount === 0
              }
            >
              <div className="page-link-text">{">"}</div>
            </button>
          </ul>
        </div>
      ) : null}
    </>
  );
};

export default Pagination;
