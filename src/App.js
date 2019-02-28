import React, { Component } from 'react';
import Searchbar from './components/Searchbar';
import SearchResults from './components/SearchResults';
import Video from './components/Video';
import SearchHistory from './components/SearchHistory';
import Firebase from 'firebase';
import Moment from 'react-moment';

import {connect} from 'react-redux';

import * as actionTypes from './actions/reducerActions';

// Importing the utilities
import SearchVideos from './modules/SearchVideos';
import firebaseConfig from './modules/firebaseConfig';

import './App.css';

Firebase.initializeApp(firebaseConfig);


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTime: Date.now()
    };

    this.databaseRef = Firebase.database().ref();
    this.userInputTimeout = null;
  }

  componentDidMount() {
    // Loading the application with default search and results
    this.defaultSearchData();

    Firebase.auth().onAuthStateChanged(user => {
      this.props.setUser(user);
      
      // Look for search history only if the user is authenticated
      if (this.props.loggedUser)
        this.getSearchListener();
    });

    this.tickInterval = setInterval(() => this.tickClockHandler(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.tickInterval);
  }

  tickClockHandler = () => {
    this.setState({
      currentTime: Date.now()
    });
  }

  defaultSearchData = () => {
    SearchVideos('ReactJS', (videos) => {
      console.log(videos[0]);
      this.props.saveResults('ReactJS', videos, videos[0]);
    });
  }

  signInHandler = () => {
    const googleProv = new Firebase.auth.GoogleAuthProvider();
    Firebase.auth().signInWithPopup(googleProv);
  }

  logoutHandler = () => {
    Firebase.auth().signOut();
    // Resetting to the default search and cleaning the result array when logging out
    this.defaultSearchData();
  }

  searchbarChangeHandler = (event) => {
    const searchingNow = event.target.value;
    this.props.saveResults(searchingNow);

    clearTimeout(this.userInputTimeout);


    this.userInputTimeout = setTimeout(() => {
      if (searchingNow.length < 5) {
        console.log("The search term is too short.");
      } else {
        console.log("Looking for:", searchingNow);
        
        SearchVideos(searchingNow, (videos) => {
          this.props.saveResults(searchingNow, videos);
        });      
      }
    }, 1000);
  }

  selectVideoHandler = (video) => {
    this.props.saveResults(null, null, video);
  }

  saveSearchHandler = (searchKey) => {
    console.log("Saving search:", searchKey, "for:", this.props.loggedUser.uid);
    
    const pushItem = {
      user: this.props.loggedUser.displayName,
      id: Date.now()+Math.random(),
      timestamp: Date.now(),
      searchKey: searchKey
    }

    this.databaseRef.child('favoriteSearches/'+this.props.loggedUser.uid).push(pushItem);
  }

  getSearchListener = () => {
    this.databaseRef.child('favoriteSearches/'+this.props.loggedUser.uid)
    .on('value', searches => {
      if (searches.exists()) {
        this.props.loadHistory(Object.values(searches.val()));
      } else {
        this.props.loadHistory(null);
      }      
    });
  }

  clickHistoryHandler = (prevSearch) => {
    this.searchbarChangeHandler({target: {value: prevSearch.searchKey}})
  }

  render() {
    let appView = null;

    // Checking if the user is already logged in.
    if (this.props.loggedUser) {
     appView =  (
      <div>
        <button className="logout__button" onClick={this.logoutHandler}>Logout {this.props.loggedUser.displayName} ({this.props.loggedUser.email}) </button>
        <Searchbar 
          search={this.props.currentTerm}
          changeHandler={this.searchbarChangeHandler}
          saveSearchHan={this.saveSearchHandler} />
            
        <Video video={this.props.selectedVideo} />
            
        <SearchResults
          videos={this.props.videoData}
          clickHandler={this.selectVideoHandler} />

        <SearchHistory 
          searches={this.props.historyData}
          clickHandler={this.clickHistoryHandler} />

        <Moment format="YYYY/MM/DD HH:mm:ss">{this.state.currentTime}</Moment>
      </div>
      );
    } else {
      appView = <button className="login__button" onClick={this.signInHandler}>Login</button>
    }


    return (
      <div className="App">
        {appView}
      </div>
      
    );
  }
}

// Map the dispatching actions on the store
const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => dispatch(actionTypes.setUser(user)),
    loadHistory: (historyData) => dispatch(actionTypes.loadHistory(historyData)),
    saveResults: (term, videoData, selectedVideo) => dispatch(actionTypes.saveResults(term, videoData, selectedVideo)),
  }
}

// Map the store state to props
const mapStateToProps = (state) => {
  return {
    loggedUser: state.user,
    historyData: state.searches,
    currentTerm: state.searchKey,
    videoData: state.returnedVideos,
    selectedVideo: state.selectedVideo
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
