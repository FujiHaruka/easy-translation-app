#!/usr/bin/env node

require('shelljs/global')
const { port } = require('../../env')
const pkg = require('../../package.json')

let name = `${pkg.name}_mongo`
let command = `
  docker run -d --name ${name} -p ${port.MONGO} mongo:3.4
`.trim()

exec(command)

/* global exec */
