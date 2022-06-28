import React from 'react';

import { useBreakpointValue, GridItem, Box } from '@chakra-ui/react';
import Card from './Card';
import { Swiper, SwiperSlide } from 'swiper/react';
// import Swiper core and required modules
// import { Pagination } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

// install Swiper modules
// SwiperCore.use([Pagination]);

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
                <Swiper autoHeight pagination={{ hide: 'true' }}>
                    {listOfItems.map((item) => {
                        return (
                            <SwiperSlide key={item.id}>
                                <Box key={item.id} overflow="hidden" borderRadius="lg" borderWidth="1px" mx={'10%'}>
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

                    <Box className="swiper-pagination"></Box>
                </Swiper>
            </GridItem>
        ) : (
            listOfItems.map((item) => {
                return (
                    <GridItem key={item.id} colSpan={cardColSpan} px={{ base: 8, md: 0 }}>
                        <Box key={item.id} overflow="hidden" borderRadius="lg" borderWidth="1px" boxShadow="dark-lg">
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
