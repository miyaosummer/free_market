class ProductSize < ActiveHash::Base
  self.data = [
    # Clothes size
      {id: 1, name: 'XXS以下',     group: '1'}, 
      {id: 2, name: 'XS(SS)',     group: '1'}, 
      {id: 3, name: 'S',          group: '1'},
      {id: 4, name: 'M',          group: '1'},
      {id: 5, name: 'L',          group: '1'},
      {id: 6, name: 'XL(LL)',     group: '1'},
      {id: 7, name: '2XL(3L)',    group: '1'},
      {id: 8, name: '3XL(4L)',    group: '1'},
      {id: 9, name: '4XL(5L)以上', group: '1'},
      {id: 10, name: 'FREE SIZE', group: '1'},

      # Ladies shoe size
      { id: 11, name: '20cm以下',   group: '2' },
      { id: 12, name: '20.5cm',    group: '2' },
      { id: 13, name: '21cm',      group: '2' },
      { id: 14, name: '21.5cm',    group: '2' },
      { id: 15, name: '22cm',      group: '2' },
      { id: 16, name: '22.5cm',    group: '2' },
      { id: 17, name: '23cm',      group: '2' },
      { id: 18, name: '23.5cm',    group: '2' },
      { id: 19, name: '24cm',      group: '2' },
      { id: 20, name: '24.5cm',    group: '2' },
      { id: 21, name: '25cm',      group: '2' },
      { id: 22, name: '25.5cm',    group: '2' },
      { id: 23, name: '26cm',      group: '2' },
      { id: 24, name: '26.5cm',    group: '2' },
      { id: 25, name: '27cm',      group: '2' },
      { id: 26, name: '27.5cm以上', group: '2' },

      # Mens shoe size
      { id: 27, name: '23.5cm以下', group: '3' },
      { id: 28, name: '24cm',      group: '3' },
      { id: 29, name: '24.5cm',    group: '3' },
      { id: 30, name: '25cm',      group: '3' },
      { id: 31, name: '25.5cm',    group: '3' },
      { id: 32, name: '26cm',      group: '3' },
      { id: 33, name: '26.5cm',    group: '3' },
      { id: 34, name: '27cm',      group: '3' },
      { id: 35, name: '27.5cm',    group: '3' },
      { id: 36, name: '28cm',      group: '3' },
      { id: 37, name: '28.5cm',    group: '3' },
      { id: 38, name: '29cm',      group: '3' },
      { id: 39, name: '29.5cm',    group: '3' },
      { id: 40, name: '30cm',      group: '3' },
      { id: 41, name: '30.5cm',    group: '3' },
      { id: 42, name: '31cm以上',   group: '3' }
    ]
end