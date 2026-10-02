// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "DiskWarren",
    platforms: [
        .macOS(.v14)
    ],
    products: [
        .executable(name: "DiskWarrenApp", targets: ["DiskWarrenApp"]),
        .library(name: "DiskWarrenCore", targets: ["DiskWarrenCore"]),
        .library(name: "DiskWarrenUI", targets: ["DiskWarrenUI"])
    ],
    dependencies: [],
    targets: [
        .target(
            name: "DiskWarrenCore",
            dependencies: [],
            path: "Sources/DiskWarrenCore"
        ),
        .target(
            name: "DiskWarrenUI",
            dependencies: ["DiskWarrenCore"],
            path: "Sources/DiskWarrenUI"
        ),
        .executableTarget(
            name: "DiskWarrenApp",
            dependencies: ["DiskWarrenCore", "DiskWarrenUI"],
            path: "Sources/DiskWarrenApp"
        ),
        .testTarget(
            name: "DiskWarrenCoreTests",
            dependencies: ["DiskWarrenCore"],
            path: "Tests/DiskWarrenCoreTests"
        )
    ]
)
