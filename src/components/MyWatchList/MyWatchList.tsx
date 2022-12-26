import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import {
  Checkbox,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Episode } from '../../types/Episode';
import { getSearchWith } from '../../utils/searchHelper';
import { getEpisodes } from '../../api/episodes';
import './MyWatchList.scss';

const useLocalStorage = (key: string, initialValue: []) => {
  const getDataFromStorage = localStorage.getItem('watchList');

  const storage = getDataFromStorage !== null ? JSON.parse(getDataFromStorage) : initialValue;

  const [value, setValue] = useState(
    storage || initialValue,
  );

  const save = (episode: Episode) => {
    setValue(episode);
    localStorage.setItem(key, JSON.stringify(episode));
  };

  return [value, save];
};

export const MyWatchList: React.FC = () => {
  const [watchList, setWatchList] = useLocalStorage('watchList', []);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [pagesNumber, setPagesNumber] = useState<number>(1);
  const [actualPage, setActualPage] = useState<number | undefined>(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [findError, setFindError] = useState<boolean>(false);
  const page = searchParams.get('page' || '');
  const name = searchParams.get('name') || '';
  const { search } = useLocation();

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
  }, [page, name, watchList]);

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFindError(false);
    setSearchParams(
      getSearchWith(searchParams, {
        name: event.target.value || null,
        page: null,
      }),
    );
  };

  const onPageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setActualPage(value);
    setSearchParams(
      getSearchWith(searchParams, { page: String(value) || null }),
    );
  };

  const addEpisode = (episode: Episode) => {
    if (watchList.some((item: { name: string; }) => item.name === episode.name)) {
      return null;
    }

    return setWatchList([
      ...watchList,
      {
        ...episode,
        watched: false,
      },
    ]);
  };

  const deleteEpisode = (episode: Episode) => {
    const updatedList = watchList.filter((item: { name: string; }) => item.name !== episode.name);

    return setWatchList(updatedList);
  };

  const handleChange = (episode: Episode) => {
    const changeStatus = watchList.find((item: { name: string; }) => item.name === episode.name);
    const updatedList = watchList.map((item: { name: string; }) => {
      if (item.name !== episode.name) {
        return item;
      }

      return {
        ...item,
        watched: !changeStatus.watched,
      };
    });

    setWatchList(updatedList);
  };

  return (
    <div className="myWatchPage">
      <div className="myWatchPage-search">
        <TextField
          sx={{ width: 210, background: 'rgba(161,21,207, 0.5)' }}
          label="Write an episode name."
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

        {name !== '' && (
          <>
            <Pagination
              page={actualPage || 1}
              count={pagesNumber}
              color="secondary"
              className="pagination"
              onChange={onPageChange}
            />

            {findError
              ? (<div className="myWatchPage-error">There is no episode with such query.</div>)
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
                          <TableCell onClick={() => addEpisode(episode)} component="th" scope="row">
                            {episode.name}
                          </TableCell>
                          <TableCell onClick={() => addEpisode(episode)} align="right">{episode.episode}</TableCell>
                          <TableCell onClick={() => addEpisode(episode)} align="right">{episode.air_date}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
          </>
        )}
      </div>

      <div className="myWatchPage-list">
        <Typography variant="h3" gutterBottom color="white">
          My watchList
        </Typography>
        {watchList.length !== 0
          ? (
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell />
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {watchList.map((item: Episode) => (
                    <TableRow
                      key={item.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={item.watched}
                          onChange={() => handleChange(item)}
                        />
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {item.name}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton edge="end" aria-label="delete" onClick={() => deleteEpisode(item)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )
          : (
            <div className="myWatchPage-error">No episode to watch.</div>
          )}
      </div>
    </div>
  );
};
