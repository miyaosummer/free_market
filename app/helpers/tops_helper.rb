module TopsHelper
  def converting_to_jpy_top(price)
    "#{price.to_s(:delimited, delimiter: ',')}"
  end
end
