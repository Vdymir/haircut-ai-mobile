import { Typography } from "@/src/core/components/typography";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, TouchableOpacity } from "react-native";

const AppleAuthButton = () => {
  return (
    <TouchableOpacity style={styles.appleButton}>
      <Ionicons name="logo-apple" size={18} color={"#fff"} />
      <Typography style={styles.appleButtonText}>
        Continue with Apple
      </Typography>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  appleButton: {
    backgroundColor: "#000",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 17,
    borderRadius: 25,
    gap: 4,
  },
  appleButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});
export default AppleAuthButton;
