import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { getPosts } from '../api';

import styles from './Articles.module.scss';
import { ReactComponent as ArrowIcon } from '../assets/icons/arrow-right.svg';
import { ReactComponent as CalendarIcon } from '../assets/icons/calendar.svg';
import { ReactComponent as SearchIcon } from '../assets/icons/search-icon.svg';

const Articles = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [text, setText] = useState<string>('');

  useEffect(() => {
    getPosts().then((data) => {
      setArticles(data);
    });
    setLoading(false);
  }, []);

  const filteredArticles = articles.filter((article) => {
    const resultTitle = article.title
      .toLowerCase()
      .includes(text.toLocaleLowerCase());
    const resultSummary = article.summary
      .toLowerCase()
      .includes(text.toLocaleLowerCase());
    return resultTitle && resultSummary;
  });

  // const Compo = ({ higlight, value }) => {
  //   return <p>{getHighlightedText(value, higlight)}</p>;
  // };

  // function getHighlightedText(text: string, higlight: string) {
  //   // Split text on higlight term, include term itself into parts, ignore case
  //   var parts = text.split(new RegExp(`(${higlight})`, 'gi'));
  //   return parts.map((part, index) => (
  //     <React.Fragment key={index}>
  //       {part.toLowerCase() === higlight.toLowerCase() ? (
  //         <b style={{ backgroundColor: '#e8bb49' }}>{part}</b>
  //       ) : (
  //         part
  //       )}
  //     </React.Fragment>
  //   ));
  // }

  if (isLoading) {
    return <p>loading...</p>;
  }

  return (
    <Container maxWidth='xl'>
      <Typography
        sx={{
          mt: '50px',
          mb: '10px',
          fontWeight: 600,
          lineHeight: '20px',
          color: '#363636,',
        }}
      >
        Filter by keywords
      </Typography>
      <TextField
        onChange={({ target: { value } }) => setText(value)}
        id='outlined-basic'
        variant='outlined'
        value={text}
        placeholder='The most successful IT companies in 2020'
        sx={{
          width: '600px',
          height: '55px',
          mb: '40px',
          borderRadius: '5px',
          background: '#fff',
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <Typography sx={{ mb: '50px', fontWeight: 600, lineHeight: '20px' }}>
        Results: {filteredArticles.length}
      </Typography>
      <Grid
        container
        spacing={{ xs: 5 }}
      >
        {filteredArticles.map(
          ({ id, title, imageUrl, summary, publishedAt }) => (
            <Grid
              xs={4}
              key={id}
            >
              <div className={styles.item}>
                <Link to={`${id}`}>
                  <img
                    className={styles.img}
                    src={imageUrl}
                    alt='img'
                  />
                </Link>
                <Typography
                  sx={{
                    m: 2,
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '21px',
                    color: '#363636',
                    opacity: 0.6,
                  }}
                >
                  <CalendarIcon className={styles.calendar__item} />
                  {publishedAt}
                </Typography>
                <Typography
                  sx={{
                    fontSize: '24px',
                    fontWeight: '400',
                    lineHeight: '29px',

                    marginLeft: '16px',
                    marginRight: '16px',
                    height: '58px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                  variant='h2'
                >
                  {title}
                </Typography>
                <Typography
                  sx={{
                    mt: 2,
                    mr: 2,
                    ml: 2,
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '24px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    height: '96px',
                  }}
                  variant='inherit'
                >
                  {summary}
                </Typography>
                <Link
                  className={styles.link}
                  to={`${id}`}
                >
                  Read more
                  <ArrowIcon className={styles.link__item} />
                </Link>
              </div>
            </Grid>
          )
        )}
      </Grid>
    </Container>
  );
};

export default Articles;
