# NaCl Summer Internship 2026 - Git Live Demo App 🚀

2026年度 NaCl 夏季インターンシップ「Git講義」のライブデモ用リポジトリです。
チーム開発における Pull Request（PR）開発フロー、コンフリクトの発生と解消、`git rebase` の使い方を実践的に解説するために使用します。

---

## 🌟 デモアプリケーション概要

* **名称**: NaCl メンバー & スキルカードダッシュボード
* **技術スタック**: HTML5, Vanilla CSS3 (Glassmorphism), JavaScript (ES6)
* **特徴**: モダンなUIデザイン、ダーク/ライトモード切り替え、メンバーカード追加モーダル、インタラクティブないいねボタン

---

## 📚 講義デモの流れ（Pull Request 開発 & Rebase）

### 1. リポジトリのクローン & ブランチ作成
```bash
# リポジトリをクローン
git clone https://github.com/hiropk/git-demo-app.git
cd git-demo-app

# mainブランチから新しい作業用トピックブランチを作成
git switch -c feature/add-member-card
```

### 2. コードの変更 & コミット
* `index.html` に新しいメンバーカードを追加、またはプロフィールの内容を編集します。
* 変更内容を確認してコミットします。

```bash
# 変更状態の確認
git status

# インデックスに登録 (ステージング)
git add index.html

# コミットの作成
git commit -m "feat: インターン生Aのプロフィールカードを追加"
```

---

### 💥 3. コンフリクト（競合）の発生と Rebase による解消

同僚（別メンバー）が先に `main` ブランチに別の変更をマージした場合の対応手順です。

#### (1) リモートの最新情報を取得
```bash
git fetch origin
```

#### (2) Rebase の実行
```bash
git rebase origin/main
```

ここで **`CONFLICT (content): Merge conflict in index.html`** が発生します！

#### (3) コンフリクト箇所の修正
エディタ（VS Codeなど）で `index.html` を開き、コンフリクトマーカーを確認・解消します。

```html
<<<<<<< HEAD (origin/main の変更)
<h3 class="member-name">先輩エンジニア Bさん</h3>
=======
<h3 class="member-name">インターン生 Aさん</h3>
>>>>>>> feat/add-member-card (自分の変更)
```

両方の変更を残すか、調整して保存します。

#### (4) Rebase の完了
```bash
git add index.html
git rebase --continue
```

---

### 🚀 4. Push と Pull Request（PR）の作成

```bash
# リモートへトピックブランチをPush
git push -u origin feature/add-member-card
```

1. GitHub のリポジトリページを開きます。
2. **Compare & pull request** ボタンをクリックします。
3. PR のタイトルと説明を記載し、**Create pull request** をクリックします。
4. 差分（Files changed）を確認し、Approve / Merge を行います。

---

## 📖 参考リソース
* [サル先生のGit入門 (Backlog)](https://backlog.com/ja/git-tutorial/intro/01/)
* 書籍『GitHub実践入門 - Pull Requestによる開発の変革 -』

---
© 2026 Network Applied Communication Laboratory Ltd. (NaCl)
