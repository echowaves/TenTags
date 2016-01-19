'use strict';

var React = require('react-native');

var {
  StyleSheet,
} = React;

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff2e5",
  },

  content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',

  },


  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 64,
    // backgroundColor: "#779966",
    backgroundColor: "#669999",
  },
  leftMenuItem: {
    alignSelf: 'flex-end',
    margin: 5,
  },
  title: {
    fontWeight: '200',
    fontSize: 25,
    color: "#000000",
    fontFamily: 'Helvetica',
    alignSelf: 'flex-end',
    margin: 5,
  },
  rightMenuItem: {
    alignSelf: 'center',
    margin: 15,
    marginTop: 22,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 4,
    paddingBottom: 4,
    borderRadius: 5,
    backgroundColor: "red",
  },


  hashTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    // height: 35,
  },
  hashTagWrapper: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ff9933",
    backgroundColor: "#ffd9b3",
    margin: 1,
    padding: 1,
  },
  hashTagHolder: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  hashTag: {
    // lineHeight: 25,
    fontWeight: '400',
    fontSize: 25,
    color: "#669999",
    fontFamily: 'Helvetica',
    margin: 3,
    padding: 3,

  },


  buttonWraper: {
    alignSelf: 'center',
    margin: 15,
    marginTop: 22,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 4,
    paddingBottom: 4,
    borderRadius: 5,
    backgroundColor: "#669999",
  },
  buttonText: {
    color: "white",
    fontWeight: '400',
    fontSize: 25,
    // color: "#003399",
    fontFamily: 'Helvetica',
    margin: 3,
    padding: 3,
  },

  textSmall: {
    fontWeight: '200',
    fontSize: 14,
    color: "#666666",
    fontFamily: 'Helvetica',
    // justifyContent: 'center',
  },
  textBig: {
    fontWeight: '400',
    fontSize: 24,
    color: "#888888",
    fontFamily: 'Helvetica',
    // justifyContent: 'center',
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }


});
