enum Quality {
  Ok,
  Defective,
  Bad,
}

enum Rating {
  Fun,
  Ok,
  Boring,
  NotFun,
}

interface Item {
  link: string
  quality: Quality
  rating: Rating
  description: string
}

const factotum: Item = {
  link: 'otRKSRgAmug&list=WL&index=19',
  quality: Quality.Defective,
  rating: Rating.Fun,
  description: 'colored image of a life of interesting man',
}
const postOffice: Item = {
  link: '1kpw4HwohoE',
  quality: Quality.Ok,
  rating: Rating.Fun,
  description: 'colored image of a life of interesting man',
}
const bukowski = {
  factotum,
  postOffice,
}

const regret: Item = {
  link: '1lpFYv19Kt4&list=SS&index=2',
  quality: Quality.Ok,
  rating: Rating.Fun,
  description: 'on regret',
}
const hopkins = {
  regret,
}

export const lib = {
  bukowski,
  hopkins,
}
