import React from "react";

const TableCount = (props) => {
  const { currentPageIndex, totalPageCount, gotoPage, fetchMore, pageSize } =
    props;

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
          Array.from(Array(totalPageCount).keys()).map((x, i) => {
            return (
              <button
                type="button"
                className={`page-item ${
                  currentPageIndex === i ? "active" : ""
                }`}
                onClick={() => {
                  fetchMore({
                    variables: {
                      offset: i * pageSize + 1,
                      limit: i * pageSize + pageSize,
                    },
                  });
                  gotoPage(i);
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
              className={`page-item ${currentPageIndex === i ? "active" : ""}`}
              onClick={() => {
                fetchMore({
                  variables: {
                    offset: i * pageSize + 1,
                    limit: i * pageSize + pageSize,
                  },
                });
                gotoPage(i);
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
                  gotoPage(currentPageIndex - 1);
                }}
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
                onClick={() => {
                  fetchMore({
                    variables: {
                      offset: (currentPageIndex + 1) * pageSize + 1,
                      limit: (currentPageIndex + 1) * pageSize + pageSize,
                    },
                  });
                  gotoPage(currentPageIndex + 1);
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
                fetchMore({
                  variables: {
                    offset: (totalPageCount - 4 + i) * pageSize + 1,
                    limit: (totalPageCount - 4 + i) * pageSize + pageSize,
                  },
                });
                gotoPage(totalPageCount - 4 + i);
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
              fetchMore({
                variables: {
                  offset: totalPageCount * pageSize + 1,
                  limit: totalPageCount * pageSize + pageSize,
                },
              });
              gotoPage(totalPageCount - 1);
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
            fetchMore(currentPageIndex * 10 + 1, currentPageIndex * 10 + 10);
            gotoPage(currentPageIndex + 1);
          }}
          disabled={currentPageIndex === totalPageCount || totalPageCount === 0}
        >
          <div className="page-link-text">{">"}</div>
        </button>
      </ul>
    </div>
  );
};

export default TableCount;
