import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Pagination,
  TextField,
  Button,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { getEpisodes } from '../../api/episodes';
import { Episode } from '../../types/Episode';
import { getSearchWith } from '../../utils/searchHelper';
import './EpisodesPage.scss';

export const EpisodesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page' || '');
  const name = searchParams.get('name') || '';
  const { search } = useLocation();
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [pagesNumber, setPagesNumber] = useState<number>(1);
  const [findError, setFindError] = useState<boolean>(false);
  const [actualPage, setActualPage] = useState<number | undefined>(1);

  useEffect(() => {
    const loadData = async () => {
      try {
        const loadedEpisodes = await getEpisodes('');

        setEpisodes(loadedEpisodes.results);
        setPagesNumber(loadedEpisodes.info.pages);
      } catch {
        setFindError(true);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        const loadedEpisodes = await getEpisodes(search);

        setEpisodes(loadedEpisodes.results);
        setPagesNumber(loadedEpisodes.info.pages);
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
  }, [page, name]);

  const onPageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setActualPage(value);
    setSearchParams(
      getSearchWith(searchParams, { page: String(value) || null }),
    );
  };

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFindError(false);
    setSearchParams(
      getSearchWith(searchParams, {
        name: event.target.value || null,
        page: null,
      }),
    );
  };

  return (
    <div className="episodesPage">
      {episodes.length === 0
        ? (
          <Box className="loader">
            <CircularProgress />
          </Box>
        )
        : (
          <>
            <div className="episodesPage-filters">
              <Pagination
                page={actualPage || 1}
                count={pagesNumber}
                color="secondary"
                className="pagination"
                onChange={onPageChange}
              />

              <TextField
                sx={{ width: 210, background: 'rgba(161,21,207, 0.5)' }}
                label="Search name"
                variant="filled"
                onChange={onNameChange}
                value={name}
                color="secondary"
                InputLabelProps={{
                  style: {
                    color: 'white',
                  },
                }}
                inputProps={{ style: { color: 'white' } }}
              />

              <Button
                color="secondary"
                variant="contained"
                onClick={() => {
                  setFindError(false);
                  setSearchParams(
                    getSearchWith(searchParams, {
                      page: null,
                      name: null,
                    }),
                  );
                }}
              >
                Reset
              </Button>
            </div>

            {findError
              ? (<div className="episodesPage-error">There is no episode with such query.</div>)
              : (
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Episode</TableCell>
                        <TableCell align="right">Air date</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {episodes.map((episode) => (
                        <TableRow
                          key={episode.name}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">
                            {episode.name}
                          </TableCell>
                          <TableCell align="right">{episode.episode}</TableCell>
                          <TableCell align="right">{episode.air_date}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
          </>
        )}
    </div>
  );
};
