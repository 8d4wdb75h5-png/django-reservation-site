# 予約サイト（Django）

## 概要
予約枠（Slot）を管理画面から作成し、ユーザー画面で一覧表示・予約ができるミニ予約サイトです。

## 主な機能
- 予約枠一覧表示（DB連携）
- 満席制御（残り0は予約不可）
- 予約処理（POST）
- 二重予約防止（transaction.atomic + select_for_update）

## 使用技術
- Python / Django
- SQLite（開発用）
- HTML / CSS

## 画面
- `/` 予約枠一覧
- `/thanks/ 予約完了`
- `/admin/ 管理画面`

## セットアップ
```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python3 manage.py migrate
python3 manage.py createsuperuser
python3 manage.py runserver
