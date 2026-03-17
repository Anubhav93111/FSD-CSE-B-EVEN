import fs from 'fs'
const data = fs.readFileSync('data.txt','utf-8')
console.log("Data",data)
fs.appendFileSync('data.txt','FSD Class')
const data1 = fs.readFileSync('data.txt','utf-8')
console.log("Data1",data1)  
fs.unlinkSync('data.txt')