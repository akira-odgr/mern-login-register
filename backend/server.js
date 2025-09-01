// 必要なモジュールをインポート
import express from "express"; // Expressフレームワークを使用
import dotenv from "dotenv"; // 環境変数を扱うためのdotenv
import authRoutes from "./routes/auth.js"; // 認証関連のルートをインポート
import { connectDB } from "./config/db.js"; // データベース接続関数をインポート

// 環境変数の読み込み
dotenv.config();

// サーバーが使用するポート番号を設定（環境変数があればそれを使用、なければ5001）
const PORT = process.env.PORT || 5001;

// Expressアプリケーションを作成
const app = express();

// JSON形式のリクエストボディを解析できるように設定
app.use(express.json());

// 認証関連のAPIルートを設定
// ルート: /api/users
// 主なリクエスト例:
//   POST /api/users/register -> 新規ユーザー登録
//   POST /api/users/login    -> ユーザーログイン
//   GET /api/users/profile   -> ログインユーザー情報取得（認証必須）
app.use("/api/users", authRoutes);

// データベースに接続（MongoDBなど）
connectDB();

// サーバーを指定したポートで起動
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});
