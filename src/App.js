import React, { Component } from 'react';
import Searchbar from './components/Searchbar';
import SearchResults from './components/SearchResults';
import Video from './components/Video';
import SearchHistory from './components/SearchHistory';
import Firebase from 'firebase';

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
      searches: []
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
      this.getSearchListener();
    });
  }

  signInHandler = () => {
    const googleProv = new Firebase.auth.GoogleAuthProvider();
    Firebase.auth().signInWithPopup(googleProv);
  }

  logoutHandler = () => {
    Firebase.auth().signOut();
  }

  searchbarChangeHandler = (event) => {
    const searchingNow = event.target.value;

    if (searchingNow.length < 5) {
      console.log("The search term is too short.");
      this.setState({
        searchKey: searchingNow,
      });

    } else {
      console.log("Looking for:", searchingNow);

      /*SearchVideos(searchingNow, (videos) => {
        this.setState( {
          searchKey: searchingNow,
          returnedVideos: videos,
        });
      });*/

      this.setState({
        searchKey: searchingNow,
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

  clickHistoryHandler = (event) => {
    // TODO: when clicking one of the seach history, it should set that text on the value of the searchbar
  }

  render() {
    let appView = null;

    // Checking if the user is already logged in.
    if (this.state.user) {
     appView =  (
      <div>
        <button className="logout__button" onClick={this.logoutHandler}>Logout {this.state.user.displayName} </button>
        <Searchbar 
          search={this.state.searchKey}
          changeHandler={this.searchbarChangeHandler}
          saveSearchHan={this.saveSearchHandler} />
            
        <Video video={this.state.selectedVideo} />
            
        <SearchResults
          videos={this.state.returnedVideos}
          clickHandler={this.selectVideoHandler} />

        <SearchHistory searches={this.state.searches} />
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
