import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";

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
    available: false,
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

  // Render function for each tennis court item
  const renderItem = ({ item }) => {
    const isSelected = selectedCourt === item.courtNumber;

    return (
      <TouchableOpacity
        onPress={() => setSelectedCourt(item.courtNumber)}
        style={[
          styles.courtContainer,
          isSelected && styles.selectedCourtContainer,
        ]}
      >
        <Text
          style={[styles.courtNumber, isSelected && styles.selectedCourtNumber]}
        >
          Court {item.courtNumber}
        </Text>
        <Text style={styles.available}>
          {item.available ? "Available" : "Currently in Use"}
        </Text>
        <Text style={styles.waitingListParties}>
          {item.waitingListParties} Parties in Waiting List
        </Text>
        <Text style={styles.estimatedWaitTime}>
          Estimated Wait Time: {item.estimatedWaitTime}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
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
  listContainer: {
    paddingBottom: 16,
  },
  courtContainer: {
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  selectedCourtContainer: {
    backgroundColor: "#C0C0C0",
  },
  courtNumber: {
    fontSize: 16,
    fontWeight: "bold",
  },
  selectedCourtNumber: {
    color: "#FFFFFF",
  },
  available: {
    marginTop: 8,
    color: "#008000",
  },
  waitingListParties: {
    marginTop: 8,
  },
  estimatedWaitTime: {
    marginTop: 8,
  },
};

export default CourtList;
