import React from 'react'
import InputWithLabel from './InputWithLabel'
import "./../App.css";

type NavbarType = {
  title: string,
  logo: any,
  sumOfComments: number,
  searchText: string,
  handleChange: (e:React.ChangeEvent<HTMLInputElement>) => void
}

export default function Navibar({ title, logo, sumOfComments, searchText, handleChange }: NavbarType) {
  return (
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
  )
}
