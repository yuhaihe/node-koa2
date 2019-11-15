/**
 * @description utils api 路由
 * @author hayho
 */

const router = require('koa-router')()
const { saveFile } = require('../../controller/utils')
const { loginChecks } = require('../../middlewares/loginChecks')
const koaForm = require('formidable-upload-koa')
router.prefix('/api/utils')

router.post('/upload', loginChecks, koaForm(), async (ctx, next) => {
  const file = ctx.req.files['file']
  const { size, path, name, type } = file
  
  ctx.body = await saveFile({size, filePath: path, name, type})
})

module.exports = router