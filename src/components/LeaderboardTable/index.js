import React from 'react'
import {
  View,
  Text,
  SafeAreaView,
  FlatList
} from 'react-native'
import styles from './style'

const columns = [
  {
    "colName": "Name",
    "maxWidth":60
  },
  {
    "colName": "Seva Points",
    "maxWidth":50
  },
  {
    "colName": "Level",
    "maxWidth":20
  },
  {
    "colName": "DownlinesCol",
    "maxWidth":40
  },
  {
    "colName": "Books Gifted Col",
    "maxWidth":30
  }
];

export default class LeaderboardTable extends React.Component {
  renderColumnRow = () => {
    return (
      <View style={styles.colContainer}>
        {
          columns.map((data, key) => {
            return (
              <View key={key} style={[{ flex: data.maxWidth}, styles.colRow]}>
                <Text style={styles.text}>
                  {`${__.t(data.colName)}`}
                </Text>
              </View>
            )
          })
        }
      </View>
    );
  }

  renderRow = (data) => {
    return (
      <View style={styles.dataRow}>
        <Text style={[{flex: 60}, styles.text, styles.cell]}>
          {data.name}
        </Text>
        <Text style={[{flex: 50}, styles.text, styles.cell]}>
          {data.points}
        </Text>
        <Text style={[{flex: 20}, styles.text, styles.cell]}>
          {data.level}
        </Text>
        <Text style={[{flex: 40}, styles.text, styles.cell]}>
          {data.downlines}
        </Text>
        <Text style={[{flex: 30}, styles.text, styles.cell]}>
          {data.booksGifted}
        </Text>
      </View>
    );
  }

  render() {
    const rowData = [
      {
        name: "Devendra Patil",
        points: "10",
        level: "10",
        downlines: "20",
        booksGifted: "20"
      },
      {
        name: "Bhuvanshu Sharma",
        points: "10",
        level: "10",
        downlines: "20",
        booksGifted: "20"
      },
      {
        name: "Upvan Agrawal",
        points: "10",
        level: "10",
        downlines: "20",
        booksGifted: "20"
      },
      {
        name: "Danerys Targaryen",
        points: "10",
        level: "10",
        downlines: "20",
        booksGifted: "20"
      },
      {
        name: "Long long long long name",
        points: "10",
        level: "10",
        downlines: "20",
        booksGifted: "20"
      },
      {
        name: "Devendra Patil",
        points: "10",
        level: "10",
        downlines: "20",
        booksGifted: "20"
      },
      {
        name: "Devendra Patil",
        points: "10",
        level: "10",
        downlines: "20",
        booksGifted: "20"
      },
      {
        name: "Devendra Patil",
        points: "10",
        level: "10",
        downlines: "20",
        booksGifted: "20"
      },
      {
        name: "Devendra Patil",
        points: "10",
        level: "10",
        downlines: "20",
        booksGifted: "20"
      }
    ]
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          contentContainerStyle={styles.list}
          keyExtractor={(item,index)=>`${index}`}
          data={rowData}
          renderItem={({item}) => this.renderRow(item)}
          ListHeaderComponent={this.renderColumnRow}
 
                stickyHeaderIndices={[0]}
          ItemSeparatorComponent={()=><View style={styles.separator}/>}
        />
      </SafeAreaView>
    );
  }
}
          