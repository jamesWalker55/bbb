// https://bun.sh/docs/api/http
Bun.serve({
  port: 8080,
  routes: {
    "/bbb.user.js": async () => {
      return new Response(await Bun.file("./dist/bbb.user.js").bytes());
    },
  },
});
