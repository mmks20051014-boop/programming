# CodeRoute 90 - ITスクールで3ヶ月でプログラミングを使いこなせるようになるまで

## プロジェクト概要

このプロジェクトは、ITスクールで3ヶ月間プログラミングを学習し、実践的なスキルを身につけた体験談をWebサイトとして公開したものです。プログラミング初心者が、体系的な学習環境でどのように成長していくかを詳細に記録しています。

現在、サイトのコンテンツを全面的にアップデート中です。以前はWebライターとしての体験記でしたが、ITスクール体験記にコンテンツを一新しました。

## サイト構造

### メインページ
- **index.html** - ホームページ（ITスクール体験の紹介、学習成果、最新記事表示）
- **about.html** - Aboutページ（学習者プロフィール、学習過程、身につけたスキル）
- **blog.html** - ブログ記事一覧（ITスクール関連記事、学習体験談、プログラミング情報）
- **contact.html** - お問い合わせページ（ITスクール相談、学習相談フォーム）
- **dashboard.html** - 学習進捗ダッシュボード（学習履歴、スキル習得状況）

### 記事ページ
- **articles/work-home-3months.html** - 【体験談】ITスクールで3ヶ月でプログラミングを使いこなせるようになった話
- **articles/beginner-writing-jobs.html** - 初心者が最初に取り組むべきプログラミング学習方法
- **articles/improve-writing.html** - プログラミングスキルを向上させる練習方法
- **articles/character-rate.html** - プログラミング学習開始から現在に至るまでの記録
- **articles/web-writer-30k.html** - ITスクール初心者から月3万円相当のスキル習成まで
- **articles/find-1hour.html** - 効率的なプログラミング学習法「1時間」の活用法

## デザイン仕様

### カラーパレット
- **プライマリ背景**: #0f1923（ダークブルー）
- **セカンダリ背景**: #1a2a3a（ミディアムブルー）
- **アクセントブルー**: #64b4ff（ライトブルー）
- **スレートグレー**: #7a8b9a（グレー）
- **テキストダーク**: #1e2d3d（ダークグレー）
- **テキストライト**: #ffffff（ホワイト）

### グラデーション
- ヒーローエリア: linear-gradient(135deg, #0f1923 0%, #1a2a3a 50%, #0d1b2a 100%)
- CTAボタン: linear-gradient(135deg, #64b4ff 0%, #3a7ec4 100%)
- カード背景: linear-gradient(135deg, #ffffff 0%, #e8f4ff 100%)

### フォントファミリー
- 見出し: Noto Sans JP（サンセリフ、モダンで視認性重視）
- 本文: Noto Serif JP（セリフ、親しみやすさと読みやすさ）
- コード: JetBrains Mono（モノスペース、技術的な要素）

## 技術スタック

### フロントエンド
- **HTML5** - セマンティックなマークアップ
- **CSS3** - モダンなスタイリング（Grid、Flexbox、カスタムプロパティ）
- **JavaScript (ES6+)**** - インタラクティブな機能
- **Chart.js** - 学習進捗の可視化（ダッシュボード）
- **tsParticles** - パーティクルアニメーション（ヒーローエリア）

### 外部ライブラリ（CDN）
- **Font Awesome 6.4.0** - アイコン
- **Google Fonts** - Noto Sans JP、Noto Serif JP、JetBrains Mono
- **Chart.js** - グラフ描画
- **tsParticles** - パーティクルエフェクト

## 主な機能

### UI/UXエフェクト
- **パーティクルアニメーション**: ヒーローエリアにThree.jsライクな3Dパーティクル
- **スクロール連動ヘッダー**: Glassmorphism効果（backdrop-filter）
- **ホバーエフェクト**: カードの発光効果、グラデーション移動
- **スムーズスクロール**: アンカーリンクでの滑らかな移動
- **インターセクションオブザーバー**: スクロールに連動したフェードイン効果

### インタラクティブ要素
- **レスポンシブデザイン**: モバイルファーストアプローチ
- **検索機能**: ITスクール関連記事のリアルタイム検索
- **カテゴリフィルタリング**: 記事のカテゴリー別表示
- **フォームバリデーション**: お問い合わせフォームのクライアントサイド検証
- **データ可視化**: 学習進捗データのグラフ表示（棒グラフ、円グラフ）

### アクセシビリティ
- **prefers-reduced-motion**: 減速モーション対応
- **適切なコントラスト比**: WCAG 2.1準拠
- **セマンティックHTML**: スクリーンリーダー対応
- **キーボードナビゲーション**: タブ移動の最適化

## パフォーマンス最適化

### Core Web Vitals対策
- **LCP (Largest Contentful Paint)**: ヒーロー画像の最適化、遅延読み込み
- **FID (First Input Delay)**: 非同期JavaScript読み込み、イベントハンドラの最適化
- **CLS (Cumulative Layout Shift)**: 画像サイズ指定、フォント読み込みの最適化

### 実装済みの最適化
- 画像の遅延読み込み
- パーティクル数のモバイル削減
- CSSアニメーションのGPU活用（transform, opacity）
- スクロールイベントのスロットリング
- パッシブイベントリスナーの使用

## セットアップ方法

1. **リポジトリのクローン**
```bash
git clone [repository-url]
cd CodeRoute 90-website
```

2. **ローカルサーバーの起動**
```bash
# Pythonを使用する場合
python -m http.server 8000

# Node.jsを使用する場合
npx http-server -p 8000

# VS CodeのLive Server拡張機能を使用する場合
# 拡張機能をインストール後、HTMLファイルを右クリック→"Open with Live Server"
```

3. **ブラウザで確認**
```
http://localhost:8000
```

## カスタマイズ方法

### カラーの変更
`assets/css/style.css`のCSSカスタムプロパティを編集：
```css
:root {
  --primary-bg: #0f1923;
  --accent-blue: #64b4ff;
  /* 他のカスタムプロパティ */
}
```

### フォントの変更
`index.html`の`<head>`セクション内のGoogle Fontsリンクを編集：
```html
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&family=Noto+Serif+JP:wght@400;600&display=swap" rel="stylesheet">
```

### パーティクル設定の変更
`assets/js/hero-animation.js`の設定オブジェクトを編集：
```javascript
const particlesConfig = {
  particles: {
    number: { value: 120 }, // パーティクル数
    color: { value: ["#64b4ff", "#8ab4d4", "#ffffff"] },
    // 他の設定...
  }
}
```

## ブラウザ対応

- **Chrome**: 90以上（推奨）
- **Firefox**: 88以上
- **Safari**: 14以上
- **Edge**: 90以上
- **モバイルブラウザ**: iOS Safari、Chrome for Android

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## お問い合わせ

Webサイトに関するお問い合わせは、contact.htmlのフォームからお願いします。

---

**作成日**: 2026年3月12日  
**最終更新日**: 2026年3月15日  
**作成者**: CodeRoute 90 Webサイト構築チーム