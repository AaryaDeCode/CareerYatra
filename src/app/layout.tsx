export const metadata = {
  title: "Career Platform",
  description: "Find jobs, connect with employers, and grow your career."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header style={{ background: "#007bff", color: "#fff", padding: "10px" }}>
          <h1>Career Platform</h1>
        </header>
        {children}
        <footer style={{ marginTop: "40px", textAlign: "center", padding: "10px", background: "#eee" }}>
          <p>© 2025 Career Platform</p>
        </footer>
      </body>
    </html>
  );
}
