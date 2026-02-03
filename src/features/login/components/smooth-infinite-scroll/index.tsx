import { Image } from "expo-image";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  scrollTo,
  useAnimatedReaction,
  useAnimatedRef,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const iconDataSets = {
  set1: [
    {
      avatar: require("@/assets/images/avatars/avatar_1.png"),
      color: "#FFE5CC",
    },
    {
      avatar: require("@/assets/images/avatars/avatar_2.png"),
      color: "#F4D03F",
    },
    {
      avatar: require("@/assets/images/avatars/avatar_3.png"),
      color: "#F8D7DA",
    },
    {
      avatar: require("@/assets/images/avatars/avatar_4.png"),
      color: "#D5EDDA",
    },
    {
      avatar: require("@/assets/images/avatars/avatar_5.png"),
      color: "#FADBD8",
    },
  ],
  set2: [
    {
      avatar: require("@/assets/images/avatars/avatar_5.png"),
      color: "#D1ECF1",
    },
    {
      avatar: require("@/assets/images/avatars/avatar_6.png"),
      color: "#E2E3E5",
    },
    {
      avatar: require("@/assets/images/avatars/avatar_7.png"),
      color: "#F4D03F",
    },
    {
      avatar: require("@/assets/images/avatars/avatar_4.png"),
      color: "#FFE5CC",
    },
    {
      avatar: require("@/assets/images/avatars/avatar_1.png"),
      color: "#F8D7DA",
    },
  ],
  set3: [
    {
      avatar: require("@/assets/images/avatars/avatar_4.png"),
      color: "#FADBD8",
    },
    {
      avatar: require("@/assets/images/avatars/avatar_6.png"),
      color: "#D1ECF1",
    },
    {
      avatar: require("@/assets/images/avatars/avatar_1.png"),
      color: "#FFE5CC",
    },
    {
      avatar: require("@/assets/images/avatars/avatar_7.png"),
      color: "#D5EDDA",
    },
    {
      avatar: require("@/assets/images/avatars/avatar_2.png"),
      color: "#E2E3E5",
    },
  ],
};

const ITEM_HEIGHT = 160;
const SCROLL_SPEED = 20; // pixels per second
const GAP = 10; // gap between items from styles

interface SmoothInfiniteScrollProps {
  scrollDirection?: "up" | "down";
  iconSet?: "set1" | "set2" | "set3";
}

const SmoothInfiniteScroll = ({
  scrollDirection = "down",
  iconSet = "set1",
}: SmoothInfiniteScrollProps) => {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollY = useSharedValue(0);

  const iconData = iconDataSets[iconSet];
  const items = [...iconData, ...iconData];
  const totalContentHeight = iconData.length * ITEM_HEIGHT;

  // Calculate total wrap height including gaps between items
  // Each item has a gap after it (except conceptually the last, but we're wrapping)
  const totalWrapHeight = totalContentHeight + iconData.length * GAP;

  useEffect(() => {
    // Calculate duration based on SCROLL_SPEED and total distance
    const duration = (totalWrapHeight / SCROLL_SPEED) * 1000; // convert to milliseconds

    if (scrollDirection === "down") {
      // Start at 0, animate to totalWrapHeight
      scrollY.value = 0;
      scrollY.value = withRepeat(
        withTiming(totalWrapHeight, { duration }),
        -1, // infinite repeats
        false // don't reverse
      );
    } else {
      // Start at totalWrapHeight, animate to 0
      scrollY.value = totalWrapHeight;
      scrollY.value = withRepeat(
        withTiming(0, { duration }),
        -1, // infinite repeats
        false // don't reverse
      );
    }
  }, [scrollDirection, totalWrapHeight]);

  useAnimatedReaction(
    () => scrollY.value,
    (y) => {
      if (scrollDirection === "down") {
        if (y >= totalContentHeight) {
          scrollY.value = 0;
          scrollTo(scrollRef, 0, 0, false);
        } else {
          scrollTo(scrollRef, 0, y, false);
        }
      } else {
        if (y <= 0) {
          scrollY.value = totalContentHeight;
          scrollTo(scrollRef, 0, totalContentHeight, false);
        } else {
          scrollTo(scrollRef, 0, y, false);
        }
      }
    }
  );

  return (
    <View>
      <Animated.ScrollView
        contentContainerStyle={styles.container}
        ref={scrollRef}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
      >
        {items.map((item, idx) => (
          <View
            key={idx}
            style={[styles.iconContainer, { backgroundColor: item.color }]}
          >
            <Image
              source={item.avatar}
              style={styles.avatar}
              contentFit="cover"
            />
          </View>
        ))}
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
    paddingVertical: 20,
  },
  iconContainer: {
    width: 160,
    height: ITEM_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginHorizontal: 5,
    boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.1)",
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 20,
  },
});
export default SmoothInfiniteScroll;
