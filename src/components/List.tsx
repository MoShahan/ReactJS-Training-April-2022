import "./List.css";
import Item from "./Item"
import { StoryType } from "../types";
import React, { useRef, useState } from "react";

type ListProps = {
    listOfItems: Array<StoryType>;
};

// const SORT_COLUMNS_ASCENDING = {
//     title: (a: StoryType, b: StoryType) => a?.title?.localeCompare(b?.title),
//     url: (a: StoryType, b: StoryType) => a?.url?.localeCompare(b?.url),
//     author: (a: StoryType, b: StoryType) => a?.author?.localeCompare(b?.author),
//     num_comments: (a: StoryType, b: StoryType) => (a.num_comments - b.num_comments)
// }

const SORT_COLUMNS: any = {
    title: (a: StoryType, b: StoryType) => a?.title?.localeCompare(b?.title),
    url: (a: StoryType, b: StoryType) => a?.url?.localeCompare(b?.url),
    author: (a: StoryType, b: StoryType) => a?.author?.localeCompare(b?.author),
    num_comments: (a: StoryType, b: StoryType) => (a.num_comments - b.num_comments)
}

// const SORT_COLUMNS_DESCENDING = {
//     title: (a: StoryType, b: StoryType) => b?.title?.localeCompare(a?.title),
//     url: (a: StoryType, b: StoryType) => b?.url?.localeCompare(a?.url),
//     author: (a: StoryType, b: StoryType) => b?.author?.localeCompare(a?.author),
//     num_comments: (a: StoryType, b: StoryType) => (b.num_comments - a.num_comments)
// }



const CustomSortHeader = ({ column, displayName, onClick, sortInfo }: any) => {
    // console.log("HEADER is called")
    return (
        <th
            className="table-headings"
        // onClick={() => onClick(column)}
        >
            {displayName}
            <span
                className="arrow-icon"
                onClick={() => onClick(column)}
            >
                {/* {sortInfo.column === column && (sortInfo.isDesc ? "⇃" : "↾")} */}
                {
                    sortInfo.column === column &&
                    (sortInfo.direction === "down" ? "⇃" : "↾")
                }
                {
                    sortInfo.direction === "none" ? "⥯" : ""
                }
            </span>
        </th>
    )
}

const CustomSortHeaders = ({ headers, onClick, sortInfo }: any) => {
    // console.log("HEADERS is called")
    // console.log(headers);

    return (
        headers.map(
            ([column, displayName]: any) => (
                <CustomSortHeader
                    column={column}
                    displayName={displayName}
                    onClick={onClick}
                    sortInfo={sortInfo}
                />
            )
        )
    )
}

// ⥯

const List = ({ listOfItems }: ListProps) => {

    const [sortInfo, setSortInfo] = useState({
        column: "",
        // isDesc: false
        direction: "none"
    })

    const newListOfItems = [...listOfItems]

    newListOfItems.sort(SORT_COLUMNS[sortInfo.column])

    if (sortInfo.direction === "down") {
        newListOfItems.reverse()
    }

    function handleSort(column: "title" | "url" | "author" | "num_comments") {
        // setSortInfo((prev) => {
        //     return { column, isDesc: !prev.isDesc }
        // })
        setSortInfo((prev) => {
            return { column, direction: prev.direction === "up" ? "down" : "up" }
        })
    }


    // const [sortedList, setSortedList] = useState(listOfItems)

    // const arrowToggle = useRef({
    //     title: "",
    //     url: "",
    //     author: "",
    //     num_comments: ""
    // })

    // function handleSort(column: "title" | "url" | "author" | "num_comments") {

    //     if (arrowToggle.current[column] === "up") {
    //         const sortedListOfItems = [...sortedList].sort(SORT_COLUMNS_DESCENDING[column])
    //         arrowToggle.current[column] = "down"
    //         setSortedList(sortedListOfItems)
    //     } else {
    //         const sortedListOfItems = [...sortedList].sort(SORT_COLUMNS_ASCENDING[column])
    //         arrowToggle.current[column] = "up"
    //         setSortedList(sortedListOfItems)
    //     }
    // }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        {/* <th className="table-headings" onClick={() => handleSort("title")}>
                            Title
                            <span className="arrow-icon">
                                {arrowToggle.current["title"] === "" ? "" : arrowToggle.current["title"] === "down" ? "v" : "^"}
                            </span>
                        </th>
                        <th className="table-headings" onClick={() => handleSort("url")}>
                            URL
                            <span className="arrow-icon">
                                {arrowToggle.current["url"] === "" ? "" : arrowToggle.current["url"] === "down" ? "v" : "^"}
                            </span>
                        </th>
                        <th className="table-headings" onClick={() => handleSort("author")}>
                            Author
                            <span className="arrow-icon">
                                {arrowToggle.current["author"] === "" ? "" : arrowToggle.current["author"] === "down" ? "v" : "^"}
                            </span>
                        </th>
                        <th className="table-headings" onClick={() => handleSort("num_comments")}>
                            Comments
                            <span className="arrow-icon">
                                {arrowToggle.current["num_comments"] === "" ? "" : arrowToggle.current["num_comments"] === "down" ? "v" : "^"}
                            </span>
                        </th> */}
                        {/* <CustomSortHeader
                            onClick={handleSort}
                            column="title"
                            displayName="Title"
                            sortInfo={sortInfo}
                        />
                        <CustomSortHeader
                            onClick={handleSort}
                            column="url"
                            displayName="URL"
                            sortInfo={sortInfo}
                        />
                        <CustomSortHeader
                            onClick={handleSort}
                            column="author"
                            displayName="Author"
                            sortInfo={sortInfo}
                        />
                        <CustomSortHeader
                            onClick={handleSort}
                            column="num_comments"
                            displayName="Comments"
                            sortInfo={sortInfo}
                        /> */}
                        <CustomSortHeaders
                            headers={[
                                ["title", "Title"],
                                ["url", "URL"],
                                ["author", "Author"],
                                ["num_comments", "Comments"]
                            ]}
                            onClick={handleSort}
                            sortInfo={sortInfo}
                        />
                        <th className="actionHead">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {newListOfItems.map((item) => (
                        <Item
                            key={item.objectID}
                            item={item}
                        // onClickDelete={onClickDelete}
                        />
                    ))}
                </tbody>
            </table>
        </div>)
};

export default React.memo(List);