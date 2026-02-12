import { Typography } from "@/src/core/components/typography";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, TouchableOpacity } from "react-native";

const GoogleAuthButton = ({ onPress }: { onPress: () => void }) => {
  return (
    <TouchableOpacity style={styles.googleButton} onPress={onPress}>
      <Ionicons name="logo-google" size={18} color={"#fff"} />
      <Typography style={styles.googleButtonText}>
        Continue with Google
      </Typography>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  googleButton: {
    backgroundColor: "#4285F4",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 17,
    borderRadius: 25,
    gap: 4,
  },
  googleButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});
export default GoogleAuthButton;
