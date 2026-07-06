import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function localApiPlugin() {
  return {
    name: 'local-api-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.method === 'POST' && req.url === '/api/upload') {
          let body = ''
          req.on('data', chunk => { body += chunk })
          req.on('end', () => {
            try {
              const { fileName, fileData, folder } = JSON.parse(body)
              if (!fileName || !fileData || !folder) {
                res.statusCode = 400
                res.setHeader('Content-Type', 'application/json')
                return res.end(JSON.stringify({ error: 'Missing required parameters' }))
              }
              // Clean base64 mime-type header if present (e.g. data:image/png;base64, or data:application/pdf;base64,)
              const base64Data = fileData.replace(/^data:[^;]+;base64,/, '')
              const buffer = Buffer.from(base64Data, 'base64')
              
              const targetDir = path.resolve(__dirname, 'public/images', folder)
              if (!fs.existsSync(targetDir)) {
                fs.mkdirSync(targetDir, { recursive: true })
              }
              
              const filePath = path.join(targetDir, fileName)
              fs.writeFileSync(filePath, buffer)
              
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ path: `/images/${folder}/${fileName}` }))
            } catch (err) {
              res.statusCode = 500
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: err.message }))
            }
          })
        } else if (req.method === 'POST' && req.url === '/api/save-data') {
          let body = ''
          req.on('data', chunk => { body += chunk })
          req.on('end', () => {
            try {
              const { type, data } = JSON.parse(body)
              if (!type || !data) {
                res.statusCode = 400
                res.setHeader('Content-Type', 'application/json')
                return res.end(JSON.stringify({ error: 'Missing type or data' }))
              }
              
              const targetPath = path.resolve(__dirname, 'src/data', `${type}.json`)
              fs.writeFileSync(targetPath, JSON.stringify(data, null, 2), 'utf-8')
              
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ success: true }))
            } catch (err) {
              res.statusCode = 500
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: err.message }))
            }
          })
        } else {
          next()
        }
      })
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), localApiPlugin()],
})

