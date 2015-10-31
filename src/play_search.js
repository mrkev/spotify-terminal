'use strict';
/* global console, require, module */

var rp = require('request-promise'),
    colors  = require('colors'),
    ellipsize = require('ellipsize'),
    inquirer = require('inquirer'),
    control = require('./control');
    
module.exports = function (title) {
  look_for(title)
  .then(user_picks_list)
  .then(play_track)
  .catch(console.trace);
};

/**
 * Calls Spotify API in search for a track.
 * @param  {String} query to search
 * @return  Promise to response data.
 */
var look_for = function (query) {
  console.log(colors.bold('Searching Spotify for "' + query + '"...'));
  return rp('http://ws.spotify.com/search/1/track.json?q=' + query);
};

/**
 * Prompts the user to pick a track to play
 * using an interactive list.
 * @param  {Array} tracks  tracks available for choosing
 * @return {Object}        track the user chose
 */
var user_picks_list = function (data) { return new Promise(function (res) {
  var tracks = JSON.parse(data).tracks.slice(0, 50);
  
  if (tracks.length === 0) {
    console.log(colors.bold(colors.green('! ') + 'Found nothing!'));
    return res(null);
  }

  inquirer.prompt([
  {
    type      : 'list',
    name      : '_track',
    message   : 'Which track?',
    paginated : false,
    choices   : track_strings(tracks)
  }], function (answers) {

    var track_no = colors.stripColors(answers._track
        .slice(0, answers._track.indexOf(':'))
        .trim());
    res(tracks[parseInt(track_no)-1]);
  });
});};

/**
 * Plays a Spotify track in it's album context
 * @param  {Object} track to play
 */
var play_track = function (track) {
  if (track) control('playinalbum', track.href + ' ' + track.album.href);
};

/////////////////////////////////// Helpers. ///////////////////////////////////

/**
 * Formats tracks into strings to present to
 * the user.
 * @param  {Array} tracks to present
 * @return {Array}        of formatted strings
 */
var track_strings = function (tracks) {

  // Cut all track names, artists, albums at 21, 21, 20
  // characters respectively
  tracks = tracks.map(function (t) {
    t.name = ellipsize(t.name, 21);
    t.artists[0].name = ellipsize(t.artists[0].name, 21);
    t.album.name = ellipsize(t.album.name, 20);
    return t;
  });

  var maxTitleLength  = Math.max.apply(Math, tracks.map(function (t) {return t.name.length;}));
  var maxArtistLength = Math.max.apply(Math, tracks.map(function (t) {return t.artists[0].name.length;}));
  console.log(maxTitleLength, maxArtistLength)
  return tracks.map(function (track, index) {
    var titleLengthDiff  = maxTitleLength  - track.name.length;
    var artistLengthDiff = maxArtistLength - track.artists[0].name.length;

    var trackPadding = (titleLengthDiff) === 0 ? ' ' : new Array(titleLengthDiff + 2).join(' ');
    var artistPadding = (artistLengthDiff) === 0 ? ' ' : new Array(artistLengthDiff + 2).join(' ');

    var msg = 
      (++index < 10 ? '  ' : ' ') + colors.grey(index + ': ') +
      colors.underline(track.name) + trackPadding + ' ' + artistPadding +
      colors.green(track.artists[0].name) + ' 💿  ' +
      colors.underline(track.album.name);

    return msg;
  });
};
