import { Pressable, Text, View } from "react-native";
import { useDisconnect } from "wagmi";

export default function Index() {
  const { disconnect } = useDisconnect();

  const handleDisconnect = () => {
    disconnect();
  };

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Text> Auth </Text>
      <Pressable onPress={handleDisconnect}>
        <Text>Disconnect</Text>
      </Pressable>
    </View>
  );
}
