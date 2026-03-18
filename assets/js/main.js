export default {
  async fetch(request, env) {
    // 1. microCMSからデータを取得するための設定
    const MICROCMS_URL = "https://coderoute90.microcms.io/api/v1/blog";
    const API_KEY = "n0P7BLqdjzGt8HJuAPeqNmYHf8Ho44i8nfG1";

    try {
      const response = await fetch(MICROCMS_URL, {
        headers: {
          "X-MICROCMS-API-KEY": API_KEY,
        },
      });

      if (!response.ok) {
        return new Response(`Error: ${response.status}`, { status: response.status });
      }

      const data = await response.json();

      // 2. ブラウザからのアクセスを許可（CORS設定）してデータを返す
      return new Response(JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*", // どのドメインからもアクセス可能にする
          "Access-Control-Allow-Methods": "GET",
        },
      });
    } catch (error) {
      return new Response("Internal Server Error", { status: 500 });
    }
  },
};
