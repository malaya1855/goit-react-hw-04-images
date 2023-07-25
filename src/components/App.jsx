import { useEffect, useState } from 'react';

import { SearchBar, ImageGallery, Button, Loader, TextEmpty } from 'components';
import * as ImageApi from './utilities/imageApi';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [photos, setPhotos] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    if (!query) {
      return;
    }
    setIsLoading(true);
    ImageApi.getImages(query, page)
      .then(({ hits, totalHits }) => {
        setPhotos(prevPhotos => [...prevPhotos, ...hits]);
        setShowMore(page < Math.ceil(totalHits / 12));
        setIsEmpty(hits.length === 0);
      })
      .catch(error => console.log(error))
      .finally(() => setIsLoading(false));
  }, [query, page]);

  const onHandleSubmit = query => {
    setQuery(query);
    setPage(1);
    setPhotos([]);
    setShowMore(false);
    setIsLoading(true);
  };

  const onHandleClick = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div>
      <SearchBar onHandleSubmit={onHandleSubmit} />
      <ImageGallery items={photos} />

      {showMore && <Button onClick={onHandleClick}>Load more</Button>}
      {isEmpty && <TextEmpty query={query} />}
      {isLoading && <Loader />}
    </div>
  );
};
