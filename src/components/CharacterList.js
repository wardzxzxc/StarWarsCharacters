import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  getFirstPage,
  getNextPage,
  clearPage,
} from "../redux/actions/CharacterListAction";
import InfiniteScroll from "react-infinite-scroll-component";
import { NavLink } from "react-router-dom";

const style = {
  height: 100,
  border: "1px solid black",
  margin: 6,
  padding: 8,
};

export const CharacterList = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector(
    (state) => state.characterListReducer.currentPage
  );

  useEffect(() => {
    dispatch(getFirstPage());

    return () => {
      dispatch(clearPage());
    };
  }, [dispatch]);

  const starWarCharacters = useSelector(
    (state) => state.characterListReducer.starWarCharacters
  );

  if (starWarCharacters == null) {
    return <div />;
  }

  return (
    <div>
      <h1>All Characters</h1>
      <InfiniteScroll
        dataLength={starWarCharacters.length}
        next={() => {
          dispatch(getNextPage());
        }}
        hasMore={currentPage < 10}
        loader={<h4>Loading...</h4>}
      >
        {starWarCharacters.map((starWarCharacter, index) => (
          <div style={style} key={index}>
            <h3>{starWarCharacter.name}</h3>

            <NavLink
              to={`/people/${starWarCharacter.url.substring(
                starWarCharacter.url.lastIndexOf(
                  "/",
                  starWarCharacter.url.lastIndexOf("/") - 1
                ) + 1,
                starWarCharacter.url.lastIndexOf("/")
              )}`}
            >
              <button type="button">See more details!</button>
            </NavLink>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};
