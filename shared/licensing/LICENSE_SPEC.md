# DiskWarren — Cross-Platform Licensing Specification

## 1. Principles
- **No Mandatory Online Accounts:** Users can activate and use DiskWarren completely offline without creating accounts or suffering activation lockouts.
- **Cryptographic Offline Verification:** License keys encode customer tier, platform entitlements, issue timestamp, and a cryptographic signature (HMAC-SHA256 / Ed25519).
- **Perpetual Ownership:** Free v1.x updates, zero recurring subscriptions for core licenses.

## 2. Key Format
Keys follow the standard human-readable format:
`DW1-[PLATFORM]-[TIER]-[EXPIRY/FLAGS]-[SIGNATURE]`

Example:
`DW1-WIN-PRO-LIFETIME-A9F4B2C8E1D3`
`DW1-MAC-PRO-LIFETIME-B7E2C1D4F9A3`
`DW1-ALL-POWER-LIFETIME-8C4D2E1A7B9F`

### Platform Identifiers:
- `MAC`: macOS Storage Intelligence
- `WIN`: Windows Storage Intelligence
- `AND`: Android Storage Intelligence (Google Play Billing or Direct)
- `IOS`: iPhone Storage Intelligence (Apple In-App Purchase / StoreKit)
- `ALL`: Cross-Platform Power Pack (Up to 3 devices across any OS)

## 3. Tier Entitlements
| Feature | Free Community | Pro Lifetime ($9.99) | Power Pack ($14.99) |
| :--- | :---: | :---: | :---: |
| Full Volume Scan & Treemap | Yes | Yes | Yes |
| Large Files Discovery | Yes | Yes | Yes |
| Category Breakdown | Yes | Yes | Yes |
| Developer Caches Cleanup | No | Yes | Yes |
| AI Model Management & Purge | No | Yes | Yes |
| App Uninstaller / Leftovers | No | Yes | Yes |
| Byte-Level Duplicate Finder | No | Yes | Yes |
| Device Activations | Unlimited | 1 Machine | 3 Machines (Any OS) |
| Priority Support Channel | Community | Standard Email | Priority Response |

## 4. Verification Algorithm (Cross-Platform)
1. Strip dashes and whitespace.
2. Decode prefix and header attributes.
3. Validate expiration timestamp (if time-bound) or perpetual lifetime flag.
4. Verify signature payload using the embedded DiskWarren public verification key.
5. Store encrypted activation token in platform-secure storage:
   - **macOS:** macOS Keychain (`kSecClassGenericPassword`)
   - **Windows:** Windows Credential Manager (`CredWriteW` / DPAPI `ProtectedData`)
   - **Android:** EncryptedSharedPreferences (Android Keystore)
   - **iOS:** iOS Keychain Services (`kSecAttrAccessibleAfterFirstUnlock`)
