import React from 'react';

import { useBreakpointValue, GridItem, Box } from '@chakra-ui/react';
import Card from './Card';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
const ItemList = ({
  listOfItems,
  titleFilter,
  selectedCountry,
  selectedProviders,
  handleRemove,
  currentSearchType,
  refreshItem,
}) => {
  const cardColSpan = useBreakpointValue({ base: 12, md: 6, lg: 4, xl: 3 });
  const viewBreakPoint = useBreakpointValue({ base: 'swipe', md: 'block' });
  return listOfItems != null || listOfItems.length !== 0 ? (
    viewBreakPoint === 'swipe' ? (
      <GridItem colSpan={12}>
        <Swiper spaceBetween={50}>
          {listOfItems.map((item) => {
            return (
              <SwiperSlide>
                <Box
                  key={item.id}
                  overflow="hidden"
                  borderRadius="lg"
                  borderWidth="1px"
                  mx={4}
                >
                  <Card
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    image={item.poster}
                    release_date={item.release_date}
                    watch_providers={item.watch_providers}
                    external_ids={item.external_ids}
                    handleRemove={handleRemove}
                    currentSearchType={currentSearchType}
                    refreshItem={refreshItem}
                  />
                </Box>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </GridItem>
    ) : (
      listOfItems.map((item) => {
        return (
          <GridItem key={item.id} colSpan={cardColSpan} px={{ base: 8, md: 0 }}>
            <Box
              key={item.id}
              overflow="hidden"
              borderRadius="lg"
              borderWidth="1px"
            >
              <Card
                key={item.id}
                id={item.id}
                title={item.title}
                image={item.poster}
                release_date={item.release_date}
                watch_providers={item.watch_providers}
                external_ids={item.external_ids}
                handleRemove={handleRemove}
                currentSearchType={currentSearchType}
                refreshItem={refreshItem}
              />
            </Box>
          </GridItem>
        );
      })
    )
  ) : (
    <div>Loading...</div>
  );
};
export default ItemList;
