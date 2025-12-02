import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "Gunmeet Singh - Full Stack Web Developer"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default async function Image() {
  const name = "Gunmeet Singh"
  const siteUrl = "gunmeetsingh-dev.vercel.app"
  const techStack = ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL"]

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Logo Circle */}
        <div
          style={{
            width: 180,
            height: 180,
            borderRadius: "50%",
            background: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 40,
            fontSize: 100,
            fontWeight: "bold",
            color: "#14b8a6",
            boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          }}
        >
          GS
        </div>

        {/* Name */}
        <h1
          style={{
            fontSize: 80,
            fontWeight: "bold",
            color: "white",
            marginBottom: 20,
            textAlign: "center",
            textShadow: "0 4px 12px rgba(0,0,0,0.2)",
          }}
        >
          {name}
        </h1>

        {/* Title */}
        <p
          style={{
            fontSize: 40,
            color: "#ccfbf1",
            textAlign: "center",
            marginBottom: 35,
          }}
        >
          Full Stack Web Developer
        </p>

        {/* Tech Stack Badges */}
        <div
          style={{
            display: "flex",
            gap: 15,
            flexWrap: "wrap",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          {techStack.map((tech) => (
            <div
              key={tech}
              style={{
                background: "rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(10px)",
                padding: "12px 24px",
                borderRadius: 30,
                color: "white",
                fontSize: 22,
                fontWeight: "600",
              }}
            >
              {tech}
            </div>
          ))}
        </div>

        {/* Website URL */}
        <div
          style={{
            position: "absolute",
            bottom: 15,
            fontSize: 28,
            color: "rgba(255, 255, 255, 0.9)",
            fontWeight: "500",
          }}
        >
          {siteUrl}
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
