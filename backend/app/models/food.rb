class Food < ApplicationRecord
  belongs_to :restaurant
  # belongs_toの外部キーのnilを許可する
  belongs_to :order, optional: true
  has_one :line_food
end
