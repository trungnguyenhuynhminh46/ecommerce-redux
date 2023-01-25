import React from "react";

interface Props {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination: React.FC<Props> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  setCurrentPage,
}) => {
  const pages = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pages.push(i);
  }
  //   console.log(pages);

  return (
    <nav className="my-auto">
      <ul className="inline-flex -space-x-px">
        <li>
          <a
            href="#"
            className="paginate_btn"
            onClick={() => {
              if (currentPage > 1) {
                setCurrentPage(currentPage - 1);
              }
            }}
          >
            Previous
          </a>
        </li>
        {pages.map((page, index) => {
          return (
            <li key={index}>
              <a
                href="#"
                className={`paginate_btn ${page === currentPage && "active"}`}
                onClick={() => {
                  setCurrentPage(page);
                }}
              >
                {page}
              </a>
            </li>
          );
        })}

        <li>
          <a
            href="#"
            className="paginate_btn"
            onClick={() => {
              if (currentPage < pages.length) {
                setCurrentPage(currentPage + 1);
              }
            }}
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
