import "./List.css";
import Item from "./Item"

const List = ({ listOfItems }: any) => {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>URL</th>
                        <th>Author</th>
                        <th>Comments</th>
                    </tr>
                </thead>
                <tbody>
                    {listOfItems.map((item: any) => (
                        <Item
                            key={item.objectID}
                            title={item.title}
                            url={item.url}
                            num_comments={item.num_comments}
                            author={item.author}
                        />
                    ))}
                </tbody>
            </table>
        </div>)
};

export default List;