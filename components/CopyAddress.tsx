import React, { useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import { Ionicons } from "@expo/vector-icons";

type CopyAddressProps = {
  address: `0x${string}`;
  title?: string;
};

export default function CopyAddress({
  address,
  title = "Address",
}: CopyAddressProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={copyToClipboard}>
          <Ionicons
            name={copied ? "checkmark-circle" : "copy"}
            size={24}
            color={copied ? "green" : "#0073FB"}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.resultContainer}>
        <Text style={styles.addressText}>{address}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: "#E5E5E5",
    borderRadius: 16,
    borderWidth: 1,
    padding: 8,
    flexDirection: "column",
    gap: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
  },
  resultContainer: {
    backgroundColor: "#00000008",
    borderRadius: 8,
    padding: 8,
  },
  addressText: {
    fontFamily: Platform.select({
      ios: "Courier",
      default: "monospace",
    }),
    color: "#000000",
  },
});
