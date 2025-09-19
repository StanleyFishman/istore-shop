const REMOTE_MEDIA = {
  item3: 'https://images-porsche.imgix.net/-/media/0683EEF17ADA4D6ABAA276C65235E96C_29BC6C3357784A859B8A0E4B36EE15F8_CZ25W14IX0010-911-carrera-4-gts-side?w=2560&h=697&q=85&crop=faces%2Centropy%2Cedges&auto=format',
  item4: 'https://images-porsche.imgix.net/-/media/29200583E46C486581905B15B7F99E2A_C9D24F865FEE489D848D0D5D1A3FB656_CZ25W02IX0010-911-carrera-cabrio-side?w=2560&h=697&q=85&crop=faces%2Centropy%2Cedges&auto=format',
  airpods: 'https://images-porsche.imgix.net/-/media/C4E673973FFF4E3BB35A85C8BBBB3984_9593233136744700A12A1AE0DE9D5791_CZ26W07IX0010-911-targa-4s-side?w=2560&h=697&q=85&crop=faces%2Centropy%2Cedges&auto=format',
  mac: 'https://images-porsche.imgix.net/-/media/646ED7CDD4DF4060A4823F3A9DB8DA22_97CB2E119D8749C19004EC939CD09E96_CZ25W01IX0010911-carrera-side?w=2800&q=45&crop=faces%2Centropy%2Cedges&auto=format'
};

const ITEMS = {
  item1: {
    title: 'МАШИНА ЧЕШУИРОВАНИЯ',
    image: 'assets/images/item1_pic1.png',
    hero: {
      base: 'assets/images/item1_pic1',
      type: 'png',
      widths: []
    },
    detailImage: 'assets/images/item1_pic2.png',
    characteristics: [
      { value: '4,1 с', description: 'Разгон 0–100 км/ч' },
      { value: '290 кВт / 394 л.с.', description: 'Мощность' },
      { value: '294 км/ч', description: 'Максимальная скорость' }
    ]
  },
  item2: {
    title: 'БАРАБАННОЕ ОБОРУДОВАНИЕ',
    image: 'assets/images/item2_pic1.png',
    hero: {
      base: 'assets/images/item2_pic1',
      type: 'png',
      widths: []
    },
    detailImage: 'assets/images/item2.png',
    characteristics: [
      { value: '4,1 с', description: 'Разгон 0–100 км/ч' },
      { value: '290 кВт / 394 л.с.', description: 'Мощность' },
      { value: '294 км/ч', description: 'Максимальная скорость' }
    ]
  },
  item3: {
    title: 'КОМПРЕССОРНОЕ ОБОРУДОВАНИЕ',
    image: REMOTE_MEDIA.item3,
    hero: {
      src: REMOTE_MEDIA.item3,
      widths: []
    },
    detailImage: REMOTE_MEDIA.item3,
    characteristics: [
      { value: '4,1 с', description: 'Разгон 0–100 км/ч' },
      { value: '290 кВт / 394 л.с.', description: 'Мощность' },
      { value: '294 км/ч', description: 'Максимальная скорость' }
    ]
  },
  item4: {
    title: 'ЁМКОСТИ И РЕЗЕРВУАРЫ',
    image: REMOTE_MEDIA.item4,
    hero: {
      src: REMOTE_MEDIA.item4,
      widths: []
    },
    detailImage: REMOTE_MEDIA.item4,
    characteristics: [
      { value: '4,1 с', description: 'Разгон 0–100 км/ч' },
      { value: '290 кВт / 394 л.с.', description: 'Мощность' },
      { value: '294 км/ч', description: 'Максимальная скорость' }
    ]
  },
  item5: {
    title: 'ТЕПЛООБМЕННОЕ ОБОРУДОВАНИЕ',
    image: REMOTE_MEDIA.airpods,
    hero: {
      src: REMOTE_MEDIA.airpods,
      widths: []
    },
    detailImage: REMOTE_MEDIA.airpods,
    characteristics: [
      { value: '4,1 с', description: 'Разгон 0–100 км/ч' },
      { value: '290 кВт / 394 л.с.', description: 'Мощность' },
      { value: '294 км/ч', description: 'Максимальная скорость' }
    ]
  },
  item6: {
    title: 'iMac 24″',
    image: REMOTE_MEDIA.mac,
    hero: {
      src: REMOTE_MEDIA.mac,
      widths: []
    },
    detailImage: REMOTE_MEDIA.mac,
    characteristics: [
      { value: '4,1 с', description: 'Разгон 0–100 км/ч' },
      { value: '290 кВт / 394 л.с.', description: 'Мощность' },
      { value: '294 км/ч', description: 'Максимальная скорость' }
    ]
  }
};

// Future items can be added here in the same format
