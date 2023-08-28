import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";

const ModalPopUp = (props) => {
  const {
    visible,
    onRequestClose,
    courtText,
    statusText,
    waitListText,
    waitTimeText,
    buttonText,
    onPressButton,
    modalView,
  } = props;

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}
    >
      <View style={styles.centeredView}>
        <View style={modalView}>
          <View style={styles.modalHeader}>
            <View style={styles.modalHeaderContent}></View>
            <TouchableOpacity onPress={onRequestClose}>
              <Text style={styles.modalHeaderCloseText}>X</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.courtText}>{courtText}</Text>

          <Text style={styles.statusText}>{statusText}</Text>

          <Text style={styles.waitListText}>{waitListText}</Text>

          <Text style={styles.waitTimeText}>{waitTimeText}</Text>
          <Pressable
            style={[styles.popupButton, styles.popupButtonClose]}
            onPressIn={onPressButton}
            onPress={onRequestClose}
          >
            <Text style={styles.textStyle}>{buttonText}</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },

  modalHeader: {
    flexDirection: "row",
    marginBottom: 30,
  },
  /* The header takes up all the vertical space not used by the close button. */
  modalHeaderContent: {
    flexGrow: 1,
  },
  modalHeaderCloseText: {
    alignItems: "flex-end",
    paddingLeft: 5,
    paddingRight: 5,
    fontWeight: "bold",
  },

  popupButton: {
    padding: 10,
    elevation: 2,
    alignSelf: "center",
  },

  popupButtonClose: {
    backgroundColor: "black",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  courtText: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },

  statusText: {
    fontSize: 20,
    marginBottom: 50,
    textAlign: "center",
    color: "white",
  },

  waitListText: {
    fontSize: 15,
    marginBottom: 15,
    textAlign: "center",
    color: "black",
  },

  waitTimeText: {
    fontSize: 15,
    marginBottom: 60,
    textAlign: "center",
    color: "black",
  },
});

export default ModalPopUp;
