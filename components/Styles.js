import { StyleSheet } from 'react-native';

export const loadingStyle = StyleSheet.create({
    loading: {
        flex: 1,
        justifyContent: 'center'
    }
})

export const signInStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    signInContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        width: 250,
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginRight: 10,
        paddingLeft: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        alignContent: 'center',
    }
  });

export const homeStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
  });

export const searchListStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        marginBottom: 20,
    },
    input: {
        width: '70%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginRight: 10,
        paddingLeft: 10,
    },
    listView: {
        flex: 1, width: '100%'
    },
    image: {
        width: 65,
        height: 90, 
        marginRight: 10,
        marginLeft: 10
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5 
    },
    rowContent: {
        margin: 10,
        flexDirection: 'row',
        alignItems: 'center' 
    },
    buttonView: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
    button: {
        paddingLeft: 10
    },
    bookInfo: {
        flex: 1,
        fontSize: 18 
    },
    noBooksFound: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
  });

export const bookDetailsStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    image: {
        width: 150,
        height: 210,
    },
    imageContainer: {
        marginBottom: 20,
        alignItems: 'center',
    },
    textContainer: {
        marginHorizontal: 20,
        marginTop: 10,
        alignSelf: 'flex-start',
    },
    text:{
        marginBottom: 10,
        fontSize: 18
    },
    descriptionContainer: {
        marginHorizontal: 20,
        alignSelf: 'flex-start',
        width: "85%",
    },
    descriptionText: {
        margin: 10,
        fontSize: 18
    },
    commentsContainer: {
        marginHorizontal: 15,
        alignSelf: 'flex-start',
        width: "90%"
    },
    commentText: {
        margin: 10,
    },
    star: {
        width: 10,
        height: 10,
    }
});

export const userBookListStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    listView: {
        flex: 1, width: '100%'
    },
    image: {
        width: 65,
        height: 90, 
        marginRight: 10,
        marginLeft: 10
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5 
    },
    rowContent: {
        margin: 10,
        flexDirection: 'row',
        alignItems: 'center' 
    },
    buttonView: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
    button: {
        paddingLeft: 10
    },
    bookInfo: {
        flex: 1,
        fontSize: 18 
    }
});

export const addCommentStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 18
    },
    title: {
        margin: 10,
        fontSize: 18
    },
    input: {
        width: "90%",
        height: 100,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10
    }
});

export const addRatingStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        paddingVertical: 10
    }
});