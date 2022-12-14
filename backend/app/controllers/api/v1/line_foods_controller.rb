module Api
  module V1
    class LineFoodsController < ApplicationController
      before_action :set_food, only: %i[create replace]

      def index
        # 未注文のデータを取得
        line_foods = LineFood.active
        if line_foods.exists?
          render json: {
            line_food_ids: line_foods.map { |line_food| line_food.id },
            restaurant: line_foods[0].restaurant,
            # 保守性の観点でなるべくデータの計算などはサーバーサイドで担当すべきである。
            count: line_foods.sum { |line_food| line_food[:count] },
            amount: line_foods.sum { |line_food| line_food.total_amount }
          }, status: :ok
        else
          render json: {}, status: :no_content
        end
      end

      def create
        # 他店舗での未注文があれば早期return
        if LineFood.active.other_restaurant(@ordered_food.restaurant.id).exists?
          return render json: {
            # すでに作成されている他店舗の情報
            existing_restaurant: LineFood.other_restaurant(@ordered_food.restaurant.id).first.restaurant.name,
            # リクエストで作成しようとした新店舗の情報
            new_restaurant: Food.find(params[:food_id]).restaurant.name,
          }, status: :not_acceptable
        end

        set_line_food(@ordered_food)

        if @line_food.save
          render json: {
            line_food: @line_food
          }, status: :created
        else
          render json: {}, status: :internal_server_error
        end
      end

      def replace
        # 他店舗での未注文データを取得
        LineFood.active.other_restaurant(@ordered_food.restaurant.id).each do |line_food|
          # 論理削除(activeというカラムにfalseを入れるなどして、データを非活性の状態にすること)
          line_food.update_attribute(:active, false)
        end

        set_line_food(@ordered_food)

        if @line_food.save
          render json: {
            line_food: @line_food
          }, status: :created
        else
          render json: {}, status: :internal_server_error
        end
      end

      private

      def set_food
        @ordered_food = Food.find(params[:food_id])
      end

      def set_line_food(ordered_food)
        # すでにfoodに関する未注文がある場合
        if ordered_food.line_food.present?
          @line_food = ordered_food.line_food
          # 既存のline_foodインスタンス情報を更新
          @line_food.attributes = {
            count: ordered_food.line_food.count + params[:count],
            active: true
          }
        else
          # build_xxxxでインスタンスを新規作成(まだDB保存していない)
          @line_food = ordered_food.build_line_food(
            count: params[:count],
            restaurant: ordered_food.restaurant,
            active: true
          )
        end
      end
    end
  end
end