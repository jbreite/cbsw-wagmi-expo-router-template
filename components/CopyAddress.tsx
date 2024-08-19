import { shortenAddress } from "@/utils/ui";
import { useState } from "react";
import { View, Text } from "react-native";
import * as Clipboard from "expo-clipboard";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

export default function CopyAddress({ address }: { address: `0x${string}` }) {
  const [copied, setCopied] = useState(false);
  const shortenedAddress = shortenAddress(address);

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <View style={{ flexDirection: "row", gap: 8 }}>
      <Text>{shortenedAddress}</Text>
      <TouchableOpacity onPress={copyToClipboard}>
        <Ionicons
          name={copied ? "checkmark-circle" : "copy"}
          size={24}
          color={copied ? "green" : "black"}
        />
      </TouchableOpacity>
    </View>
  );
}
