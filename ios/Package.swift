// swift-tools-version: 5.10
import PackageDescription

let package = Package(
    name: "DiskWarrenIOS",
    platforms: [
        .iOS(.v17)
    ],
    products: [
        .library(
            name: "DiskWarrenIOS",
            targets: ["DiskWarrenIOS"]),
    ],
    dependencies: [],
    targets: [
        .target(
            name: "DiskWarrenIOS",
            dependencies: [],
            path: "Sources/DiskWarrenIOS"
        ),
        .testTarget(
            name: "DiskWarrenIOSTests",
            dependencies: ["DiskWarrenIOS"],
            path: "Tests/DiskWarrenIOSTests"
        ),
    ]
)
