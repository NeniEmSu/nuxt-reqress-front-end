const fs = require('fs')
fs.writeFileSync(
  './.env',
  `
  BASE_URL=${process.env.BASE_URL}\n
  BACKEND_ENDPOINT=${process.env.BACKEND_ENDPOINT}
`
)
