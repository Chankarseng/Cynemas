import { React } from 'react';
import {
  Center,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Container,
  Heading,
  Link,
  Stack,
  Box,
} from '@chakra-ui/react';
const Faq = () => {
  return (
    <Container maxW="container.xl" p={10} py={20}>
      <Stack spacing={10}>
        <Center>
          <Heading fontSize="5xl">FAQ</Heading>
        </Center>

        <Accordion defaultIndex={[0]} allowMultiple allowToggle>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  What is this website?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel py={4}>
              Cynemas is a personal movie / tv dashboard that allows you to view
              multiple items at one screen at a time to display what streaming
              services your selected items are on.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  How to use this website?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel py={4}>
              Once you landed to this website, the first thing you will see is
              the 'search movie mode', click on the search bar at the top of the
              screen to activate the dropdown menu that displays the current day
              trending items. To search for a particular movie / tv show, start
              typing in the search bar, and once the item is displayed at the
              search bar, click on the item to select it. You may have multiple
              items in the search bar at once. Once you have the items that you
              want, click on the 'submit' button to store it in your dashboard.{' '}
              <br />
              <br />
              To switch mode, click on the "Switch to search" button at the
              header to switch to searching for the corresponding items.
              <br />
              <br />
              Once you have items in your dashboard, it will display the title
              of the movie, the released date, as well as external links to the
              items (IMDB, TMDB or Letterboxd). If the items that you have
              selected is available on streaming platforms, it will displays
              some icons sorted by popularity of the streaming platform. Else,
              it will display a short message to check back in later.
              <br />
              <br />
              By clicking the "See full details" button, a popup display will
              appear and display all the streaming services and countries this
              items is currently streaming. In the popup there are three tabs,
              "Streaming", "Streaming w/ Ads", and "Free". By default, the tab
              will select on the "Streaming" tab. If the item is not streaming
              with ads or free, the tabs will be disabled.
              <br />
              <br />
              Clicking the 'Refresh' button on the item card will refresh the
              item to load all the latest infomation on the item. For example,
              if a new movie is released on streaming platform, but it says that
              it is not currently streaming, you may wait a couple of days and
              click on the refresh button to retrieve the streaming info for the
              item.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  Why can't I search for the item i wanted?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel py={4}>
              Currently, the search queries only searches for movies / tv shows
              in their english name, so if you're looking for foreign items, you
              may want to look for it's english name and input the corresponding
              english name into the search bar to find the item.
              <br />
              <br />
              However, if you are still having issues looking for the items you
              want, it could be due to As this website uses data from{' '}
              <Link
                href="https://www.themoviedb.org"
                isExternal
                color="teal.500"
              >
                TMDB
              </Link>{' '}
              not having the item in its database. If you wish to do so, you may
              add the missing movie / tv show on As this website uses data from{' '}
              <Link
                href="https://www.themoviedb.org"
                isExternal
                color="teal.500"
              >
                TMDB
              </Link>{' '}
              interface (You need an account to do so).
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  Why is the item I searched for doesn't display its streaming
                  services?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel py={4}>
              As this website uses data from TMDB, not all of its infomation
              might be up to date, and the data are usually crowd sourced. You
              may read more about it. Added on to that, the streaming services
              data that TMDB is using is provided by{' '}
              <Link
                href="https://www.justwatch.com"
                isExternal
                color="yellow.500"
              >
                JustWatch
              </Link>
              , which might need some time to sync up the data between these two
              platforms. For this however, there is not much you can do but to
              just wait until TMDB update it's data.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  Will any personal infos be saved?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel py={4}>
              Nope! This website doesn't require any personal info to use, thus
              we won't save any of your info in some database.
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Stack>
    </Container>
  );
};

export default Faq;
