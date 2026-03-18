export default {
  async fetch(request, env) {
    const MICROCMS_URL = "https://coderoute90.microcms.io/api/v1/blog";
    const API_KEY = "n0P7BLqdjzGt8HJuAPeqNmYHf8Ho44i8nfG1";

    try {
      const response = await fetch(MICROCMS_URL, {
        headers: { "X-MICROCMS-API-KEY": API_KEY }
      });
      const data = await response.json();
      return new Response(JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET"
        }
      });
    } catch (error) {
      return new Response("Internal Server Error", { status: 500 });
    }
  }
};
