export default function WorldMap() {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "600px",
        background: "#dff3ff",
        borderRadius: "24px",
        padding: "20px",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "20px",
          fontSize: "32px",
        }}
      >
        🌍 Weltkarte
      </h1>

      <div
        style={{
          width: "100%",
          height: "500px",
          borderRadius: "18px",
          overflow: "hidden",
          background: "#bde7ff",
        }}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg"
          alt="Weltkarte"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            display: "block",
          }}
        />
      </div>
    </div>
  );
}
