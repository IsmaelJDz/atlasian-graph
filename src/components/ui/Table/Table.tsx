import React, { FC, ReactNode } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import cn from "classnames";
import style from "./Table.module.css";

export const SORTING_TYPES = {
  none: "none",
  asc: "asc",
  desc: "desc",
};

import {
  ChevronDownIcon,
  ChevronUpIcon,
  SwitchVerticalIcon,
} from "@heroicons/react/solid";

type ColumnProps = {
  name: string | ReactNode;
  accessor: string | CallableFunction;
  cell?: (row: any) => ReactNode;
  fixed?: boolean;
  headerClassName?: string;
  className?: string;
  fixedCheckbox?: boolean;
  withFixedCheckbox?: boolean;
  sort?: "none" | "asc" | "desc";
  sorting?: (sort: any) => void;
};

type StringMap = { [key: string]: any };

type TableProps = {
  columns: ColumnProps[];
  data: StringMap | StringMap[];
  fixedHeader?: boolean;
  checkedList?: string[];
  border?: boolean;
  firstHeadCell?: any;
  loading?: boolean;
};

export const Table: FC<TableProps> = ({
  columns,
  data = [],
  fixedHeader = false,
  border = false,
  checkedList = [],
  firstHeadCell = null,
  loading = false,
}: any) => {
  const handleSortChange = (index: any, currentSort: any) => {
    const column = columns[index];
    let sort = SORTING_TYPES.none;

    if (!currentSort || currentSort === SORTING_TYPES.none) {
      sort = SORTING_TYPES.asc;
    }

    if (currentSort === SORTING_TYPES.asc) {
      sort = SORTING_TYPES.desc;
    }

    column.sorting(sort);
  };

  const WrapperSorting = ({ index, sort, children }: any) => (
    <span
      className={style.WrapperSorting}
      onClick={() => handleSortChange(index, sort)}
    >
      {children}
    </span>
  );

  const renderSorting = (index: number, column: any) => {
    if (!column?.sorting) return null;

    const currentSort = column?.sort ?? "none";

    if (currentSort === SORTING_TYPES.asc) {
      return (
        <WrapperSorting index={index} sort={currentSort}>
          {column.name} <ChevronUpIcon className={style.ChevronUpIcon} />
        </WrapperSorting>
      );
    }

    if (currentSort === SORTING_TYPES.desc) {
      return (
        <WrapperSorting index={index} sort={currentSort}>
          {column.name} <ChevronDownIcon className={style.ChevronUpIcon} />
        </WrapperSorting>
      );
    }

    return (
      <WrapperSorting index={index} sort={currentSort}>
        {column.name}
        <SwitchVerticalIcon className={style.SwitchVerticalIcon} />
      </WrapperSorting>
    );
  };

  return (
    <div className={`${style.Container} ${fixedHeader && style.Max_height}`}>
      <div className={style.SubContainer}>
        <table>
          <thead>
            <tr key="thead-row-1">
              {columns.map((column: ColumnProps, i: number) => {
                const fixed = column?.fixed || column?.fixedCheckbox || false;
                const thClasses = cn("thClasses", {
                  sticky: fixedHeader || fixed,
                  top_0: fixedHeader,
                  bg_gray_200: fixedHeader && !fixed,
                  "bg_gray_200 z_20 ": fixed,
                  left_checkbox: fixed && column?.withFixedCheckbox,
                  left_0: fixed && !column?.withFixedCheckbox,
                });
                const thChildClasses = cn("bg_gray_200 text_blue py_1 px_1", {
                  [column.headerClassName!]: true,
                });

                return (
                  <th key={`thead-cell-${i + 1}`} className={thClasses}>
                    {firstHeadCell && i === 0 && (
                      <div className={thChildClasses}>{firstHeadCell}</div>
                    )}

                    {(!firstHeadCell || (!!firstHeadCell && i > 0)) && (
                      <div className={thChildClasses}>
                        {column?.sorting ? (
                          renderSorting(i, column)
                        ) : (
                          <span className="span_th">{column.name}</span>
                        )}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {!loading &&
              data.map((row: any, i: number) => (
                <tr
                  key={`tbody-row-${i}`}
                  className={cn({
                    borderTr: checkedList.find((e: any) => e === row.id),
                  })}
                >
                  {columns.map((column: any, j: any) => {
                    const accessor = column.accessor;
                    const cell = column.cell;
                    const fixed = column?.fixed || false;
                    const tdClasses = cn(column.className, {
                      stickyBackground: fixed,
                      widthTable: fixed,
                      border,
                      "left-checkbox":
                        column?.fixed && column?.withFixedCheckbox,
                      "left-0": column?.fixed && !column?.withFixedCheckbox,
                      "sticky left-0 bg-grey-100 z-20": column?.fixedCheckbox,
                      "border-0": data?.length === i + 1,
                    });

                    if (typeof accessor === "string" && !cell) {
                      return (
                        <td className={tdClasses} key={`tbody-cell-${j + 1}`}>
                          {row[accessor]}
                        </td>
                      );
                    }

                    if (typeof accessor === "string") {
                      return (
                        <td className={tdClasses} key={`tbody-cell-${j + 1}`}>
                          {cell(row[accessor])}
                        </td>
                      );
                    }

                    return !cell ? (
                      ""
                    ) : (
                      <td className={tdClasses} key={`tbody-cell-${j + 1}`}>
                        {cell(accessor(row))}
                      </td>
                    );
                  })}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
