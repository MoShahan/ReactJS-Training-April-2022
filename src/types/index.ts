export type StoryType = {
  title: string,
  url: string,
  created_at: string,
  author: string,
  points: number,
  num_comments: number,
  objectID: number,
}

interface ISetStories {
  type: "SET_STORIES",
  payload: { data: Array<StoryType> }
}

interface IInitFetch {
  type: "INIT_FETCH"
}

interface IRemoveStory {
  type: "REMOVE_STORY",
  payload: { id: number }
}

interface IFetchFailure {
  type: "FETCH_FAILURE"
}

export type StateType = {
  data: Array<StoryType>,
  isLoading: boolean,
  isError: boolean
}

export type ActionType = IFetchFailure | IInitFetch | IRemoveStory | ISetStories