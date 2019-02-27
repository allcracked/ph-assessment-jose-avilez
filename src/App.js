import React, { Component } from 'react';
import Searchbar from './components/Searchbar';
import SearchResults from './components/SearchResults';
import Video from './components/Video';
import SearchHistory from './components/SearchHistory';
import Firebase from 'firebase';
import Moment from 'react-moment';

// Importing the actions
import SearchVideos from './actions/SearchVideos';
import firebaseConfig from './actions/firebaseConfig';

import './App.css';

Firebase.initializeApp(firebaseConfig);


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchKey: '',
      returnedVideos: [],
      selectedVideo: null,
      user: null,
      searches: [],
      currentTime: new Date().toLocaleString()
    };

    this.databaseRef = Firebase.database().ref();
    
  }

  componentDidMount() {
    SearchVideos('ReactJS', (videos) => {
      this.setState({
        searchKey: 'ReactJS',
        returnedVideos: videos,
        selectedVideo: videos[0]
      })
    });

    Firebase.auth().onAuthStateChanged(user => {
      this.setState({
        user: user,
      });
      
      // Look for search history only if the user is authenticated
      if (this.state.user)
        this.getSearchListener();
    });

    this.tickInterval = setInterval(() => this.tickClockHandler(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.tickInterval);
  }

  tickClockHandler = () => {
    this.setState({
      currentTime: new Date().toLocaleString()
    });
  }

  signInHandler = () => {
    const googleProv = new Firebase.auth.GoogleAuthProvider();
    Firebase.auth().signInWithPopup(googleProv);
  }

  logoutHandler = () => {
    Firebase.auth().signOut();

    // Resetting to the default search and cleaning the result array when logging out
    SearchVideos('ReactJS', (videos) => {
      this.setState({
        searchKey: 'ReactJS',
        returnedVideos: videos,
        selectedVideo: videos[0],
        searches: null
      })
    });
  }

  searchbarChangeHandler = (event) => {
    const searchingNow = event.target.value;

    this.setState({
        searchKey: searchingNow,
      });

    if (searchingNow.length < 5) {
      console.log("The search term is too short.");
    } else {
      console.log("Looking for:", searchingNow);
      
      SearchVideos(searchingNow, (videos) => {
        this.setState( {
          searchKey: searchingNow,
          returnedVideos: videos,
        });
      });      
    }
  }

  selectVideoHandler = (video) => {
    this.setState({
      selectedVideo: video,
    });
  }

  saveSearchHandler = (searchKey) => {
    console.log("Saving search:", searchKey, "for:", this.state.user.uid);
    
    const pushItem = {
      user: this.state.user.displayName,
      id: Date.now()+Math.random(),
      timestamp: Date.now(),
      searchKey: searchKey
    }

    this.databaseRef.child('favoriteSearches/'+this.state.user.uid).push(pushItem);
  }

  getSearchListener = () => {
    this.databaseRef.child('favoriteSearches/'+this.state.user.uid)
    .on('value', searches => {
      if (searches.exists()) {
        this.setState({
          searches: Object.values(searches.val()),
        });
      } else {
        this.setState( {
          searches: null,
        });
      }      
    });
  }

  clickHistoryHandler = (prevSearch) => {
    this.searchbarChangeHandler({target: {value: prevSearch.searchKey}})
  }

  render() {
    let appView = null;

    // Checking if the user is already logged in.
    if (this.state.user) {
     appView =  (
      <div>
        <button className="logout__button" onClick={this.logoutHandler}>Logout {this.state.user.displayName} ({this.state.user.email}) </button>
        <Searchbar 
          search={this.state.searchKey}
          changeHandler={this.searchbarChangeHandler}
          saveSearchHan={this.saveSearchHandler} />
            
        <Video video={this.state.selectedVideo} />
            
        <SearchResults
          videos={this.state.returnedVideos}
          clickHandler={this.selectVideoHandler} />

        <SearchHistory 
          searches={this.state.searches}
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

export default App;
