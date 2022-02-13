import React, {Component, useState} from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

export default class PopularItem extends Component {
  constructor(props: any) {
    super(props)
    this.state = {
      ...props
    }
  }
  render() {
    const { item } = this.state;
    if(!item || !item.owner) return null; 
    const FavoriteButton = () => (
      <TouchableOpacity style={{padding: 6}} onPress={() => {}}>
        <FontAwesome name="star" size={26} style={{color: 'red'}} />
      </TouchableOpacity>
    )
    return (
      <TouchableOpacity onPress={this.state.onSelect}>
        <View style={styles.cell_container}>
          <Text style={styles.title}>{item.full_name}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <View style={styles.row}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <Text>Author:</Text>
              <Image style={{height: 22, width: 22}} source={{uri: item.owner.avatar_url}} />
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text>Start: </Text>
              <Text>{item.stargazers_count}</Text>
            </View>
            <FavoriteButton />
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  cell_container: {
    backgroundColor: '#fff',
    padding: 10,
    marginLeft: 5,
    marginRight: 5,
    marginVertical: 3,
    borderColor: '#ddd',
    borderWidth: 0.5,
    borderRadius: 2,
    shadowColor: 'gray', // ios
    shadowOffset: {  // ios
      width: 0.5,
      height: 0.5
    },
    shadowOpacity: 0.4,  // ios
    shadowRadius: 1,  // ios
    elevation: 2  // android
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    marginBottom: 2,
    color: '#212121'
  },
  description: {
    fontSize: 14,
    marginBottom: 2,
    color: '#757575',
    marginVertical: 6
  }
});