function Avatar({ initials, color = "#5b4fcf", size = 34 }) {
  return (
    <span
      className="avatar"
      style={{ width: size, height: size, background: color, fontSize: size * 0.38 }}
    >
      {initials}
    </span>
  );
}

export default Avatar;
