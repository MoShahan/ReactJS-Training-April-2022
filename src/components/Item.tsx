import { useContext } from "react";
import { AppContext } from "../App";
import { StoryType } from "../types";

type ItemProps = {
    item: StoryType;
    // onClickDelete: (e: number) => void;
};

const Item = (
    { item: { title, url, author, num_comments, objectID } }
        : ItemProps) => {

    const ctx = useContext(AppContext)

    return (
        <tr>
            <td className="itemTitle">{title}</td>
            <td className="itemUrl">
                <a href={url} target="_blank">
                    {url}
                </a>
            </td>
            <td>{author}</td>
            <td>{num_comments}</td>
            <td className="deleteOption" onClick={() => ctx?.onClickDelete(objectID)}>Delete</td>
        </tr>
    );
};

export default Item;