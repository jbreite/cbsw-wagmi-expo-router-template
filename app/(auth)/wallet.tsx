import CButton from "@/components/Button";
import CopyAddress from "@/components/CopyAddress";
import WalletAction from "@/components/WalletAction";
import { shortenAddress } from "@/utils/ui";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useAccount, useDisconnect, useSignMessage } from "wagmi";
import { useCapabilities } from "wagmi/experimental";

export default function Index() {
  const { disconnect, isPending: isPendingDisconnect } = useDisconnect();
  const { address } = useAccount();
  console.log("address", address);

  const handleDisconnect = () => {
    disconnect();
  };

  const {
    data: signMessageHash,
    error: signMessageError,
    signMessage,
    reset,
    isPending: isPendingMessage,
  } = useSignMessage();

  const handleSignMessage = () => {
    signMessage({ message: "Hello world" });
  };

  const { data: capabilitiesData, error: capabilitiesError } =
    useCapabilities();

  return (
    <View style={styles.conatiner}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <CButton
          label="Disconnect"
          isLoading={isPendingDisconnect}
          onPress={handleDisconnect}
          disabled={isPendingDisconnect}
          style={{ flex: 1 }}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24, gap: 24 }}
      >
        <CopyAddress address={address} />
        <WalletAction
          title="Sign Message"
          result={signMessageHash ?? signMessageError}
          onPress={handleSignMessage}
          buttonLabel="Sign Message"
        />
        <WalletAction
          title="Use Capabilities"
          result={JSON.stringify(
            capabilitiesData ?? capabilitiesError,
            null,
            2
          )}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    padding: 24,
  },
});
