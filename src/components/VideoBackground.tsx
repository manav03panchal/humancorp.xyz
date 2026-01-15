export function VideoBackground() {
  return (
    <div className="video-bg">
      <video autoPlay muted loop playsInline>
        <source src="/ascii-clouds.webm" type="video/webm" />
      </video>
    </div>
  );
}
