import React from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";

const CourtDetailsPopup = ({ isVisible, onClose, court }) => {
  if (!isVisible || !court) {
    return null;
  }

  const handleCheckIn = () => {
    // Handle check-in logic here
    console.log(`Checking in for Court #${court.courtNumber}`);
    onClose();
  };

  const handleJoinWaitlist = () => {
    // Handle join waitlist logic here
    console.log(`Joining waitlist for Court #${court.courtNumber}`);
    onClose();
  };

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.popupContainer}>
        <Text style={styles.courtNumber}>Court #{court.courtNumber}</Text>
        <Text style={styles.waitingListParties}>
          {court.waitingListParties} PARTIES IN WAITING LIST
        </Text>
        <Text style={styles.estimatedWaitTime}>
          ESTIMATED TIME: {court.estimatedWaitTime}
        </Text>
        <View style={styles.buttonsContainer}>
          {court.available ? (
            <TouchableOpacity
              style={[styles.button, styles.checkInButton]}
              onPress={handleCheckIn}
            >
              <Text style={styles.buttonText}>CHECK IN</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.button, styles.waitlistButton]}
              onPress={handleJoinWaitlist}
            >
              <Text style={styles.buttonText}>JOIN WAITLIST</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={[styles.button, styles.closeButton]}
            onPress={onClose}
          >
            <Text style={styles.buttonText}>CLOSE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  popupContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  courtNumber: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  waitingListParties: {
    fontSize: 16,
    marginBottom: 8,
  },
  estimatedWaitTime: {
    fontSize: 16,
    marginBottom: 16,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
    marginHorizontal: 8,
  },
  checkInButton: {
    backgroundColor: "#B9EF37",
  },
  waitlistButton: {
    backgroundColor: "#EFBB37",
  },
  closeButton: {
    backgroundColor: "#FF0000",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

export default CourtDetailsPopup;
