Bun.serve({
  port: 3000,
  async fetch(req) {
    const url = new URL(req.url);
    
    if (url.pathname === "/") {
      return new Response(Bun.file("index.html"), {
        headers: { "Content-Type": "text/html" }
      });
    }
    
    if (url.pathname === "/style.css") {
      return new Response(Bun.file("style.css"), {
        headers: { "Content-Type": "text/css" }
      });
    }
    
    if (url.pathname === "/app.js") {
      return new Response(Bun.file("app.js"), {
        headers: { "Content-Type": "application/javascript" }
      });
    }
    
    return new Response("Not found", { status: 404 });
  },
});

console.log("Server running on http://localhost:3000");
