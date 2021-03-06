import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import Moment from "react-moment";
import styled from "styled-components";
import {
  getStarWarCharacter,
  clearStarWarCharacter,
} from "../redux/actions/CharacterDetailAction";

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Table = styled.table`
  width: 80%;
  border: 1px solid black;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  border: 1px solid black;
  height: 100px;
`;

const TableData = styled.td`
  border: 1px solid black;
  height: 100px;
`;

export const CharacterDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStarWarCharacter(id));
    return () => dispatch(clearStarWarCharacter);
  }, [id, dispatch]);

  const currentCharacter = useSelector(
    (state) => state.characterReducer.starWarCharacter
  );
  const loading = useSelector((state) => state.characterReducer.loading);
  const error = useSelector((state) => state.characterReducer.error);

  if (currentCharacter != null && !loading && error == null) {
    return (
      <MainContainer>
        <h1>Character Detail</h1>
        <Table>
          <tr>
            <TableHeader>Name</TableHeader>
            <TableData> {currentCharacter.name} </TableData>
          </tr>
          <tr>
            <TableHeader>Height</TableHeader>
            <TableData> {currentCharacter.height}</TableData>
          </tr>
          <tr>
            <TableHeader>Mass</TableHeader>
            <TableData> {currentCharacter.mass}</TableData>
          </tr>
          <tr>
            <TableHeader>Hair Color</TableHeader>
            <TableData> {currentCharacter.hair_color}</TableData>
          </tr>
          <tr>
            <TableHeader>Skin Color</TableHeader>
            <TableData> {currentCharacter.skin_color}</TableData>
          </tr>
          <tr>
            <TableHeader>Eye Color</TableHeader>
            <TableData> {currentCharacter.eye_color}</TableData>
          </tr>
          <tr>
            <TableHeader>Birth Year</TableHeader>
            <TableData> {currentCharacter.birth_year}</TableData>
          </tr>
          <tr>
            <TableHeader>Gender</TableHeader>
            <TableData> {currentCharacter.gender}</TableData>
          </tr>
          <tr>
            <TableHeader>Home World</TableHeader>
            <TableData>
              <a href={currentCharacter.homeworld}>
                {currentCharacter.homeworld}
              </a>
            </TableData>
          </tr>
          <tr>
            <TableHeader>Films</TableHeader>
            <TableData>
              {currentCharacter.films.length > 0 &&
                currentCharacter.films.map((film, index) => (
                  <div key={index}>
                    <a href={film}> {film}</a>
                  </div>
                ))}
              {currentCharacter.films.length === 0 && <p>null</p>}
            </TableData>
          </tr>
          <tr>
            <TableHeader>Species</TableHeader>
            <TableData>
              {currentCharacter.species.length > 0 &&
                currentCharacter.species.map((species, index) => (
                  <div key={index}>
                    <a href={species}> {species}</a>
                  </div>
                ))}
              {currentCharacter.species.length === 0 && <p>null</p>}
            </TableData>
          </tr>
          <tr>
            <TableHeader>Vehicles</TableHeader>
            <TableData>
              {currentCharacter.vehicles.length > 0 &&
                currentCharacter.vehicles.map((vehicle, index) => (
                  <div key={index}>
                    <a href={vehicle}> {vehicle}</a>
                  </div>
                ))}
              {currentCharacter.vehicles.length === 0 && <p>null</p>}
            </TableData>
          </tr>
          <tr>
            <TableHeader>Starships</TableHeader>
            <TableData>
              {currentCharacter.starships.length > 0 &&
                currentCharacter.starships.map((starship, index) => (
                  <div key={index}>
                    <a href={starship}> {starship}</a>
                  </div>
                ))}
              {currentCharacter.starships.length === 0 && <p>null</p>}
            </TableData>
          </tr>
          <tr>
            <TableHeader>Created</TableHeader>
            <TableData>
              <Moment>{currentCharacter.created}</Moment>
            </TableData>
          </tr>
          <tr>
            <TableHeader>Edited</TableHeader>
            <TableData>
              <Moment>{currentCharacter.edited}</Moment>
            </TableData>
          </tr>
          <tr>
            <TableHeader>URL</TableHeader>
            <TableData>
              <a href={currentCharacter.url}> {currentCharacter.url}</a>
            </TableData>
          </tr>
        </Table>
      </MainContainer>
    );
  } else if (loading && error == null) {
    return (
      <div>
        <h1>CharacterDetail</h1>
        <h2>loading...</h2>
      </div>
    );
  } else {
    return (
      <div>
        <h1>CharacterDetail</h1>
        <h2>{error}</h2>
      </div>
    );
  }
};
