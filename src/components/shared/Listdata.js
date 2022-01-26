import React, { useState, useEffect } from "react";
import {
  HiChevronRight,
  HiChevronLeft,
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
} from "react-icons/hi";
import PropTypes from "prop-types";
import { toRibuan } from "../../utils";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import { FaPencilAlt, FaTrash } from "react-icons/fa";

export const ListStyled = styled.div`
  min-width: 100px;
  width: 99, 8%;
  /* background-color: ${({ theme }) => theme.colors.list.background}; */
  border: 0.5px solid;
`;
const TableContainer = styled.div`
  width: calc(100% - 0px);
  padding-bottom: 20px;
  position: relative;
  overflow: auto;
  margin: 0px;

  & table {
    border-collapse: collapse;
    width: 100%;
    overflow: auto;
    text-align: left;
    & thead {
      position: sticky;
      top: 0px;
      & tr {
        /* box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.5); */
        & th {
          padding: 0 8px;
          min-width: 25px;
          height: 40px;
          position: sticky;
          top: 0px;
          /* z-index: 99; */
          border: 0.5px solid ${({ theme }) => theme.colors.primary.main};
          background-color: ${({ theme }) => theme.colors.primary.dark};
          &:hover {
            background-color: ${({ theme }) => theme.colors.primary.main};
          }
        }
      }
    }
    & tbody {
      & tr {
        &:hover {
          background-color: ${({ theme }) => theme.colors.primary.light};
          /* transition: 0.3s background-color ease-in-out,
            0.3s box-shadow ease-in-out; */
        }

        & td {
          min-width: 25px;
          height: 35px;
          padding: 0 8px;
          border: 0.5px solid ${({ theme }) => theme.colors.primary.main};
        }
        & #action {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 96%;
          width: 99%;
          & button {
            display: flex;
            align-items: center;
            background-color: red;
            margin-right: 5px;
            padding: 2px;
          }
        }
      }
    }
  }
`;
const BtnCari = styled.span`
  display: none;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 40px;
  border-radius: 99px;
  margin-left: 8px;

  &:hover {
    cursor: pointer;
    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.5);
    background-color: ${({ theme }) => theme.colors.body.background};
  }
`;
const InputCari = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(100% - 250px);
  &:hover {
    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.5);
  }
  & input,
  select {
    height: 45px;
    outline: none;
    border: 0.5px solid;
    text-indent: 8px;
    min-width: 150px;
  }
  & select {
    border-radius: 0px;
    width: auto;
    font-family: ${({ theme }) => theme.font};
    background-color: ${({ theme }) => theme.colors.primary.main};
    color: ${({ theme }) => theme.colors.select.text};
    position: relative;
    font-size: 16px;
    outline: none;
    & :hover {
      cursor: pointer;
    }
    option {
      background-color: ${({ theme }) => theme.colors.select.option};
      display: flex;
      white-space: pre;
      padding: 8px 2px 1px;
      min-height: 1rem;
      border: none;
      outline: none;
    }
  }
  & input {
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    width: 100%;
    font-family: ${({ theme }) => theme.font};
    /* background-color: ${({ theme }) => theme.colors.input.background}; */
    color: ${({ theme }) => theme.colors.input.text};
    font-size: 16px;

    &::-webkit-input-placeholder {
      color: ${({ focus, error }) =>
        focus || error ? "transparent" : "inherit"};
      /* transition: 0.3s background-color ease-in-out, 0.3s box-shadow ease-in-out; */
    }
    &::-moz-placeholder {
      color: ${({ focus, error }) =>
        focus || error ? "transparent" : "inherit"};
      /* transition: 0.3s background-color ease-in-out, 0.3s box-shadow ease-in-out; */
    }
    &::-ms-input-placeholder {
      color: ${({ focus, error }) =>
        focus || error ? "transparent" : "inherit"};
      /* transition: 0.3s background-color ease-in-out, 0.3s box-shadow ease-in-out; */
    }
  }

  @media (max-width: 700px) {
    width: 100%;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 35px;
  padding: 0 8px;
  width: auto;
  margin-top: 8px;
  & label {
    margin: 0 4px;
  }
  & select {
    margin: 0 8px;
  }
  & button {
    color: inherit;
    outline: none;
    font-size: 1.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 2px;
    border: 1px solid ${({ theme }) => theme.colors.primary.main};
    padding: 4px;
    border-radius: 50%;
    &:hover {
      cursor: pointer;
      /* background-color: ${({ theme }) => theme.colors.primary.main};
        color: ${({ theme }) => theme.colors.primary.text}; */
    }

    &:disabled {
      border: 1px solid gray;
    }
  }
`;

const Span = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 40px;
  border-radius: 99px;
  margin-left: 8px;
  background-color: transparent;
  color: white;
  &:hover {
    cursor: pointer;
    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.5);
    /* background-color: ${({ theme }) => theme.colors.body.background}; */
  }
  &:disabled {
    color: gray;
    cursor: default;
    box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0);
  }
`;

const Listdata = (props) => {
  const {
    selectindex,
    cols,
    datarows,
    onSelect,
    rowsPerPageOptions = [],
    enableAction,
    onDelete,
    onDetail,
    pagination = true,
  } = props;

  const [page, setPage] = React.useState(0);
  const [rowSelectedIndex, setRowSelectedIndex] = useState(null);
  const [rows, setRows] = useState(datarows);
  const [rowfilterby] = useState(cols[1].id);
  const [search_data] = useState("");
  // const [sort, setSort] = useState({ asc: 1, by: null });
  const [rowsPerPage, setRowsPerpage] = useState(rowsPerPageOptions[0]);
  const [rowsoption] = useState(rowsPerPageOptions);

  const totalpage = Math.ceil(datarows.length / rowsPerPage);

  useEffect(() => {
    let a = true;
    if (a) {
      setRowSelectedIndex(null);
      setRows(datarows);
      setPage(0);
    }
    return () => (a = false);
  }, [datarows]);

  const onChangeRowPerpage = (e) => {
    const v = e.target.value;
    v && !isNaN(Number(v))
      ? setRowsPerpage(Number(v))
      : setRowsPerpage(datarows.length);
    setPage(0);

    // setRows(datarows)
    // Number(v) ? setRowsPerpage(v) : setRowsPerpage(datarows.length);
  };

  const trbody =
    datarows && datarows.length > 0 ? (
      (rowsPerPage && rowsPerPage > 0
        ? datarows
            .filter((e) =>
              rowfilterby !== ""
                ? e[rowfilterby]
                    .toString()
                    .toLowerCase()
                    .includes(search_data.toLowerCase())
                : e[Object.keys(e)[0].toString()]
                    .toString()
                    .includes(search_data)
            )
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        : datarows.filter((e) =>
            rowfilterby !== ""
              ? e[rowfilterby]
                  .toString()
                  .toLowerCase()
                  .includes(search_data.toLowerCase())
              : e[Object.keys(e)[0].toString()]
                  .toString()
                  .includes(search_data.toLowerCase())
          )
      ).map((d, i) => (
        <tr
          style={
            rowSelectedIndex === i && selectindex > -1
              ? {
                  backgroundColor: `${props.theme.colors.primary.light}`,
                  fontWeight: "bold",
                }
              : {}
          }
          id={uuidv4()}
          key={uuidv4()}
          onClick={() => {
            setRowSelectedIndex(i);
            // selectindex = i;
            onSelect && onSelect(d, i);
            // if (onSelect) onSelect(d);
          }}
        >
          {cols.map((c, ci) => {
            // console.log(typeof d[c.id]);
            // console.log(d[c.id]);
            return (
              <td
                key={uuidv4()}
                style={{
                  textAlign: c.textalign && c.textalign.row,
                  width: c.width && c.width,
                }}
              >
                {c.id === "no" ? (
                  i + 1
                ) : isNaN(Number(d[c.id])) ? (
                  d[c.id]
                ) : c.id === "action" && enableAction ? (
                  <div id="action">
                    <button type="button" onClick={onDelete}>
                      <FaTrash />
                    </button>
                    <button type="button" onClick={onDetail}>
                      <FaPencilAlt />
                    </button>
                  </div>
                ) : (
                  d[c.id]
                  // toRibuan(d[c.id])
                )}
              </td>
            );
          })}
        </tr>
      ))
    ) : (
      <tr key={uuidv4()}>
        <td
          key={uuidv4()}
          colSpan={cols.length + 1}
          style={{ textAlign: "center" }}
        >
          Data Not Found
        </td>
      </tr>
    );

  const goToNextPage = () => {
    setPage((c) => c + 1);
  };
  const goToPreviousPage = () => {
    setPage((c) => c - 1);
  };
  const goToFirstPage = () => {
    setPage(0);
  };
  const goToLastPage = () => {
    setPage(totalpage - 1);
  };

  return (
    <>
      <TableContainer {...props} rowselectedindex={rowSelectedIndex}>
        <table>
          <thead>
            <tr key={uuidv4()}>
              {cols && cols.length > 0
                ? cols.map((c, i) => (
                    <th
                      id={c.id}
                      // onClick={sortdata}
                      key={uuidv4()}
                      style={{
                        textAlign: c.textAlign && c.textalign.title,
                        width: c.width && c.width,
                      }}
                    >
                      {c.title.toUpperCase()}
                    </th>
                  ))
                : null}
              {/* {element ? <th></th> : <th></th>} */}
            </tr>
          </thead>
          <tbody>{trbody}</tbody>
          <tfoot></tfoot>
        </table>
      </TableContainer>

      {pagination && (
        <Pagination>
          <label>rows per page</label>
          <select onChange={onChangeRowPerpage} value={rowsPerPage}>
            {rowsoption.map((d, i) => (
              <option key={uuidv4()}>{d}</option>
            ))}
          </select>
          <button
            type="button"
            onClick={goToFirstPage}
            disabled={page === 0 ? true : false}
          >
            <HiChevronDoubleLeft />
          </button>
          <button
            type="button"
            onClick={goToPreviousPage}
            disabled={page === 0 ? true : false}
          >
            <HiChevronLeft />
          </button>
          <label>
            page {page + 1} of {totalpage}
          </label>
          <button
            type="button"
            onClick={goToNextPage}
            disabled={page === totalpage - 1 || totalpage === 0 ? true : false}
          >
            <HiChevronRight />
          </button>
          <button
            type="button"
            disabled={page === totalpage - 1 || totalpage === 0 ? true : false}
            onClick={() => {
              console.log(page);
              goToLastPage();
            }}
          >
            <HiChevronDoubleRight />
          </button>
        </Pagination>
      )}
    </>
  );
};

Listdata.propTypes = {
  cols: PropTypes.any.isRequired,
  datarows: PropTypes.any.isRequired,
  onSelect: PropTypes.func,
  nopage: PropTypes.bool,
  size: PropTypes.string,
  selectedDataRow: PropTypes.object,
  element: PropTypes.element,
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  rowperpage: PropTypes.number,
  selectindex: PropTypes.number,
};
Listdata.defaultProps = {
  cols: [],
  datarows: [],
  selectindex: -1,
};

export default Listdata;
