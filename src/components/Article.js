import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { Typography } from '@mui/material';
import { Box } from '@mui/system';

import { getPostsId } from '../api';

import { ReactComponent as ArrowIcon } from '../assets/icons/arrow-left.svg';

import styles from './Article.module.scss';

const Article = () => {
  const { articleId } = useParams();
  const [article, setArticle] = useState({});
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getPostsId(articleId).then((responce) => {
      setArticle(responce);
      setLoading(false);
    });
  }, [articleId]);

  if (isLoading) {
    return <p>Loadin...</p>;
  }

  return (
    <Box sx={{ height: '100%', background: '#FFFFFF', pb: '45px' }}>
      <Box
        sx={{
          backgroundImage: `url(${article.data.imageUrl})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center top',
          backgroundSize: 'auto',
          pb: '245px',
          mb: '941px',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          left: '75px',
          top: '150px',
          width: '1290px',
          height: '1001px',
          backgroundColor: '#fff',
          border: '1px solid #EAEAEA',
          boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.05)',
          borderRadius: '5px',
        }}
      >
        <Typography
          sx={{
            display: 'flex',
            justifyContent: 'center',
            fontSize: '24px',
            lineHeight: '29px',
            color: '#363636',
            mt: '35px',
            mb: '50px',
          }}
        >
          {article.data.title}
        </Typography>
        <Typography sx={{ pl: '75px', pr: '75px', pb: '50px' }}>
          {article.data.summary}
        </Typography>
      </Box>
      <Link
        to='/'
        className={styles.link}
      >
        <ArrowIcon /> Back to homepage
      </Link>
    </Box>
  );
};

export default Article;
