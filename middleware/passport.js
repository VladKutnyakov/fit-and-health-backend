// const JwtStrategy = require('passport-jwt').Strategy
// const ExtractJwt = require('passport-jwt').ExtractJwt
// const mongoose = require('mongoose')
// const User = mongoose.model('users')
// const keys = require('../keys')

// let options = {}
// options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
// options.secretOrKey = keys.jwt
// // options.issuer = 'accounts.examplesoft.com'
// // options.audience = 'yoursite.net'

// module.exports = passport => {
//   passport.use(new JwtStrategy(options, async function(jwt_payload, done) {
//     await User.findById(jwt_payload.userId, function(err, user) {
//       if (err) {
//         return done(err, false)
//       }
//       if (user) {
//         return done(null, user)
//       } else {
//         return done(null, false)
//         // or you could create a new account
//       }
//     })
//   }))
// }
