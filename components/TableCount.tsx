import React from "react";

const TableCount = (props) => {
  const { currentPageIndex, totalPageCount, gotoPage } = props;

  console.log("ccccc", currentPageIndex, totalPageCount);
  return (
    <div>
      <ul className="pagination">
        <button
          type="button"
          className="page-item"
          onClick={() => gotoPage(currentPageIndex - 1)}
          disabled={currentPageIndex === 0 || totalPageCount === 0}
        >
          <div>{"<"}</div>
        </button>

        {currentPageIndex >= 4 && (
          <button
            type="button"
            className="page-item"
            onClick={() => gotoPage(0)}
          >
            <div className="page-link-text">{1}</div>
          </button>
        )}
        {totalPageCount < 6 &&
          Array.from(Array(totalPageCount).keys()).map((x, i) => (
            <button
              type="button"
              className={`page-item ${
                currentPageIndex === i + 1 ? "active" : ""
              }`}
              onClick={() => gotoPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

        {totalPageCount >= 6 &&
          currentPageIndex < 4 &&
          [1, 2, 3, 4].map((x, i) => (
            <button
              type="button"
              className={`page-item ${currentPageIndex === i ? "active" : ""}`}
              onClick={() => gotoPage(i)}
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
                onClick={() => gotoPage(currentPageIndex - 1)}
              >
                {currentPageIndex - 1}
              </button>

              <button
                type="reset"
                className={`page-item active`}
                onClick={() => gotoPage(currentPageIndex)}
              >
                {currentPageIndex}
              </button>

              <button
                type="button"
                className={`page-item`}
                onClick={() => gotoPage(currentPageIndex + 1)}
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
              onClick={() => gotoPage(totalPageCount - 4 + i)}
            >
              {totalPageCount - 4 + i}
            </button>
          ))}

        {currentPageIndex <= totalPageCount - 3 && (
          <button
            type="button"
            className="page-item"
            onClick={() => gotoPage(totalPageCount - 1)}
            disabled={
              currentPageIndex === totalPageCount || totalPageCount === 0
            }
          >
            <div className="page-link-text">{totalPageCount - 1}</div>
          </button>
        )}

        <button
          type="button"
          className="page-item"
          onClick={() => gotoPage(currentPageIndex + 1)}
          disabled={currentPageIndex === totalPageCount || totalPageCount === 0}
        >
          <div className="page-link-text">{">"}</div>
        </button>
      </ul>
    </div>
  );
};

export default TableCount;
