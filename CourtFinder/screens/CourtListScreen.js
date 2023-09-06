import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  RefreshControl,
} from "react-native";

import AuthContext from "./AuthContext";
import ModalPopUp from "../components/ModalPopup";

// court list screen that shows up when login or sign up
const CourtList = ({ navigation }) => {
  const [courts, setCourts] = useState([]);
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [availableModalVisible, setAvailableModalVisible] = useState(false);
  const [waitlistModalVisible, setWaitlistModalVisible] = useState(false);
  const [bookingModalVisible, setBookingModalVisible] = useState(false);
  const [noBookingModalVisible, setNoBookingModalVisible] = useState(false);
  const [selectedCourtNumber, setSelectedCourtNumber] = useState(0);

  const [selectedCourtWaitingList, setSelectedCourtWaitingList] = useState(0);
  const [selectedCourtWaitingTime, setSelectedCourtWaitingTime] = useState(0);

  const [refreshing, setRefreshing] = useState(false);

  const [selectedBookingType, setSelectedBookingType] = useState("");

  const { loginStatus, username, setLatestBooking, latestBooking } =
    useContext(AuthContext);

  const isDisabled = latestBooking !== null;

  // because latestBooking can be null (if no booking) so need if statement to access user's booking info
  const booked_court = latestBooking ? latestBooking.court_id : "N/A";

  const booked_type = latestBooking ? latestBooking.booking_type : "N/A";

  const booked_ending_time = latestBooking
    ? new Date(latestBooking.play_end_time)
    : "N/A";

  const booked_id = latestBooking ? latestBooking.booking_id : "N/A";

  const MINUTESPERPLAY = 60;

  // calculating time remaining for bookings popup based on the user's booking info (AuthContext)
  let time_remaining;

  if (booked_ending_time === "N/A") {
    time_remaining = "N/A";
  } else {
    time_remaining = Math.ceil(
      (new Date(booked_ending_time) - new Date()) / 1000 / MINUTESPERPLAY
    );
  }

  // calculating parties waiting for bookings popup based on the user's booking info (AuthContext)
  let numPartiesWaiting;

  if (time_remaining === "N/A") {
    numPartiesWaiting = 0;
  } else {
    numPartiesWaiting = Math.ceil(time_remaining / MINUTESPERPLAY);
  }

  // loads court data with API call
  useEffect(() => {
    const fetchCourts = async () => {
      try {
        const response = await fetch("http://localhost:5000/getcourts");
        const data = await response.json();

        // Parse and transform the data to match the desired naming convention
        const parsedCourts = data.map((court) => ({
          courtNumber: court.id,
          available: court.status === "available",
          waitingListParties: court.numPartiesWaiting,
          estimatedWaitTime: `${court.estimatedTimeRemaining} minutes`,
        }));

        setBooking();

        setCourts(parsedCourts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCourts();
  }, []);

  // add a booking with user's AuthContext data
  const addBooking = async (bookingType) => {
    try {
      const user_email = username;
      const court_id = selectedCourtNumber;
      const booking_type = bookingType;

      console.log(user_email);
      console.log(court_id);
      console.log(booking_type);
      const response = await fetch("http://localhost:5000/addbooking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },

        body: JSON.stringify({
          user_email,
          court_id,
          booking_type,
        }),
      });

      if (response.ok) {
        // Request was successful
        console.log("booking added!");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  // delete booking using user's booking details (AuthContext)
  const deleteBooking = async (booking_id) => {
    try {
      console.log(booking_id);
      const response = await fetch("http://localhost:5000/deletebooking", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ booking_id }),
      });

      if (response.ok) {
        // Request was successful
        console.log("booking deleted!");
      } else {
        console.log("Failed to delete booking.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // set booking for user (for AuthContext)
  const setBooking = async () => {
    const user_email = username;
    const latestBookingResponse = await fetch(
      "http://localhost:5000/getlatestbooking",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_email }),
      }
    );

    let current_time = new Date();
    // const userTimezoneOffset = current_time.getTimezoneOffset(); // Get local timezone offset in minutes

    const latestBookingData = await latestBookingResponse.json();

    if (latestBookingData !== 0) {
      if (new Date(latestBookingData.play_end_time) > current_time) {
        setLatestBooking(latestBookingData);
      } else {
        setLatestBooking(null);
      }
    } else {
      setLatestBooking(null);
    }
  };

  // for refreshing CourtListScreen when pull down screen
  const handleRefresh = async () => {
    try {
      const response = await fetch("http://localhost:5000/getcourts");
      const data = await response.json();

      const parsedCourts = data.map((court) => ({
        courtNumber: court.id,
        available: court.status === "available",
        waitingListParties: court.numPartiesWaiting,
        estimatedWaitTime: `${court.estimatedTimeRemaining} minutes`,
      }));

      setBooking();

      setCourts(parsedCourts);
    } catch (error) {
      console.error(error);
    }
  };

  // for adding booking when press button and moving to confirmation message
  function handlePress(BookingType) {
    setSelectedBookingType(BookingType);

    console.log(BookingType);

    // let latestBooking = {
    //   selectedCourtNumber: selectedCourtNumber,
    //   bookingDateTime: new Date(),
    // };
    // setLatestBooking(latestBooking);

    addBooking(BookingType);
    console.log(selectedBookingType);

    if (BookingType == "checked in") {
      navigation.navigate("Check In", { selectedCourtNumber });
    } else {
      navigation.navigate("Waitlist", {
        selectedCourtNumber,
        selectedCourtWaitingList,
        selectedCourtWaitingTime,
      });
    }
  }

  // rendering all the courts
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
          {item.waitingListParties} PARTIES IN FRONT
        </Text>
        <Text style={styles.estimatedWaitTime}>
          ESTIMATED TIME: {item.estimatedWaitTime}
        </Text>

        {/* depending on whether item is available or not, different button action */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              if (!isDisabled) {
                if (item.available) {
                  handleAvailableButtonPress(item);
                } else {
                  handleWaitlistButtonPress(item);
                }
              }
            }}
            style={[
              styles.button,
              isDisabled && styles.disabledButton,
              item.available ? styles.availableButton : styles.waitlistButton,
            ]}
          >
            <Text style={styles.buttonText}>
              {item.available ? "AVAILABLE" : "WAITLIST"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // when press available button, make available popup visible with selected court details passed on
  const handleAvailableButtonPress = (item) => {
    setAvailableModalVisible(true);
    setSelectedCourtNumber(item.courtNumber);
    setSelectedCourtWaitingList(item.waitingListParties);
    setSelectedCourtWaitingTime(item.estimatedWaitTime);
  };

  // when press available button, make waitlist popup visible with selected court details passed on
  const handleWaitlistButtonPress = (item) => {
    setWaitlistModalVisible(true);
    setSelectedCourtNumber(item.courtNumber);
    setSelectedCourtWaitingList(item.waitingListParties);
    setSelectedCourtWaitingTime(item.estimatedWaitTime);
  };

  // when press your bookings button, make your bookings popup visible if latestBooking is not null (ie user has a booking)
  const handleBookingButtonPress = () => {
    if (latestBooking !== null) {
      setBookingModalVisible(true);
    } else {
      setNoBookingModalVisible(true);
    }
  };

  // when press cancel button, cancel booking if latestBooking is not null (ie user has a booking)
  const handleCancelButtonPress = () => {
    if (latestBooking !== null) {
      console.log(booked_id);
      deleteBooking(booked_id);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../assets/logo_green.png")}
          style={styles.logo}
        />
      </View>

      <Text style={styles.title}>SELECT COURT</Text>
      <View style={styles.titleSpacing} />

      {/* to render a list of courts, refresh control lets you pull down screen to refresh data */}
      <FlatList
        data={courts}
        renderItem={renderItem}
        keyExtractor={(item) => item.courtNumber.toString()}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      />

      <View style={styles.centeredView}>
        {/* popup that appears when press available button */}
        <ModalPopUp
          visible={availableModalVisible}
          onRequestClose={() => setAvailableModalVisible(false)}
          courtText={`Court ${selectedCourtNumber}`}
          statusText="AVAILABLE"
          waitListText={`${selectedCourtWaitingList} PARTIES IN FRONT`}
          waitTimeText={`ESTIMATED TIME: ${selectedCourtWaitingTime}`}
          buttonText="CHECK IN"
          onPressButton={() => handlePress("checked in")}
          modalView={styles.availableView}
        />

        {/* popup that appears when press waitlist button */}
        <ModalPopUp
          visible={waitlistModalVisible}
          onRequestClose={() => setWaitlistModalVisible(false)}
          courtText={`Court ${selectedCourtNumber}`}
          statusText="WAITLIST"
          waitListText={`${selectedCourtWaitingList} PARTIES IN FRONT`}
          waitTimeText={`ESTIMATED TIME: ${selectedCourtWaitingTime}`}
          buttonText="JOIN WAITLIST"
          onPressButton={() => handlePress("waitlist")}
          modalView={styles.waitlistView}
        />

        {/* popup that appears when press your bookings button if user has booking */}
        <ModalPopUp
          visible={bookingModalVisible}
          onRequestClose={() => setBookingModalVisible(false)}
          courtText={`Court ${booked_court}`}
          statusText={`Booking Type: ${booked_type.toUpperCase()}`}
          waitListText={`${numPartiesWaiting - 1} PARTIES IN FRONT`}
          waitTimeText={
            time_remaining <= 60
              ? `REMAINING TIME: ${time_remaining} MINUTES`
              : `WAITING TIME: ${time_remaining - 60} MINUTES`
          }
          buttonText="CANCEL"
          onPressButton={() => handleCancelButtonPress()}
          modalView={styles.bookingView}
        />

        {/* popup that appears when press your bookings button if user has no booking */}
        <ModalPopUp
          visible={noBookingModalVisible}
          onRequestClose={() => setNoBookingModalVisible(false)}
          noBookingText="YOU HAVE NO BOOKINGS"
          noBooking={true}
          modalView={styles.noBookingView}
        />
      </View>

      <View style={styles.bookingButtonView}>
        {/* the your bookings button */}
        <TouchableOpacity
          onPress={() => {
            handleBookingButtonPress();
          }}
          style={[styles.button, styles.bookingButton]}
        >
          <Text style={styles.buttonText}>YOUR BOOKINGS</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
    marginBottom: 0,
    justifyContent: "center",
  },

  logo: {
    width: 200,
    height: 200,
    marginRight: 8,
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
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
    marginBottom: 40,
    marginRight: 20,
    marginL: 20,
  },
  courtNumber: {
    fontSize: 25,
    fontWeight: "bold",
  },
  selectedCourtNumber: {
    color: "#FFFFFF",
  },

  waitingListParties: {
    fontSize: 18,
    marginTop: 8,
  },
  estimatedWaitTime: {
    fontSize: 18,
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
    fontSize: 15,
    color: "#FFFFFF",
    fontWeight: "bold",
  },

  disabledButton: {
    opacity: 0.5,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },

  availableView: {
    margin: 20,
    backgroundColor: "#B9EF37",
    borderRadius: 20,
    padding: 35,
    alignItems: "left",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  waitlistView: {
    margin: 20,
    backgroundColor: "#EFBB37",
    borderRadius: 20,
    padding: 35,
    alignItems: "left",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  bookingView: {
    margin: 20,
    backgroundColor: "#F8602F",
    borderRadius: 20,
    padding: 35,
    alignItems: "left",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  noBookingView: {
    margin: 20,
    backgroundColor: "#F8602F",
    borderRadius: 20,
    padding: 35,
    alignItems: "left",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  bookingButtonView: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  bookingButton: {
    backgroundColor: "#F8602F",
  },
};

export default CourtList;
