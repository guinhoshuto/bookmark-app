import { Router, Request, Response } from "express";
import { createProxyMiddleware } from 'http-proxy-middleware'
export const route = Router()

route.get('/p/:shortcode/media', createProxyMiddleware({
    target: 'https://www.instagram.com',
    changeOrigin: true,
    pathRewrite:  (path, req) => {
        console.log(req.params)
       return path.replace('/proxy', '') 
    },
    onProxyRes: function (proxyRes, req, res) {
        proxyRes.headers['Access-Control-Allow-Origin'] = '*'
    }
}))