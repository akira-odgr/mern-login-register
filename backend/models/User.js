// mongoose モジュールをインポート（MongoDBとやり取りするため）
import mongoose from "mongoose";
// bcryptjs をインポート（パスワードのハッシュ化・照合用）
import bcrypt from "bcryptjs";

// ユーザースキーマを定義
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String, // ユーザー名は文字列
            required: true, // 必須項目
            unique: true, // 他のユーザーと重複不可
        },
        email: {
            type: String, // メールアドレスは文字列
            required: true, // 必須項目
            unique: true, // 他のユーザーと重複不可
        },
        password: {
            type: String, // パスワードは文字列
            required: true, // 必須項目
        },
    },
    { timestamps: true } // createdAt / updatedAt を自動で追加
);

// パスワードを保存する前にハッシュ化する処理
userSchema.pre("save", async function (next) {
    // パスワードが変更されていなければ何もせず次へ
    if (!this.isModified("password")) next();

    // salt を生成（10ラウンド）
    const salt = await bcrypt.genSalt(10);
    // パスワードをハッシュ化
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// パスワード照合用メソッド
// ログイン時に入力されたパスワードとDBに保存されたハッシュを比較
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// User モデルを作成
const User = mongoose.model("User", userSchema);

// 他のファイルでも使えるようにエクスポート
export default User;
