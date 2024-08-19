import { Pressable, Text, View } from "react-native";
import { useConnect, useDisconnect } from "wagmi";

export default function Index() {
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  const handleConnect = () => {
    connect({ connector: connectors[0] });
  };


  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Pressable
        onPress={handleConnect}
        style={{ padding: 24, backgroundColor: "red" }}
      >
        <Text>Connect Wallet</Text>
      </Pressable>
    </View>
  );
}
