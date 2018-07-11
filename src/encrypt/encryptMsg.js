import publicKeyFile from './id_rsa.pub.js'
import forge from '../../bin/forge.min.js'
// const forge = () => import(/* webpackChunkName: "forge" */ '../../bin/forge.min.js')
export default function (message) {
  const publicKey = forge.pki.publicKeyFromPem(publicKeyFile.publicKey)
  const encrypted = publicKey.encrypt(message)
  return forge.util.encode64(encrypted)
}
