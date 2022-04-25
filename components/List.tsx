import "./List.css";
import Item from "./Item"
import { StoryType } from "../types";

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
                            // title={item.title}
                            // url={item.url}
                            // num_comments={item.num_comments}
                            // author={item.author}
                            item={item}
                            onClickDelete={onClickDelete}
                        />
                    ))}
                </tbody>
            </table>
        </div>)
};

export default List;