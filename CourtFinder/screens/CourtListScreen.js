import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";

// Sample data for tennis courts
const tennisCourts = [
  {
    courtNumber: 1,
    available: true,
    waitingListParties: 2,
    estimatedWaitTime: "100 minutes",
  },
  {
    courtNumber: 2,
    available: true,
    waitingListParties: 1,
    estimatedWaitTime: "15 minutes",
  },
  {
    courtNumber: 3,
    available: false,
    waitingListParties: 1,
    estimatedWaitTime: "15 minutes",
  },
  {
    courtNumber: 4,
    available: false,
    waitingListParties: 1,
    estimatedWaitTime: "15 minutes",
  },
  {
    courtNumber: 5,
    available: false,
    waitingListParties: 1,
    estimatedWaitTime: "15 minutes",
  },
  {
    courtNumber: 6,
    available: false,
    waitingListParties: 1,
    estimatedWaitTime: "15 minutes",
  },
  {
    courtNumber: 7,
    available: false,
    waitingListParties: 1,
    estimatedWaitTime: "15 minutes",
  },
  // Add more tennis court objects as needed
];

const CourtList = () => {
  const [selectedCourt, setSelectedCourt] = useState(null);

  const renderItem = ({ item }) => {
    const isSelected = selectedCourt === item.courtNumber;

    return (
      <View
        style={[
          styles.courtContainer,
          isSelected && styles.selectedCourtContainer,
        ]}
      >
        <Text
          style={[styles.courtNumber, isSelected && styles.selectedCourtNumber]}
        >
          Court # {item.courtNumber}
        </Text>
        <Text style={styles.waitingListParties}>
          {item.waitingListParties} PARTIES IN WAITING LIST
        </Text>
        <Text style={styles.estimatedWaitTime}>
          ESTIMATED TIME: {item.estimatedWaitTime}
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              item.available ? styles.availableButton : styles.waitlistButton,
            ]}
            disabled
          >
            <Text style={styles.buttonText}>
              {item.available ? "AVAILABLE" : "WAITLIST"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../assets/logo_green.png")}
          style={styles.logo}
        />
      </View>
      <Text style={styles.title}>SELECT COURT</Text>
      <View style={styles.titleSpacing} />
      <FlatList
        data={tennisCourts}
        renderItem={renderItem}
        keyExtractor={(item) => item.courtNumber.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    justifyContent: "center",
  },
  logo: {
    width: 200,
    height: 200,
    marginRight: 8,
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left",
  },
  titleSpacing: {
    marginBottom: 40, // Add spacing between the title and the court list
  },
  listContainer: {
    paddingBottom: 16,
  },
  courtContainer: {
    backgroundColor: "rgba(185, 239, 55, 0.4)", // Set the background color with opacity
    borderRadius: 8,
    padding: 16,
    marginBottom: 50,
    marginRight: 20,
    marginL: 20,
    // TouchableOpacity: 0.5,
  },
  // selectedCourtContainer: {
  //   backgroundColor: "#C0C0C0",
  // },
  courtNumber: {
    fontSize: 20,
    fontWeight: "bold",
  },
  selectedCourtNumber: {
    color: "#FFFFFF",
  },

  waitingListParties: {
    marginTop: 8,
  },
  estimatedWaitTime: {
    marginTop: 8,
  },
  buttonContainer: {
    alignItems: "flex-end", // Align the button to the right
    marginTop: 16,
    marginL: "auto",
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
  },
  availableButton: {
    backgroundColor: "#B9EF37",
  },
  waitlistButton: {
    backgroundColor: "#EFBB37",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
};

export default CourtList;
