import "./Search.css";

const Search = ({ children, onChange }: any) => {
    return (
        <div>
            <label htmlFor="searchbox">{children}</label>
            <input
                id="searchBox"
                type="text"
                // value={localStorage.getItem("searchTerm") ?? ""}
                onChange={onChange}
            />
        </div>
    );
};

export default Search;