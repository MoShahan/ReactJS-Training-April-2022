import React, { useEffect, useReducer, useCallback, useState } from "react";
import "./App.css";
import List from "./components/List";
import InputWithLabel from "./components/InputWithLabel";
import usePersistence from "./hooks/usePersistence";
import logo from "./logo.svg";
import { StoryType } from "./types";
import { isError } from "util";
import axios from "axios";

const title: string = "React Training";

// const listOfItems: Array<StoryType> = [
//   {
//     title: "Learn React",
//     url: "https://eprint.iacr.org/2021/1022",
//     created_at: "2011-12-12",
//     author: "grey-area",
//     points: 1107,
//     num_comments: 12,
//     objectID: 1,
//   },
//   {
//     title: "Learn TypeScript",
//     url: "https://eprint.iacr.org/2021/1022",
//     created_at: "2012-12-12",
//     author: "grey-area",
//     points: 6107,
//     num_comments: 1,
//     objectID: 2,
//   },
//   {
//     created_at: "2017-02-19T21:16:33.000Z",
//     title: "Reflecting on one very, very strange year at Uber",
//     url: "https://www.susanjfowler.com/blog/2017/2/19/reflecting-on-one-very-strange-year-at-uber",
//     author: "grey-area",
//     points: 4107,
//     num_comments: 530,
//     objectID: 3,
//   },
//   {
//     created_at: "2021-04-05T14:04:22.000Z",
//     title: "Google’s copying of the Java SE API was fair use [pdf]",
//     url: "https://www.supremecourt.gov/opinions/20pdf/18-956_d18f.pdf",
//     author: "pdoconnell",
//     points: 4103,
//     num_comments: 930,
//     objectID: 4,
//   },
// ];

// function getAsyncData() {
//   return new Promise(
//     (resolve, reject) =>
//       setTimeout(() =>
//         resolve({ data: listOfItems }),
//         2000));
// }
// function getAsyncData() {
//   return new Promise(
//     (resolve, reject) =>
//       setTimeout(() =>
//         reject({ data: listOfItems }),
//         3000));
// }

function storiesReducer(state: any, action: any) {
  switch (action.type) {

    case "SET_STORIES":
      return { data: action.payload.data, isError: false, isLoading: false }

    case "REMOVE_STORY":
      const filteredState = state.data.filter(
        (story: any) => story.objectID !== action.payload.id);
      return { data: filteredState, isError: false, isLoading: false }

    case "INIT_FETCH":
      return { ...state, isLoading: true, isError: false }

    case "FETCH_FAILURE":
      return { ...state, isLoading: false, isError: true }

    default:
      return state
  }

}

const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?query="

function App(): JSX.Element {

  const [searchText, setSearchText]: any = usePersistence("searchTerm", "React");
  //setSearchText === state updater function

  const [stories, dispatchStories] = useReducer(storiesReducer, {
    data: [],
    isError: false,
    isLoading: false
  })

  // const [stories, setStories] = useState([]);

  // const [isLoading, setIsLoading] = useState(false);
  // const [isError, setIsError] = useState(false);

  const [url, setUrl] = useState(API_ENDPOINT + searchText);

  const handleFetchStories = useCallback(async () => {
    dispatchStories({ type: "INIT_FETCH" })
    try {
      const response = await axios.get(url)
      dispatchStories({ type: "SET_STORIES", payload: { data: response.data.hits } })
    } catch {
      dispatchStories({ type: "FETCH_FAILURE" })
    }
  }, [url])

  useEffect(() => {
    handleFetchStories()
  }, [handleFetchStories]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(event.target.value);
  }

  function handleDeleteClick(objectId: number) {
    // const newListOfItems =
    //   stories.filter(
    //     (story: StoryType) =>
    //       story.objectID !== objectId);
    // setStories(newListOfItems);
    dispatchStories({ type: "REMOVE_STORY", payload: { id: objectId } })
  }

  function handleSubmitClick() {
    // e.preventDefault()
    setUrl(API_ENDPOINT + searchText)
  }

  // const filteredList = stories.data.filter(
  //   (item: StoryType) =>
  //     item.title?.toLowerCase().includes(searchText.toLowerCase())
  // );

  if (stories.isError) {
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
          id="searchBox"
          onSearchSubmit={handleSubmitClick}
        >
          Search
        </InputWithLabel>
      </nav>

      {
        stories.isLoading ?
          (<h1 style={{ marginTop: "10rem" }}>LOADING...</h1>) :
          (
            <List
              listOfItems={stories.data}
              onClickDelete={handleDeleteClick}
            />
          )
      }

    </div>
  );
}

export default App;
