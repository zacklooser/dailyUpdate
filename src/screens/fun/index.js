import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Share as Shares,
  ActivityIndicator,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Clipboard from '@react-native-clipboard/clipboard';
import Carousel from 'react-native-snap-carousel';
import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';
import {getActivity, getJoke, getMemes} from '../../api';
import {showToast} from '../../utils/toast';
import {THEME, WHITE} from '../../utils/colors';
import {DEVICE_WITDTH} from '../../utils/globalConfig';
import {FunIcons} from '../../components/textInputIcon/textInputIcon';
import {BackgroundTheme} from '../../components/background/background';
import {useSelector, useDispatch} from 'react-redux';
import {styles} from './style';

const initActivityData = {
  activity: 'Teach your dog a new trick',
  accessibility: 0.15,
  type: 'relaxation',
  participants: 1,
  price: 0.05,
};

const fs = RNFetchBlob.fs;
let imagePath = null;

const fun = () => {
  const userData = useSelector(state => state.login);
  const [joke, setJoke] = useState([]);
  const [meme, setMeme] = useState([]);
  const [activity, setActivity] = useState(initActivityData);
  const [isJokeSelected, setJokeSelected] = useState(true);

  useEffect(() => {
    initActivity();
    initJoke();
    initMemes();

    setInterval(() => {
      initActivity();
    }, 10000);
  }, []);

  const initActivity = async () => {
    const activity = await getActivity();
    setActivity(activity.data);
  };
  const initJoke = async () => {
    const jokes = await getJoke();
    if (jokes.status == 200) setJoke(jokes.data);
  };
  const initMemes = async () => {
    const memes = await getMemes();
    setMeme(memes.data.data.memes);
  };
  const copyToClipboard = joke => {
    Clipboard.setString(joke);
    showToast('Jokes copied to clipboard');
  };
  const onShare = async joke => {
    try {
      const result = await Shares.share({
        message: joke,
      });
    } catch (error) {
      alert(error.message);
    }
  };
  const onShareImage = async meme => {
    RNFetchBlob.config({
      fileCache: true,
    })
      .fetch('GET', meme.url)
      .then(resp => {
        imagePath = resp.path();
        return resp.readFile('base64');
      })
      .then(async base64Data => {
        const shareOptions = {
          title: 'Share file',
          url: `data:image/gif;base64,${base64Data}`,
          failOnCancel: false,
        };
        try {
          const ShareResponse = await Share.open(shareOptions);
        } catch (error) {
          console.log('Error =>', error);
        }
        return fs.unlink(imagePath);
      });
  };
  const generateJokesFormat = item => {
    var jokes = `#${item.item.type}\n`;
    var jokes = `${jokes}Q: ${item.item.setup}\n`;
    var jokes = `${jokes}A: ${item.item.punchline}`;
    return jokes;
  };

  const AddtoJokes = async ({item}) => {
    var newJokes = [];

    const FavouriteJokes = await firestore()
      .collection('FavouriteJokes')
      .doc(userData.credential.email)
      .get();

    if (FavouriteJokes.data() == undefined) {
      newJokes.push(item);
    } else {
      newJokes = [...FavouriteJokes.data().data];
      const verifyingItem = newJokes.filter((i)=>i.id==item.id)
      if(verifyingItem=='')
        newJokes.push(item);
      else return showToast('Already Added to favorites');
    }

    firestore()
      .collection('FavouriteJokes')
      .doc(userData.credential.email)
      .set({data: newJokes})
      .then(() => {
        showToast('Added to favorites');
      })
      .catch(err => {
        alert(err);
      });
  };

  const renderJokeItem = item => (
    <View style={styles.jokesContainer}>
      <View style={styles.jokesControls}>
        <Text style={styles.typeText}>{`#${item.item.type}`}</Text>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => copyToClipboard(generateJokesFormat(item))}
            style={styles.copyButton}>
            <FunIcons iconName="copy1" colorName={WHITE} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => AddtoJokes(item)}
            style={styles.favoritesButton}>
            <FunIcons iconName="hearto" colorName={WHITE} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onShare(generateJokesFormat(item))}
            style={styles.shareButton}>
            <FunIcons iconName="sharealt" colorName={WHITE} />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.question}>{`Q: ${item.item.setup}`}</Text>
      <Text style={styles.answer}>{`A: ${item.item.punchline}`}</Text>
    </View>
  );
  const renderMemesItem = ({item}) => {
    return (
      <View>
        <ImageBackground
          style={styles.imageBackground}
          source={{
            uri: item.url,
          }}
          resizeMode="contain">
          <View>
            <View style={styles.memesLikeContainer}>
              <TouchableOpacity style={styles.memesLike}>
                <FunIcons iconName="hearto" colorName={WHITE} />
              </TouchableOpacity>
            </View>
            <View style={styles.memesShareContainer}>
              <TouchableOpacity
                onPress={() => onShareImage(item)}
                style={styles.memesShare}>
                <FunIcons iconName="sharealt" colorName={WHITE} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.tagContainer}>
            <Text style={styles.tagText}>{item.name}</Text>
          </View>
        </ImageBackground>
      </View>
    );
  };
  return (
    <View>
      <BackgroundTheme></BackgroundTheme>
      <View style={styles.container}>
        <View style={styles.makeCenter}>
          <Text style={styles.boredText}>{`Getting Bored? Try this`}</Text>
          <Text style={styles.themeColor}>
            {activity.type + ': ' + activity.activity}
          </Text>
        </View>
        <View style={styles.navigationContainer}>
          <TouchableOpacity
            onPress={() => setJokeSelected(true)}
            style={
              isJokeSelected
                ? styles.navigationSelected
                : styles.navigationDeSelected
            }>
            <Text
              style={
                isJokeSelected
                  ? styles.navigationSelectedText
                  : styles.navigationDeSelectedText
              }>
              JOKES
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setJokeSelected(false)}
            style={
              !isJokeSelected
                ? styles.navigationSelected
                : styles.navigationDeSelected
            }>
            <Text
              style={
                !isJokeSelected
                  ? styles.navigationSelectedText
                  : styles.navigationDeSelectedText
              }>
              MEMES
            </Text>
          </TouchableOpacity>
        </View>
        {isJokeSelected ? (
          <View style={styles.jokesList}>
            {joke.length > 0 ? (
              <FlatList
                showsVerticalScrollIndicator={false}
                data={joke}
                renderItem={renderJokeItem}
              />
            ) : (
              <View>
                <ActivityIndicator size="small" color={THEME} />
              </View>
            )}
          </View>
        ) : (
          <View style={styles.memesList}>
            {meme.length > 0 ? (
              <Carousel
                data={meme}
                renderItem={renderMemesItem}
                sliderWidth={DEVICE_WITDTH}
                itemWidth={DEVICE_WITDTH}
                layout={'default'}
              />
            ) : (
              <View>
                <ActivityIndicator size="small" color={THEME} />
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

export default fun;
