import "./List.css";
import Item from "./Item"
import { StoryType } from "../types";
import React, { useRef, useState } from "react";

type ListProps = {
    listOfItems: Array<StoryType>;
    // onClickDelete: (e: number) => void;
};

const SORT_COLUMNS_ASCENDING = {
    title: (a: StoryType, b: StoryType) => a?.title?.localeCompare(b?.title),
    url: (a: StoryType, b: StoryType) => a?.url?.localeCompare(b?.url),
    author: (a: StoryType, b: StoryType) => a?.author?.localeCompare(b?.author),
    num_comments: (a: StoryType, b: StoryType) => (a.num_comments - b.num_comments)
}

const SORT_COLUMNS_DESCENDING = {
    title: (a: StoryType, b: StoryType) => b?.title?.localeCompare(a?.title),
    url: (a: StoryType, b: StoryType) => b?.url?.localeCompare(a?.url),
    author: (a: StoryType, b: StoryType) => b?.author?.localeCompare(a?.author),
    num_comments: (a: StoryType, b: StoryType) => (b.num_comments - a.num_comments)
}

const List = ({ listOfItems }: ListProps) => {

    const [sortedList, setSortedList] = useState(listOfItems)

    const arrowToggle = useRef({
        title: "",
        url: "",
        author: "",
        num_comments: ""
    })

    function handleSort(column: "title" | "url" | "author" | "num_comments") {
        
        if (arrowToggle.current[column] === "up") {
            const sortedListOfItems = [...sortedList].sort(SORT_COLUMNS_DESCENDING[column])
            arrowToggle.current[column] = "down"
            setSortedList(sortedListOfItems)
        } else {
            const sortedListOfItems = [...sortedList].sort(SORT_COLUMNS_ASCENDING[column])
            arrowToggle.current[column] = "up"
            setSortedList(sortedListOfItems)
        }
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th className="table-headings" onClick={() => handleSort("title")}>
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
                        </th>
                        <th className="actionHead">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedList.map((item) => (
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