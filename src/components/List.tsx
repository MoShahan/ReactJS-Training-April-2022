import "./List.css";
import Item from "./Item"
import { StoryType } from "../types";
import React from "react";

type ListProps = {
    listOfItems: Array<StoryType>;
    onClickDelete: (e: number) => void;
};

const List = ({ listOfItems, onClickDelete }: ListProps) => {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>URL</th>
                        <th>Author</th>
                        <th>Comments</th>
                        <th className="actionHead">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listOfItems.map((item) => (
                        <Item
                            key={item.objectID}
                            item={item}
                            onClickDelete={onClickDelete}
                        />
                    ))}
                </tbody>
            </table>
        </div>)
};

export default React.memo(List);