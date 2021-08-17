import React, { useEffect, useState } from 'react';
import range from './PaginationUtils/range';
import './Pagination.scss';

const Pagination = props => {
  const {totalRecords = null, pageLimit = 30, pageNeighbours = 0, onPageChanged} = props;

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalRecords / pageLimit);
  const leftPage = 'left';
  const rightPage = 'right';

  const fetchPageNumbers = () => {
    const totalNumbers = (pageNeighbours * 2) + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - pageNeighbours);
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);
      let pages = range(startPage, endPage);

      const hasLeftSpill = startPage > 2;
      const hasRightSpill = (totalPages - endPage) > 1;
      const spillOffset = totalNumbers - (pages.length + 1);

      switch (true) {
        case (hasLeftSpill && !hasRightSpill): {
          const extraPages = range(startPage - spillOffset, startPage - 1);
          pages = [leftPage, ...extraPages, ...pages];
          break;
        }
        case (!hasLeftSpill && hasRightSpill): {
          const extraPages = range(endPage + 1, endPage + spillOffset);
          pages = [...pages, ...extraPages, rightPage];
          break;
        }
        case (hasLeftSpill && hasRightSpill):
        default: {
          pages = [leftPage, ...pages, rightPage];
          break;
        }
      }
      return [1, ...pages, totalPages];
    }
    return range(1, totalPages);
  }

  const gotoPage = page => {
    // const {onPageChanged = f => f} = props;
    const currentPage = Math.max(0, Math.min(page, totalPages));
    const paginationData = {
      currentPage,
      totalPages,
      pageLimit,
      totalRecords
    };

    setCurrentPage(currentPage);
    onPageChanged(paginationData);
  }

  useEffect(() => {
    gotoPage(1)
  }, [totalPages])

  const handleClick = page => event => {
    event.preventDefault();
    gotoPage(page);
  } 

  const handleMoveLeft = event => {
    event.preventDefault();
    gotoPage(currentPage - (pageNeighbours * 2) - 1);
  }

  const handleMoveRight = event => {
    event.preventDefault();
    gotoPage(currentPage + (pageNeighbours * 2) + 1);
  }

  if (!totalRecords || totalPages === 1) return null;

  const pages = fetchPageNumbers();

  return (
    <>
      <div className="pagination">
        {pages.map((page, index) => {
          if (page === leftPage) return (
            <button className="page-item" key={index} onClick={handleMoveLeft}>Prev</button>
          );
          if (page === rightPage) return (
            <button className="page-item" key={index} onClick={handleMoveRight}>Next</button>
          );
          return (
            <button 
              className={`page-item${currentPage === page ? ' page-item--active' : ''}`}
              key={index}
              onClick={handleClick(page)}
            >  
            {page}
            </button>
          );
        })}
      </div>
    </>
  )


}

export default Pagination;