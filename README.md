# Template for an onchain app, utilizing the Coinbase Smart Wallet, WAGMI, and EXPO router.

Huge thanks to the Coinbase team who created ths [Smart Wallet Expo Example](https://github.com/MobileWalletProtocol/smart-wallet-expo-example).

This example focuses on Expo Router and making the smart wallet compatible. It takes care of all polyfills for the Smart Wallet, WAGMI, and sets up an (auth) guard for your app.

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## What's in here

- `polyfills.js` - Includes all polyfills needed for the Coinbase Smart Wallet. Imported at the top of your root `_layout.tsx`
- `entrypoint.js` - Includes polyfills needed to use WAGMI and send transactions. In the `package.json` your main is now this.
- `config.ts` - WAGMI config with Coinbase smart wallet
- `(auth)` - Feel free to change this if you want, but I like to protect routes before a wallet connection.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Smart Wallet Docs](https://www.smartwallet.dev/): Learn about integrating the smart wallet into your project
- [WAGMI docs](https://wagmi.sh/): Learn about using WAGMI hooks
