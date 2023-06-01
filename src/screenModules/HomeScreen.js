/**
 * Main component of the application which renders the list of posters along with respective titles
 */

import React, {useState, useEffect, useRef} from 'react';
import {View, FlatList, Dimensions} from 'react-native';
import {Styles} from './HomeStyle';
import GridView from './GridView';
import SearchBar from '../components/SearchBar';
import convertPixelToDp from '../utils/PixelConverter';

const HomeScreen = () => {
  const [content, setContent] = useState([]); // List to show the poster data
  const [pageCount, setPageCount] = useState(0); // Used for pagination
  const [totalItems, setTotalItems] = useState(0); // Used for pagination
  const [searchQuery, setSearchQuery] = useState(''); // Used for searching the poster data
  const onEndReachedCalledDuringMomentum = useRef(true); // Used in pagination for identifying scroll gestures
  const firstRenderCountOne = useRef(true); // To avoid a specific useEffect working in mounting phase
  const firstRenderCountTwo = useRef(true); // To avoid a specific useEffect working in mounting phase
  const searchBarHeight = 192 - (20 + 36); // Effective height of SearchBar as per design
  let {height, width} = Dimensions.get('window'); // Fetches the dimensions of user's device
  var searchTimer = null; // Used in searching of the poster data

  // Workaround for componentDidMount to load the data initially
  useEffect(() => {
    loadData();
  }, []);

  // To get the data during pagination as per respective pageCount
  useEffect(() => {
    if (firstRenderCountOne.current) {
      firstRenderCountOne.current = false;
    } else {
      loadData();
    }
  }, [pageCount]);

  // When user clears the search bar but does not press the back button then also show inital list of poster data
  useEffect(() => {
    if (firstRenderCountTwo.current) {
      firstRenderCountTwo.current = false;
    } else {
      if (searchQuery === '') {
        setPageCount(0);
        loadData();
      }
    }
  }, [searchQuery]);

  // Acts as a database which contains different list of data in 3 different pages
  const arr = [
    require('../mockAPI/CONTENTLISTINGPAGE-PAGE1.json'),
    require('../mockAPI/CONTENTLISTINGPAGE-PAGE2.json'),
    require('../mockAPI/CONTENTLISTINGPAGE-PAGE3.json'),
  ];

  // loadData acts as a function which mocks API hit and then stores the response in component's local state
  const loadData = () => {
    const mockAPIResponse = arr.at(pageCount)?.page; // Mock API hit and response
    setTotalItems(mockAPIResponse?.total_content_items);
    if (pageCount !== 0) {
      // If pageCount > 0 then concatenate the new data from API response with old data component's local state
      setContent([...content, ...mockAPIResponse?.content_items?.content]);
    } else {
      // Else when pageCount = 0 then directly store new data from API response in component's local state without concatenation
      setContent(mockAPIResponse?.content_items?.content);
    }
  };

  // Main function which handles pagination and loads more data when user reaches the end of FlatList
  const loadMoreData = () => {
    // If user has made some search then not load more data to avoid mixing of data
    if (searchQuery) {
      return;
    }

    /**
     * When current count of component's local state data list is less than total count of items in API then,
     * increase pageCount which triggers the useEffect which calls loadData
     */
    if (!onEndReachedCalledDuringMomentum.current) {
      if (content?.length < totalItems) {
        setPageCount(pageCount + 1);
      }
      onEndReachedCalledDuringMomentum.current = true;
    }
  };

  // Effective height of the screen after excluding margins and font height, then divided by 3
  const getGridHeight = () => {
    return (height - convertPixelToDp(516)) / 3;
  };

  // Effective width of the screen after excluding margins, then divided by 3
  const getGridWidth = () => {
    return (width - convertPixelToDp(120)) / 3;
  };

  /**
   * Combining data from all the 3 JSON in one place for efficient searching
   * Works similar to the database searching as searchParam that user passes in API request body gets searched in whole database
   * This array to be used only for searching not for listing
   */
  const searchArr = [
    ...arr.at(0)?.page?.content_items?.content,
    ...arr.at(1)?.page?.content_items?.content,
    ...arr.at(2)?.page?.content_items?.content,
  ];

  /**
   * As user types a character in search bar input field this method triggers
   * This method in turn calls the actual onSearch method after a delay of 500ms to avoid
   * mixing of new search results with the old one's
   */
  const setSearchTimer = searchText => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      onSearch(searchText);
    }, 500);
  };

  /**
   * Method to handle searching
   * Searches the user input in the local searchArr and then sets the output in component's local state
   */
  const onSearch = searchText => {
    setSearchQuery(searchText);
    let searchResults = [];
    const lowerCaseSearchQuery = searchText.toLowerCase();
    searchResults = searchArr?.filter(item =>
      item?.name?.toLowerCase()?.includes(lowerCaseSearchQuery),
    );
    setContent(searchResults);
  };

  /**
   * Method to handle when user taps the back button
   * Set page count to 0 to get the inital data
   * Set search query to clear the search bar
   */
  const onBackButtonPress = () => {
    setPageCount(0);
    setSearchQuery('');
  };

  return (
    <View style={Styles.container}>
      <SearchBar
        height={searchBarHeight}
        onChangeText={setSearchTimer}
        onBack={onBackButtonPress}
      />
      <FlatList
        data={content}
        extraData={content}
        style={{paddingTop: convertPixelToDp(searchBarHeight + 36)}}
        contentContainerStyle={Styles.flatlistContainerStyle}
        renderItem={({item}) => {
          return (
            <GridView
              name={item.name}
              imageName={item.poster_image}
              height={getGridHeight()}
              width={getGridWidth()}
            />
          );
        }}
        keyExtractor={(item, index) => index}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.9}
        onEndReached={loadMoreData}
        onScrollBeginDrag={() => {
          onEndReachedCalledDuringMomentum.current = false;
        }}
        onMomentumScrollBegin={() => {
          onEndReachedCalledDuringMomentum.current = false;
        }}
        onMomentumScrollEnd={() => {
          onEndReachedCalledDuringMomentum.current = false;
        }}
      />
    </View>
  );
};

export default HomeScreen;
