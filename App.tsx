import React, { useEffect, useState } from "react";
import "./App.css";
import List from "./components/List";
import InputWithLabel from "./components/InputWithLabel";
import usePersistence from "./hooks/usePersistence";
import logo from "./logo.svg";
import { StoryType } from "./types";

const title: string = "React Training";

// type StoryType = {
//   title: string,
//   url: string,
//   created_at: string,
//   author: string,
//   points: number,
//   num_comments: number,
//   objectID: number,
// }

const listOfItems: Array<StoryType> = [
  {
    title: "Learn React",
    url: "https://eprint.iacr.org/2021/1022",
    created_at: "2011-12-12",
    author: "grey-area",
    points: 1107,
    num_comments: 12,
    objectID: 1,
  },
  {
    title: "Learn TypeScript",
    url: "https://eprint.iacr.org/2021/1022",
    created_at: "2012-12-12",
    author: "grey-area",
    points: 6107,
    num_comments: 1,
    objectID: 2,
  },
  {
    created_at: "2017-02-19T21:16:33.000Z",
    title: "Reflecting on one very, very strange year at Uber",
    url: "https://www.susanjfowler.com/blog/2017/2/19/reflecting-on-one-very-strange-year-at-uber",
    author: "grey-area",
    points: 4107,
    num_comments: 530,
    objectID: 3,
  },
  {
    created_at: "2021-04-05T14:04:22.000Z",
    title: "Google’s copying of the Java SE API was fair use [pdf]",
    url: "https://www.supremecourt.gov/opinions/20pdf/18-956_d18f.pdf",
    author: "pdoconnell",
    points: 4103,
    num_comments: 930,
    objectID: 4,
  },
];

function getAsyncData() {
  return new Promise(
    (resolve, reject) =>
      setTimeout(() =>
        resolve({ data: listOfItems }),
        2000));
}
// function getAsyncData() {
//   return new Promise(
//     (resolve, reject) =>
//       setTimeout(() =>
//         reject({ data: listOfItems }),
//         3000));
// }

function App(): JSX.Element {

  // const [searchText, setSearchText] = useState(localStorage.getItem("searchTerm") ?? "React");

  // useEffect(
  //   () => {
  //     localStorage.setItem("searchTerm", searchText)
  //   },
  //   [searchText]);

  const [searchText, setSearchText]: any = usePersistence("searchTerm", "React");
  //setSearchText === state updater function

  const [stories, setStories] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);


  useEffect(
    () => {
      setIsLoading(true)
      getAsyncData()
        .finally(
          () => setIsLoading(false))
        .then(
          (value: any) => setStories(value.data))
        .catch(
          (e) => setIsError(true));
    }, []);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(event.target.value);
  }

  function handleDeleteClick(objectId: number) {
    const newListOfItems =
      stories.filter(
        (story: StoryType) =>
          story.objectID !== objectId);
    setStories(newListOfItems);
  }

  const filteredList = stories.filter(
    (item: StoryType) =>
      item.title.toLowerCase().includes(searchText.toLowerCase())
  );

  if (isError) {
    return (
      <h1 style={{ marginTop: "10rem", color: "red" }}>
        SOMETHING WENT WRONG
      </h1>
    );
  }

  return (
    <div>

      <nav>
        <div className="heading">
          <h1>{title}</h1>
          <img src={logo} />
        </div>
        <InputWithLabel
          searchText={searchText}
          onChange={handleChange}
          id="searchBox">
          Search
        </InputWithLabel>
      </nav>

      {
        isLoading ? (
          <h1 style={{ marginTop: "10rem" }}>LOADING...</h1>
        ) : (
          <List
            listOfItems={filteredList}
            onClickDelete={handleDeleteClick}
          />
        )}
    </div>
  );
}

export default App;
