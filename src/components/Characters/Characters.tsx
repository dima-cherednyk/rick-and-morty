/* eslint-disable no-console */
import {
  Select,
  MenuItem,
  SelectChangeEvent,
  InputLabel,
  FormControl,
  Box,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { getCharacters } from '../../api/characters';
import { Character } from '../../types/Character';
import { Card } from '../Card/Card';
import './Characters.scss';

const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
  20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42];

export const Characters: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [pagesNumber, setPagesNumber] = useState<number>(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page' || '');
  const gender = searchParams.get('gender' || '');
  const species = searchParams.get('species' || '');
  const status = searchParams.get('status' || '');
  const { search } = useLocation();

  useEffect(() => {
    const loadData = async () => {
      try {
        const loadedCharacters = await getCharacters('');

        setCharacters(loadedCharacters.results);
        setPagesNumber(loadedCharacters.info.pages);
      } catch {
        console.log(1);
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
        console.log(1);
      }
    };

    loadData();
  }, [page, gender, species, status]);

  function getSeachWith(params: {[key: string]: string | null }) {
    Object.entries(params).forEach(([key, value]) => {
      if (value === null) {
        searchParams.delete(key);
      } else if (Array.isArray(value)) {
        searchParams.delete(key);

        value.forEach(part => {
          searchParams.append(key, part);
        });
      } else {
        searchParams.set(key, value);
      }
    });

    return searchParams.toString();
  }

  const onPageChange = (event: SelectChangeEvent) => {
    setSearchParams(
      getSeachWith({ page: event.target.value || null }),
    );
  };

  const onGenderChange = (event: SelectChangeEvent) => {
    setSearchParams(
      getSeachWith({
        gender: event.target.value || null,
        page: null,
      }),
    );
  };

  const onSpeciesChange = (event: SelectChangeEvent) => {
    setSearchParams(
      getSeachWith({
        species: event.target.value || null,
        page: null,
      }),
    );
  };

  const onStatusChange = (event: SelectChangeEvent) => {
    setSearchParams(
      getSeachWith({
        status: event.target.value || null,
        page: null,
      }),
    );
  };

  return (
    <>
      <div className="characters-filter">
        <Box>
          <FormControl sx={{ width: 210 }}>
            <InputLabel id="pageSelect">Select page</InputLabel>
            <Select value={page || ''} onChange={onPageChange} labelId="pageSelect" label="Select page">
              <MenuItem value="">Select page</MenuItem>
              {pages.slice(0, pagesNumber).map(n => (
                <MenuItem key={n} value={n}>{n}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box>
          <FormControl sx={{ width: 210 }}>
            <InputLabel id="genderSelect">Select gender</InputLabel>
            <Select value={gender || ''} onChange={onGenderChange} labelId="genderSelect" label="Select gender">
              <MenuItem value="">Select gender</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="unknown">Unknown</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box>
          <FormControl sx={{ width: 210 }}>
            <InputLabel id="statusSpecies">Select species</InputLabel>
            <Select value={species || ''} onChange={onSpeciesChange} labelId="speciesSelect" label="Select species">
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
          <FormControl sx={{ width: 210 }}>
            <InputLabel id="statusSelect">Select status</InputLabel>
            <Select value={status || ''} onChange={onStatusChange} labelId="statusSelect" label="Select status">
              <MenuItem value="">Select status</MenuItem>
              <MenuItem value="Alive">Alive</MenuItem>
              <MenuItem value="Dead">Dead</MenuItem>
              <MenuItem value="unknown">Unknown</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>

      <ul className="characters-list">
        {characters.map(card => (
          <li key={card.id}><Card card={card} /></li>
        ))}
      </ul>
    </>
  );
};
