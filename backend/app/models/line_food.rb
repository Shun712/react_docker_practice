class LineFood < ApplicationRecord
  belongs_to :food
  belongs_to :restaurant
  belongs_to :order, optional: true

  validates :count, numericality: { greater_than: 0 }

  # モデルそのものや関連するオブジェクトに対するクエリを指定
  scope :active, -> { where(active: true) }
  # 他店舗でアクティブ(未注文)なLineFoodを取得
  scope :other_restaurant, -> (picked_restaurant_id) { where.not(restaurant_id: picked_restaurant_id) }

  def total_amount
    food.price * count
  end
end