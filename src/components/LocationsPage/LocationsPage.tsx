import React, { useEffect, useState } from 'react';
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
import { useLocation, useSearchParams } from 'react-router-dom';
import { Location } from '../../types/Location';
import { getLocations } from '../../api/locations';
import { getSearchWith } from '../../utils/searchHelper';
import './LocationsPage.scss';

export const LocationsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page' || '');
  const name = searchParams.get('name') || '';
  const type = searchParams.get('type') || '';
  const dimension = searchParams.get('dimension') || '';
  const { search } = useLocation();
  const [locations, setLocations] = useState<Location[]>([]);
  const [pagesNumber, setPagesNumber] = useState<number>(1);
  const [findError, setFindError] = useState<boolean>(false);
  const [actualPage, setActualPage] = useState<number | undefined>(1);

  useEffect(() => {
    const loadData = async () => {
      try {
        const loadedLocations = await getLocations('');

        setLocations(loadedLocations.results);
        setPagesNumber(loadedLocations.info.pages);
      } catch {
        setFindError(true);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        const loadedLocations = await getLocations(search);

        setLocations(loadedLocations.results);
        setPagesNumber(loadedLocations.info.pages);
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
  }, [page, name, type, dimension]);

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

  const onTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFindError(false);
    setSearchParams(
      getSearchWith(searchParams, {
        type: event.target.value || null,
        page: null,
      }),
    );
  };

  const onDimensionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFindError(false);
    setSearchParams(
      getSearchWith(searchParams, {
        dimension: event.target.value || null,
        page: null,
      }),
    );
  };

  return (
    <div className="locationsPage">
      {locations.length === 0
        ? (
          <Box className="loader">
            <CircularProgress />
          </Box>
        )
        : (
          <>
            <div className="locationsPage-filters">
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

              <TextField
                sx={{ width: 210, background: 'rgba(161,21,207, 0.5)' }}
                label="Search type"
                variant="filled"
                onChange={onTypeChange}
                value={type}
                color="secondary"
                InputLabelProps={{
                  style: {
                    color: 'white',
                  },
                }}
                inputProps={{ style: { color: 'white' } }}
              />

              <TextField
                sx={{ width: 210, background: 'rgba(161,21,207, 0.5)' }}
                label="Search dimension"
                variant="filled"
                onChange={onDimensionChange}
                value={dimension}
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
                      type: null,
                      dimension: null,
                    }),
                  );
                }}
              >
                Reset
              </Button>
            </div>

            {findError
              ? (<div className="locationsPage-error">There is no locaton with such query.</div>)
              : (
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Type</TableCell>
                        <TableCell align="right">Dimension</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {locations.map((location) => (
                        <TableRow
                          key={location.name}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">
                            {location.name}
                          </TableCell>
                          <TableCell align="right">{location.type}</TableCell>
                          <TableCell align="right">{location.dimension}</TableCell>
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
