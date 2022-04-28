import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  TouchableOpacity,
  FlatList,
} from "react-native";
import FilterIcon from "../../assets/FilterIcon";

export default function Categories({ categories, setCategoryId }) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <TouchableOpacity
          onPress={() => setModalVisible(false)}
          style={styles.centeredView}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <FlatList
                data={categories}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      setCategoryId(item.id);
                      setModalVisible(false);
                    }}
                    style={styles.categoryContainer}
                  >
                    <Text style={styles.category}>{item.name}</Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
      <Pressable
        style={[styles.button]}
        onPress={() => setModalVisible(!modalVisible)}
      >
        <FilterIcon />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
  },
  modalView: {
    position: "absolute",
    right: 0,
    top: 130,
    width: "100%",
    backgroundColor: "white",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    maxHeight: "100%",
  },
  categoryContainer: {
    borderBottomColor: "rgba(112, 112, 112, 0.2)",
    borderBottomWidth: 1,
  },
  category: {
    textAlign: "right",
    paddingVertical: 10,
    color: "#707070",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
    // elevation: 2,
  },

  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
