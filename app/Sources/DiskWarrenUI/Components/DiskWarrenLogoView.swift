import SwiftUI

public struct DiskWarrenLogoView: View {
    public let size: CGFloat
    
    public init(size: CGFloat = 32) {
        self.size = size
    }
    
    public var body: some View {
        Canvas { context, canvasSize in
            let scale = canvasSize.width / 512.0
            
            // Background squircle chassis
            let bgRect = CGRect(x: 20 * scale, y: 20 * scale, width: 472 * scale, height: 472 * scale)
            let cornerRadius = 124 * scale
            let bgPath = Path(roundedRect: bgRect, cornerRadius: cornerRadius)
            
            let bgGradient = Gradient(colors: [
                Color(red: 11/255, green: 15/255, blue: 25/255),
                Color(red: 15/255, green: 23/255, blue: 42/255),
                Color(red: 2/255, green: 6/255, blue: 23/255)
            ])
            context.fill(bgPath, with: .linearGradient(bgGradient, startPoint: CGPoint(x: 0, y: 0), endPoint: CGPoint(x: canvasSize.width, y: canvasSize.height)))
            
            // Border highlight stroke
            let borderGradient = Gradient(colors: [
                Color(red: 6/255, green: 182/255, blue: 212/255).opacity(0.7),
                Color(red: 37/255, green: 99/255, blue: 235/255).opacity(0.4),
                Color(red: 30/255, green: 41/255, blue: 59/255).opacity(0.2)
            ])
            context.stroke(bgPath, with: .linearGradient(borderGradient, startPoint: CGPoint(x: 0, y: 0), endPoint: CGPoint(x: canvasSize.width, y: canvasSize.height)), lineWidth: 3 * scale)
            
            let center = CGPoint(x: 256 * scale, y: 256 * scale)
            
            // Concentric Telemetry burrow rings
            var r1 = Path()
            r1.addArc(center: center, radius: 176 * scale, startAngle: .zero, endAngle: .degrees(360), clockwise: false)
            context.stroke(r1, with: .color(Color.white.opacity(0.08)), lineWidth: 2 * scale)
            
            var r2 = Path()
            r2.addArc(center: center, radius: 118 * scale, startAngle: .zero, endAngle: .degrees(360), clockwise: false)
            context.stroke(r2, with: .color(Color.white.opacity(0.06)), lineWidth: 2 * scale)
            
            // Outer Platter Sector Sweep
            var outerArc = Path()
            outerArc.addArc(center: center, radius: 166 * scale, startAngle: .degrees(130), endAngle: .degrees(35), clockwise: false)
            let cyanBlueGrad = Gradient(colors: [
                Color(red: 34/255, green: 211/255, blue: 238/255),
                Color(red: 6/255, green: 182/255, blue: 212/255),
                Color(red: 37/255, green: 99/255, blue: 235/255),
                Color(red: 79/255, green: 70/255, blue: 229/255)
            ])
            context.stroke(
                outerArc,
                with: .linearGradient(cyanBlueGrad, startPoint: CGPoint(x: 100 * scale, y: 100 * scale), endPoint: CGPoint(x: 420 * scale, y: 400 * scale)),
                style: StrokeStyle(lineWidth: 28 * scale, lineCap: .round)
            )
            
            // Inner Concentric Vault Arc
            var innerArc = Path()
            innerArc.addArc(center: center, radius: 122 * scale, startAngle: .degrees(205), endAngle: .degrees(340), clockwise: false)
            let indigoVioletGrad = Gradient(colors: [
                Color(red: 79/255, green: 70/255, blue: 229/255),
                Color(red: 99/255, green: 102/255, blue: 241/255),
                Color(red: 139/255, green: 92/255, blue: 246/255)
            ])
            context.stroke(
                innerArc,
                with: .linearGradient(indigoVioletGrad, startPoint: CGPoint(x: 140 * scale, y: 200 * scale), endPoint: CGPoint(x: 370 * scale, y: 200 * scale)),
                style: StrokeStyle(lineWidth: 18 * scale, lineCap: .round)
            )
            
            // Interlocking "W" Warren Vector
            var wPath = Path()
            wPath.move(to: CGPoint(x: 148 * scale, y: 244 * scale))
            wPath.addLine(to: CGPoint(x: 202 * scale, y: 362 * scale))
            wPath.addLine(to: CGPoint(x: 256 * scale, y: 270 * scale))
            wPath.addLine(to: CGPoint(x: 310 * scale, y: 362 * scale))
            wPath.addLine(to: CGPoint(x: 364 * scale, y: 244 * scale))
            context.stroke(
                wPath,
                with: .linearGradient(cyanBlueGrad, startPoint: CGPoint(x: 148 * scale, y: 244 * scale), endPoint: CGPoint(x: 364 * scale, y: 362 * scale)),
                style: StrokeStyle(lineWidth: 24 * scale, lineCap: .round, lineJoin: .round)
            )
            
            // Central Apex Upward Reclaim Triangle Fill
            var triPath = Path()
            triPath.move(to: CGPoint(x: 256 * scale, y: 220 * scale))
            triPath.addLine(to: CGPoint(x: 292 * scale, y: 274 * scale))
            triPath.addLine(to: CGPoint(x: 220 * scale, y: 274 * scale))
            triPath.closeSubpath()
            context.fill(triPath, with: .color(Color(red: 6/255, green: 182/255, blue: 212/255).opacity(0.2)))
            
            // Core Emerald Spark
            var sparkPath = Path()
            let spCenter = CGPoint(x: 256 * scale, y: 226 * scale)
            let spSize = 30 * scale
            sparkPath.move(to: CGPoint(x: spCenter.x, y: spCenter.y - spSize))
            sparkPath.addQuadCurve(to: CGPoint(x: spCenter.x + spSize, y: spCenter.y), control: spCenter)
            sparkPath.addQuadCurve(to: CGPoint(x: spCenter.x, y: spCenter.y + spSize), control: spCenter)
            sparkPath.addQuadCurve(to: CGPoint(x: spCenter.x - spSize, y: spCenter.y), control: spCenter)
            sparkPath.addQuadCurve(to: CGPoint(x: spCenter.x, y: spCenter.y - spSize), control: spCenter)
            
            let emeraldGrad = Gradient(colors: [
                Color(red: 110/255, green: 231/255, blue: 183/255),
                Color(red: 16/255, green: 185/255, blue: 129/255)
            ])
            context.fill(sparkPath, with: .linearGradient(emeraldGrad, startPoint: CGPoint(x: spCenter.x - spSize, y: spCenter.y - spSize), endPoint: CGPoint(x: spCenter.x + spSize, y: spCenter.y + spSize)))
            
            // Micro Spark Node White Center
            var microDot = Path()
            microDot.addArc(center: spCenter, radius: 4 * scale, startAngle: .zero, endAngle: .degrees(360), clockwise: false)
            context.fill(microDot, with: .color(.white))
            
            // Accent Status Light Micro-Node
            var statusNode = Path()
            statusNode.addArc(center: CGPoint(x: 396 * scale, y: 320 * scale), radius: 6 * scale, startAngle: .zero, endAngle: .degrees(360), clockwise: false)
            context.fill(statusNode, with: .color(Color(red: 34/255, green: 211/255, blue: 238/255)))
        }
        .frame(width: size, height: size)
    }
}
