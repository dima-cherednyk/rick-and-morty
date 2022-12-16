import {
  Select,
  MenuItem,
  SelectChangeEvent,
  InputLabel,
  FormControl,
  Box,
  Pagination,
  Button,
  CircularProgress,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { getCharacters } from '../../api/characters';
import { Character } from '../../types/Character';
import { getSearchWith } from '../../utils/searchHelper';
import { Cards } from '../Cards/Cards';
import './CharactersPage.scss';

export const CharactersPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page' || '');
  const gender = searchParams.get('gender' || '');
  const species = searchParams.get('species' || '');
  const status = searchParams.get('status' || '');
  const { search } = useLocation();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [pagesNumber, setPagesNumber] = useState<number>(1);
  const [actualPage, setActualPage] = useState<number | undefined>(1);
  const [findError, setFindError] = useState<boolean>(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const loadedCharacters = await getCharacters('');

        setCharacters(loadedCharacters.results);
        setPagesNumber(loadedCharacters.info.pages);
      } catch {
        setFindError(true);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        const loadedCharacters = await getCharacters(search);

        setCharacters(loadedCharacters.results);
        setPagesNumber(loadedCharacters.info.pages);
      } catch {
        setFindError(true);
      }
    };

    if (page) {
      setActualPage(+page);
    }

    if (!page) {
      setActualPage(1);
    }

    loadData();
  }, [page, gender, species, status]);

  const onPageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setActualPage(value);
    setSearchParams(
      getSearchWith(searchParams, { page: String(value) || null }),
    );
  };

  const onGenderChange = (event: SelectChangeEvent) => {
    setFindError(false);
    setSearchParams(
      getSearchWith(searchParams, {
        gender: event.target.value || null,
        page: null,
      }),
    );
  };

  const onSpeciesChange = (event: SelectChangeEvent) => {
    setFindError(false);
    setSearchParams(
      getSearchWith(searchParams, {
        species: event.target.value || null,
        page: null,
      }),
    );
  };

  const onStatusChange = (event: SelectChangeEvent) => {
    setFindError(false);
    setSearchParams(
      getSearchWith(searchParams, {
        status: event.target.value || null,
        page: null,
      }),
    );
  };

  return (
    <div className="charactersPage">
      {characters.length === 0
        ? (
          <Box className="loader">
            <CircularProgress />
          </Box>
        )
        : (
          <>
            <div className="charactersPage-filter">
              <Pagination
                page={actualPage || 1}
                count={pagesNumber}
                color="secondary"
                onChange={onPageChange}
                className="pagination"
              />

              <Box>
                <FormControl sx={{ width: 210, background: 'rgba(161,21,207, 0.5)' }} variant="filled">
                  <InputLabel
                    id="genderSelect"
                    sx={{
                      color: 'white',
                      '&.Mui-focused': {
                        color: 'white',
                      },
                    }}
                  >
                    Select gender
                  </InputLabel>
                  <Select
                    value={gender || ''}
                    onChange={onGenderChange}
                    labelId="genderSelect"
                    label="Select gender"
                    color="secondary"
                    sx={{
                      color: 'white',
                    }}
                  >
                    <MenuItem value="">Select gender</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="unknown">Unknown</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box>
                <FormControl sx={{ width: 210, background: 'rgba(161,21,207, 0.5)' }} variant="filled">
                  <InputLabel
                    id="statusSpecies"
                    sx={{
                      color: 'white',
                      '&.Mui-focused': {
                        color: 'white',
                      },
                    }}
                  >
                    Select species
                  </InputLabel>
                  <Select
                    value={species || ''}
                    onChange={onSpeciesChange}
                    labelId="speciesSelect"
                    label="Select species"
                    color="secondary"
                    sx={{
                      color: 'white',
                    }}
                  >
                    <MenuItem value="">Select species</MenuItem>
                    <MenuItem value="Humanoid">Humanoid</MenuItem>
                    <MenuItem value="Human">Human</MenuItem>
                    <MenuItem value="Alien">Alien</MenuItem>
                    <MenuItem value="Poopybutthole">Poopybutthole</MenuItem>
                    <MenuItem value="Mythological Creature">Mythological Creature</MenuItem>
                    <MenuItem value="Robot">Robot</MenuItem>
                    <MenuItem value="Animal">Animal</MenuItem>
                    <MenuItem value="Cronenberg">Cronenberg</MenuItem>
                    <MenuItem value="Disease">Disease</MenuItem>
                    <MenuItem value="unknown">unknown</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box>
                <FormControl sx={{ width: 210, background: 'rgba(161,21,207, 0.5)' }} variant="filled">
                  <InputLabel
                    id="statusSelect"
                    sx={{
                      color: 'white',
                      '&.Mui-focused': {
                        color: 'white',
                      },
                    }}
                  >
                    Select status
                  </InputLabel>
                  <Select
                    value={status || ''}
                    onChange={onStatusChange}
                    labelId="statusSelect"
                    label="Select status"
                    color="secondary"
                    sx={{
                      color: 'white',
                    }}
                  >
                    <MenuItem value="">Select status</MenuItem>
                    <MenuItem value="Alive">Alive</MenuItem>
                    <MenuItem value="Dead">Dead</MenuItem>
                    <MenuItem value="unknown">Unknown</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Button
                color="secondary"
                variant="contained"
                onClick={() => {
                  setFindError(false);
                  setSearchParams(
                    getSearchWith(searchParams, {
                      page: null,
                      gender: null,
                      species: null,
                      status: null,
                    }),
                  );
                }}
              >
                Reset
              </Button>
            </div>
            <ul className="charactersPage-list">
              {findError
                ? (<li className="charactersPage-error">There is no character with such query.</li>)
                : (
                  characters.map(card => (
                    <li key={card.id}><Cards card={card} /></li>
                  ))
                )}
            </ul>
          </>
        )}
    </div>
  );
};
