import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";

// modal popup component (used in CourtListScreen)
// props are passed in from CourtListScreen and used in {blue portion} ie ({onRequestClose})

const ModalPopUp = (props) => {
  const {
    visible,
    onRequestClose,
    courtText,
    statusText,
    waitListText,
    waitTimeText,
    buttonText,
    noBookingText,
    noBooking,
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
          <Text style={!noBooking && styles.courtText}>{courtText}</Text>

          <Text style={!noBooking && styles.statusText}>{statusText}</Text>

          <Text style={!noBooking && styles.waitListText}>{waitListText}</Text>

          <Text style={!noBooking && styles.waitTimeText}>{waitTimeText}</Text>

          <Text style={styles.noBookingText}>{noBookingText}</Text>
          <Pressable
            style={[
              !noBooking && styles.popupButton,
              !noBooking && styles.popupButtonClose,
            ]}
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
    fontSize: 15,
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
    fontSize: 22,
    marginBottom: 50,
    textAlign: "center",
    color: "white",
  },

  waitListText: {
    fontSize: 20,
    marginBottom: 15,
    textAlign: "center",
    color: "black",
  },

  waitTimeText: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
    color: "black",
  },

  noBookingText: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
    marginBottom: 60,
    alignSelf: "center", // Center horizontally
    justifyContent: "center", // Center vertically
  },
});

export default ModalPopUp;
