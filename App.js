import React from 'react';
import { AsyncStorage,StyleSheet, Text,TextInput, View ,Image, TouchableOpacity} from 'react-native';

export default class App extends React.Component {
    saveItem() {
        let recipie = 'scramblked eggs';
        AsyncStorage.setItem('recipie', recipie);
    }
    displayData = async()=>{
      try{
        let user = await AsyncStorage.getItem('user');
          alert(user);
      }catch(error){

      }
    }
    callFun = () =>
    {

        alert("Image Clicked!!!");

    }
  render() {
    return (
      <View style={styles.container}>
          <TouchableOpacity style={styles.AddStyle} activeOpacity={0.5} onPress={ this.saveItem }>

              <Image source={require('./images/add.png')}
                  style={styles.ImageIconStyle}
              />

              <View style={styles.SeparatorLine} />

              <Text style={styles.TextStyle}> Add recipe </Text>

          </TouchableOpacity>
          <TouchableOpacity onPress={this.displayData}>
            <Text>
              Click me to save data
            </Text>
          </TouchableOpacity>
        <TextInput></TextInput>
        <Text>HAHAH</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    AddStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'green',
        borderWidth: .5,
        borderColor: '#fff',
        height: 40,
        borderRadius: 5 ,
        margin: 5,

    },
    ImageIconStyle: {
        top: 5,
        padding: 10,
        margin: 5,
        height: 25,
        width: 25,
        resizeMode : 'stretch',

    },

    TextStyle :{

        color: "#fff",
        marginBottom : 4,
        marginRight :20,

    },

    SeparatorLine :{

        backgroundColor : '#fff',
        width: 1,
        height: 40

    }
});