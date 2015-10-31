# spotify-terminal

Spotify without reaching out to the trackpad. 80.7% increase in productivity guaranteed![^1]

[^1]: [100.3% accurate](http://1.bp.blogspot.com/-UDrkX2ogEgE/VXfY9PmU8pI/AAAAAAAAIwE/Ry5U7tUF5mk/s1600/1.jpg)

## Installation

Get [Spotify](https://www.spotify.com/).

```
$ [sudo] npm install -g spotify-terminal
```

## Usage

For all available commands run

```
$ music --help
```

Note: You can use either `music` or `spotify`.

##### Search and play

```
$ music play drake
```

Input the number of the track you'd like to hear and hit enter. Spotify will start playing the album the track is in, starting with the selected track.

##### Next, previous, play/pause

We've all used headphones with single-button controls. Same idea. Play/pause is one `.`, next is two `..`, prev is three `...`.

```
$ music ..
```

##### Options

 - `-v` [0..100] change volume
 - `-b` jump backward N seconds
 - `-j` jump to N seconds
 - `-f` jump forward N seconds
 - `-s` Toggle shuffle
 - `-r` Toggle repeat playlist

Jumps to the 60 second mark, then forward 30 seconds, then backwards 10 seconds. Toggles repeat playlist. Toggles shuffle, and then cranks up the volume to 100%.

```
$ music -j 60 -f 30 -b 10 -r -s -v 100
```

This package uses [dronir's awesome SpotifyControl script](https://github.com/dronir/SpotifyControl), and is based on a fork of [music by sjkaliski](https://github.com/sjkaliski/music). 👏👏

