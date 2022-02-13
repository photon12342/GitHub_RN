import React, {Component, useState} from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import HTMLView from 'react-native-htmlview';

export default class TrendingItem extends Component {
  constructor(props: any) {
    super(props)
    this.state = {
      ...props
    }
  }
  render() {
    const { item } = this.state;
    if(!item) return null; 
    const FavoriteButton = () => (
      <TouchableOpacity style={{padding: 6}} onPress={() => {}}>
        <FontAwesome name="star" size={26} style={{color: 'red'}} />
      </TouchableOpacity>
    )
    let description = '<p>'+item.description+'</p>'
    return (
      <TouchableOpacity onPress={this.state.onSelect}>
        <View style={styles.cell_container}>
          <Text style={styles.title}>{item.fullName}</Text>
          <HTMLView 
            value={description}
            onLinkPress={(url: string) => {}}
            stylesheet={{
              a: styles.description,
              p: styles.description,
            }}
          />
          <Text style={styles.description}>{item.meta}</Text>
          <View style={styles.row}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <Text>Built by:</Text>
              {
                item.contributors.map((result: any, i: number) => (
                  <Image key={i} style={{height: 22, width: 22,margin: 2}} source={{uri: result}} />
                ))
              }
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