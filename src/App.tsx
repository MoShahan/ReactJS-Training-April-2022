import React, { useEffect, useReducer, useCallback, useState, useMemo, createContext } from "react";
import "./App.css";
import List from "./components/List";
import InputWithLabel from "./components/InputWithLabel";
import usePersistence from "./hooks/usePersistence";
import logo from "./logo.svg";
import { ActionType, StateType, StoryType } from "./types";
import axios from "axios";
import useDebounce from "./hooks/useDebounce";
import { Link } from "react-router-dom";

export const title: string = "React Training";

function storiesReducer(state: StateType, action: ActionType) {
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
interface AppContextType {
  onClickDelete: (e: number) => void,
}

export const AppContext = createContext<AppContextType | null>(null)

function App(): JSX.Element {

  const [searchText, setSearchText]: any = usePersistence("searchTerm", "React");

  const [stories, dispatchStories] = useReducer(storiesReducer, {
    data: [],
    isError: false,
    isLoading: false
  })

  const sumOfComments = useMemo(
    () => stories.data.reduce(
      (acc: number, current: StoryType) =>
        acc + current.num_comments
      , 0)
    , [stories])

  const debouncedUrl = useDebounce(API_ENDPOINT + searchText)

  const handleFetchStories = useCallback(async () => {
    dispatchStories({ type: "INIT_FETCH" })
    try {
      const response = await axios.get(debouncedUrl)
      dispatchStories({ type: "SET_STORIES", payload: { data: response.data.hits } })
    } catch {
      dispatchStories({ type: "FETCH_FAILURE" })
    }
  }, [debouncedUrl])

  useEffect(() => {
    handleFetchStories()
  }, [handleFetchStories]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(event.target.value);
  }

  const handleDeleteClick = useCallback((objectId: number) => {
    dispatchStories({ type: "REMOVE_STORY", payload: { id: objectId } })
  }, [])

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
        <p className="sumComments">Sum of Comments = {sumOfComments}</p>
        <InputWithLabel
          searchText={searchText}
          onChange={handleChange}
          id="searchBox"
        >
          Search
        </InputWithLabel>

      </nav>

      {
        stories.isLoading ?
          (<h1 style={{ marginTop: "10rem" }}>LOADING...</h1>) :
          (
            <AppContext.Provider value={{ onClickDelete: handleDeleteClick }}>
              <List
                listOfItems={stories.data}
              // onClickDelete={handleDeleteClick}
              />
            </AppContext.Provider>
          )
      }

    </div>
  );
}

export default App;
